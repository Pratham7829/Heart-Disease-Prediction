import sys
import json
import pickle
import numpy as np
import pandas as pd
import joblib

data = json.loads(sys.stdin.read())

model = joblib.load("./ml/heart_knn_model.pkl")
scaler = joblib.load("./ml/scaler.pkl")
columns = joblib.load("./ml/columns.pkl")

# Convert input to DataFrame with correct column names
# Convert dictionary to DataFrame in correct order
df = pd.DataFrame([[ data[col] for col in columns ]], columns=columns)

scaled = scaler.transform(df)
pred = model.predict(scaled)[0]

result = {
    "prediction": int(pred),
    "message": "High Risk" if pred == 1 else "Low Risk"
}

print(json.dumps(result))
