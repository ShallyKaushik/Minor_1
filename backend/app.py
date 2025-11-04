import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy     # --- NEW ---
from flask_bcrypt import Bcrypt           # --- NEW ---
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity  # --- NEW ---
import os  # --- NEW ---

# --- 1. Initialize Application ---
app = Flask(__name__)
CORS(app)  # This enables Cross-Origin Resource Sharing

# --- 2. NEW: Configure Database and Auth ---
# This creates a simple 'database.db' file in your backend folder
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SECRET_KEY'] = 'your-super-secret-key'  # Change this to a random string
app.config['JWT_SECRET_KEY'] = 'your-super-secret-jwt-key' # Change this too

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- 3. NEW: Create Database Model (Table) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

# --- 4. Load The ML Model ---
try:
    model = joblib.load('heart_risk_pipeline.joblib')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Feature lists (we still need these)
NUMERIC_FEATURES = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
CATEGORICAL_FEATURES = ['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal']
ALL_FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES


# --- 5. NEW: Registration Route ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# --- 6. NEW: Login Route ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        # Create a token (the "logged-in pass")
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    
    return jsonify({'error': 'Invalid username or password'}), 401


# --- 7. Prediction Route (Now Protected) ---
# We keep the old name '/predict' for simplicity
@app.route('/predict', methods=['POST'])
@jwt_required()  # --- NEW: This route is now protected ---
def predict():
    # --- NEW: Get user identity from the token ---
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    print(f"Prediction requested by user: {user.username} (ID: {current_user_id})")

    if model is None:
        return jsonify({'error': 'Model is not loaded'}), 500

    try:
        data = request.json
        print(f"Received data: {data}")

        input_df = pd.DataFrame([data])
        
        for col in NUMERIC_FEATURES:
            input_df[col] = input_df[col].astype(float)
        for col in CATEGORICAL_FEATURES:
            input_df[col] = input_df[col].astype(int)

        input_df = input_df[ALL_FEATURES]
        
        probabilities = model.predict_proba(input_df)
        risk_probability = probabilities[0][0] # We grab class 0 (High Risk)

        # --- NEW: Save prediction to database ---
        # (We'll build this model next, for now we just predict)
        # new_prediction = Prediction(user_id=current_user_id, risk=risk_probability, ...)
        # db.session.add(new_prediction)
        # db.session.commit()
        # ---

        response = {
            'message': 'Prediction successful',
            'probability_high_risk': float(risk_probability)
        }
        return jsonify(response)

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

# --- 8. Run the Application ---
if __name__ == '__main__':
    # --- NEW: Create the database tables if they don't exist ---
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
