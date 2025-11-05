import React, { useState } from 'react';
import axios from 'axios';
import './PredictorPage.css';
import ResultCard from '../components/ResultCard'; // <-- CHECK THIS IMPORT
// No useAuth or useNavigate!

function PredictorPage() {
  const [formData, setFormData] = useState({
    age: 63, sex: 1, cp: 3, trestbps: 145, chol: 233,
    fbs: 1, restecg: 0, thalach: 150, exang: 0,
    oldpeak: 2.3, slope: 0, ca: 0, thal: 1
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // No useEffect, no token!

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // Simple, anonymous request. No headers.
      const response = await axios.post(
        'http://127.0.0.1:5000/api/predict',
        formData
        // No {headers} object!
      );
      setResult(response.data);

    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predictor-container">
      <div className="predictor-card">
        <div className="predictor-header">
          <span className="header-icon">🩺</span>
          <h2>Heart Risk Predictor</h2>
          <p>Enter your health metrics to get an instant risk prediction.</p>
        </div>

        {/* --- FIX: Removed the outer, duplicate <form> tag --- */}
        {/* There is now only ONE <form> tag */}
        <form className="prediction-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* --- Numeric Features --- */}
            <label>Age
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </label>
            <label>Resting BP (trestbps)
              <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} />
            </label>
            <label>Cholesterol (chol)
              <input type="number" name="chol" value={formData.chol} onChange={handleChange} />
            </label>
            <label>Max Heart Rate (thalach)
              <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} />
            </label>
            <label>Oldpeak
              <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
            </label>
            
            <div className="form-spacer"></div> 

            {/* --- Categorical Features (as dropdowns) --- */}
            <label>Sex
              <select name="sex" value={formData.sex} onChange={handleChange}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </label>
            <label>Chest Pain (cp)
              <select name="cp" value={formData.cp} onChange={handleChange}>
                <option value="3">Type 3 (Asymptomatic)</option>
                <option value="0">Type 0 (Typical Angina)</option>
                <option value="1">Type 1 (Atypical Angina)</option>
                <option value="2">Type 2 (Non-anginal)</option>
              </select>
            </label>
            <label>Fasting BS {'>'} 120 (fbs)
              <select name="fbs" value={formData.fbs} onChange={handleChange}>
                <option value="0">False</option>
                <option value="1">True</option>
              </select>
            </label>
            <label>Resting ECG (restecg)
              <select name="restecg" value={formData.restecg} onChange={handleChange}>
                <option value="0">Type 0</option>
                <option value="1">Type 1</option>
                <option value="2">Type 2</option>
              </select>
            </label>
            <label>Exercise Angina (exang)
              <select name="exang" value={formData.exang} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
            <label>Slope
              <select name="slope" value={formData.slope} onChange={handleChange}>
                <option value="2">Type 2 (Downsloping)</option>
                <option value="1">Type 1 (Flat)</option>
                <option value="0">Type 0 (Upsloping)</option>
              </select>
            </label>
            <label>Major Vessels (ca)
              <select name="ca" value={formData.ca} onChange={handleChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label>Thal
              <select name="thal" value={formData.thal} onChange={handleChange}>
                <option value="2">2 (Normal)</option>
                <option value="1">1 (Fixed Defect)</option>
                <option value="3">3 (Reversible Defect)</option>
                <option value="0">0</option>
              </select>
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Predict Risk'}
          </button>
        </form>
        {/* --- FIX: Removed the closing </form> tag --- */}
      </div>

      <div className="results-container">
        {error && <div className="error-message">{error}</div>}
        {result && <ResultCard probability={result.probability_high_risk} />}
      </div>
    </div>
  );
}

export default PredictorPage;