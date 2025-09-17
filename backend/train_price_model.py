import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os

# Set CSV path
csv_path = os.path.join('market', 'market.csv')

# Load dataset
df = pd.read_csv(csv_path)

# Convert Arrival_Date to datetime
df['Arrival_Date'] = pd.to_datetime(df['Arrival_Date'], format='%d-%m-%Y')

# Extract month and day
df['Month'] = df['Arrival_Date'].dt.month
df['Day'] = df['Arrival_Date'].dt.day

# Encode Commodity (crop)
le_crop = LabelEncoder()
df['Commodity_Code'] = le_crop.fit_transform(df['Commodity'])

# Features and target
X = df[['Commodity_Code', 'Month', 'Day']]
y = df['Modal Price']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, y_pred))
print("R2 Score:", r2_score(y_test, y_pred))

# Save model and encoder into market/ folder
joblib.dump(model, os.path.join('market', 'price_predictor_model.pkl'))
joblib.dump(le_crop, os.path.join('market', 'crop_label_encoder.pkl'))

print("✅ Model and encoder saved successfully.")
