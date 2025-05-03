# === Model Training Section ===
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Load your dataset
df = pd.read_csv("internship_hiring_dataset_with_titles (1).csv")

# Define target and features
target = 'hired'
features = [
    'job_title', 'job_description', 'required_education', 'required_skills',
    'required_experience', 'candidate_education', 'candidate_skills', 'candidate_experience'
]

X = df[features]
y = df[target]

# Define preprocessing
text_features = ['job_description', 'required_skills', 'candidate_skills']
categorical_features = ['job_title', 'required_education', 'candidate_education']
numeric_features = ['required_experience', 'candidate_experience']

preprocessor = ColumnTransformer([
    ('text', TfidfVectorizer(), 'job_description'),
    ('required_skills', TfidfVectorizer(), 'required_skills'),
    ('candidate_skills', TfidfVectorizer(), 'candidate_skills'),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ('num', 'passthrough', numeric_features),
])

# Pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(pipeline, 'job_match_model.pkl')
