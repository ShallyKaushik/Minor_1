import pandas as pd

TARGET_COLUMN = 'target'  # Make sure this matches your target column name

try:
    data = pd.read_csv('heart_data.csv')
    
    print(f"--- Data Check for 'heart_data.csv' ---")
    print(f"Total rows: {len(data)}")
    
    # This is the most important line:
    print("\nTarget Column Distribution:")
    print(data[TARGET_COLUMN].value_counts())
    
except FileNotFoundError:
    print("Error: 'heart_data.csv' not found.")
except KeyError:
    print(f"Error: Column '{TARGET_COLUMN}' not found in the CSV.")
    print(f"Please check the TARGET_COLUMN variable in this script.")