import React from 'react';
import './ResultCard.css'; // We will create this CSS file next

// This is the helper function with all the 5-level logic
const getRiskDetails = (probability) => {
  const probPercent = probability * 100;

  if (probPercent > 90) {
    return {
      level: 'Critical Risk',
      message: 'Your results indicate a critical risk. Please consult a medical professional immediately.',
      style: 'risk-critical', // This is used by the CSS
    };
  }
  if (probPercent > 70) {
    return {
      level: 'Very High Risk',
      message: 'Your results indicate a very high risk. We recommend scheduling a consultation with your doctor.',
      style: 'risk-very-high',
    };
  }
  if (probPercent > 50) {
    return {
      level: 'High Risk',
      message: 'Your results indicate a high risk. Please monitor your health and consider speaking with a doctor.',
      style: 'risk-high',
    };
  }
  if (probPercent > 30) {
    return {
      level: 'Borderline',
      message: 'Your risk is borderline. This is a good time to focus on positive lifestyle changes.',
      style: 'risk-borderline',
    };
  }
  // If none of the above, it's low risk
  return {
    level: 'Low Risk',
    message: 'Your results indicate a low risk. Keep up your healthy lifestyle!',
    style: 'risk-low',
  };
};

// This is the component itself
function ResultCard({ probability }) {
  // Get the details object
  const riskDetails = getRiskDetails(probability);
  const probabilityPercent = (probability * 100).toFixed(2);

  return (
    // We apply the dynamic style (e.g., 'risk-low') to the whole card
    <div className={`result-card ${riskDetails.style}`}>
      <h3>Prediction Result</h3>
      <p className="probability">
        {probabilityPercent} %
      </p>
      <p>Probability of High Risk</p>
      
      {/* This is the new, dynamic part */}
      <div className="risk-level-display">
        {riskDetails.level}
      </div>
      <p className="risk-message">{riskDetails.message}</p>
    </div>
  );
}

export default ResultCard;