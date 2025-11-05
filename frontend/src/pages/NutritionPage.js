// frontend/src/pages/NutritionPage.js

import React from 'react';
import './NutritionPage.css'; // We will create this CSS file
import { FaFish, FaLeaf, FaCarrot, FaChevronRight } from 'react-icons/fa';

// Placeholder images for meals. You can replace these.
const mealImg1 = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&q=80';
const mealImg2 = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80';
const mealImg3 = 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop&q=80';

function NutritionPage() {
  return (
    <div className="nutrition-page-container">
      
      {/* --- 1. Header --- */}
      <div className="nutrition-header">
        <h1>Eat for Your Heart</h1>
        <p>
          Discover how smart food choices can directly impact your
          cardiovascular health and support your wellness goals.
        </p>
      </div>

      {/* --- 2. Food Groups Section --- */}
      <div className="nutrition-content">
        <div className="nutrition-section">
          <h2>Heart-Healthy Food Groups</h2>
          <div className="food-group-grid">
            
            <div className="food-group-card">
              <div className="food-group-icon" style={{ backgroundColor: '#e0f3ff', color: '#007bff' }}>
                <FaFish />
              </div>
              <h3>Lean Proteins & Omega-3s</h3>
              <p>Opt for fish (like salmon and mackerel), chicken, beans, and lentils. These build muscle and can help lower 'bad' cholesterol.</p>
            </div>
            
            <div className="food-group-card">
              <div className="food-group-icon" style={{ backgroundColor: '#e0fff0', color: '#28a745' }}>
                <FaLeaf />
              </div>
              <h3>Leafy Greens & Vegetables</h3>
              <p>Pack your plate with spinach, kale, broccoli, and bell peppers. They're loaded with vitamins and antioxidants.</p>
            </div>

            <div className="food-group-card">
              <div className="food-group-icon" style={{ backgroundColor: '#fff4e0', color: '#fd7e14' }}>
                <FaCarrot />
              </div>
              <h3>Whole Grains & Fiber</h3>
              <p>Choose whole-wheat bread, oats, quinoa, and brown rice. Fiber helps manage cholesterol and keeps you full longer.</p>
            </div>

          </div>
        </div>

        {/* --- 3. Sample Meal Ideas --- */}
        <div className="nutrition-section">
          <h2>Sample Meal Ideas</h2>
          <div className="meal-ideas-grid">

            <div className="meal-card">
              <img src={mealImg1} alt="Breakfast Idea" />
              <div className="meal-card-content">
                <h3>Breakfast</h3>
                <p>Oatmeal with fresh berries and a handful of walnuts.</p>
              </div>
            </div>

            <div className="meal-card">
              <img src={mealImg2} alt="Lunch Idea" />
              <div className="meal-card-content">
                <h3>Lunch</h3>
                <p>Quinoa salad with mixed greens, chickpeas, and a lemon-tahini dressing.</p>
              </div>
            </div>

            <div className="meal-card">
              <img src={mealImg3} alt="Dinner Idea" />
              <div className="meal-card-content">
                <h3>Dinner</h3>
                <p>Baked salmon with a side of roasted asparagus and sweet potato.</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- 4. Quick Tips Section --- */}
        <div className="nutrition-section">
          <h2>Quick Tips for Success</h2>
          <ul className="quick-tips-list">
            <li>
              <FaChevronRight />
              <strong>Read Labels:</strong> Watch out for hidden "added sugars" and high sodium levels.
            </li>
            <li>
              <FaChevronRight />
              <strong>Hydrate Smart:</strong> Drink plenty of water. Swap sugary sodas and juices for water or herbal tea.
            </li>
            <li>
              <FaChevronRight />
              <strong>Cook at Home:</strong> This gives you full control over ingredients, salt, and fat.
            </li>
            <li>
              <FaChevronRight />
              <strong>Mindful Portions:</strong> Use smaller plates to help manage portion sizes without feeling deprived.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default NutritionPage;