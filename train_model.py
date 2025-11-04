import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# --- 1. Load Data ---
try:
    data = pd.read_csv('heart_data.csv')
    print("Data loaded successfully!")
except FileNotFoundError:
    print("Error: 'heart_data.csv' not found.")
    print("Please make sure your CSV file is in the same folder as this script.")
    exit()

print(f"Data shape: {data.shape}")

# --- 2. Define Features (X) and Target (y) ---

# !!! This section is now updated based on your feature list !!!

# List all columns from your CSV that are NUMBERS
NUMERIC_FEATURES = [
    'age', 
    'trestbps',  # resting blood pressure
    'chol',      # serum cholesterol
    'thalach',   # maximum heart rate achieved
    'oldpeak'    # ST depression
]

# List all columns from your CSV that are CATEGORIES
CATEGORICAL_FEATURES = [
    'sex',       # (0 = female, 1 = male)
    'cp',        # chest pain type
    'fbs',       # fasting blood sugar > 120 mg/dl
    'restecg',   # resting ecg results
    'exang',     # exercise induced angina
    'slope',     # slope of peak exercise ST segment
    'ca',        # number of major vessels (0-4)
    'thal'       # (0 = normal, 1 = fixed, 2 = reversible)
]

# This is the single column you are trying to PREDICT
TARGET_COLUMN = 'target' # (0 = no risk, 1 = high risk)

# --- Check if columns exist ---
all_features = NUMERIC_FEATURES + CATEGORICAL_FEATURES
try:
    X = data[all_features]
    y = data[TARGET_COLUMN]
    print("Feature and target columns found successfully.")
except KeyError as e:
    print(f"Error: A column is missing! {e}")
    print("Please double-check your CSV file's column names.")
    exit()

# --- 3. Create the Preprocessing Pipeline ---

# This pipeline is the "brain" of your preprocessing.
# It applies different steps to different columns.

# Create a transformer for numeric columns:
# We will scale them (e.g., make 'age' and 'chol' have a similar range)
numeric_transformer = Pipeline(steps=[
    ('scaler', StandardScaler())
])

# Create a transformer for categorical columns:
# We will One-Hot-Encode them (e.g., turn 'sex' [0, 1] into two separate columns)
categorical_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Use ColumnTransformer to apply the right transformer to the right columns
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, NUMERIC_FEATURES),
        ('cat', categorical_transformer, CATEGORICAL_FEATURES)
    ],
    remainder='passthrough' # Keep any columns not listed (just in case)
)

# --- 4. Create the Full Model Pipeline ---

# Now we chain the preprocessor and the classifier (Random Forest)
# This single 'pipeline' object does EVERYTHING:
# 1. Takes in raw data
# 2. Applies scaling to numeric features
# 3. Applies one-hot-encoding to categorical features
# 4. Feeds the result into the Random Forest model

model = RandomForestClassifier(n_estimators=100, random_state=42)

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', model)
])

# --- 5. Train the Model ---

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Starting model training...")
# Train the entire pipeline on the training data
pipeline.fit(X_train, y_train)
print("Model training complete!")

# --- 6. (Optional) Test the Model ---
y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy on test set: {accuracy * 100:.2f}%")


# --- 7. Save the Pipeline ---
# This is the most important step!
# We save the *entire* trained pipeline to one file.
MODEL_FILE_NAME = 'heart_risk_pipeline.joblib'
joblib.dump(pipeline, MODEL_FILE_NAME)

print(f"\n✅ Model pipeline saved successfully as '{MODEL_FILE_NAME}'")

# --- 8. (NEW) Show Feature Importance ---

print("\n--- Model Feature Importance ---")

# Get the trained model from our pipeline
# The pipeline has two steps: 'preprocessor' and 'classifier'
trained_rf_model = pipeline.named_steps['classifier']

# Get the feature names from our preprocessor
# This is a bit complex, but it gets all the *new* column names
# after one-hot-encoding (e.g., 'sex_0', 'sex_1', 'cp_0', 'cp_1', etc.)
preprocessor = pipeline.named_steps['preprocessor']
numeric_features = NUMERIC_FEATURES
categorical_features = preprocessor.named_transformers_['cat'].named_steps['onehot'].get_feature_names_out(CATEGORICAL_FEATURES)
all_feature_names = numeric_features + list(categorical_features)

# Create a simple list of (feature_name, importance_score)
importances = trained_rf_model.feature_importances_
feature_importance_list = list(zip(all_feature_names, importances))

# Sort the list in descending order of importance
feature_importance_list.sort(key=lambda x: x[1], reverse=True)

# Print the Top 10 most important features
print("Top 10 Most Important Features:")
for feature, importance in feature_importance_list[:10]:
    print(f"{feature}: {importance * 100:.2f}%")