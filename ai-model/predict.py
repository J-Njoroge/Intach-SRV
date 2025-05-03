import pandas as pd
import joblib

# Load saved model
model = joblib.load('job_match_model.pkl')

# Candidate info (you can get this from user input)
candidate_info = {
    "candidate_education": "Bachelor's",
    "candidate_skills": "Python, SQL, Data Analysis",
    "candidate_experience": 3
}

# List of available jobs (you may load this from a jobs table or API)
jobs_df = pd.DataFrame([
    {
        "job_title": "Data Scientist",
        "job_description": "Analyze data and build predictive models.",
        "required_education": "Bachelor's",
        "required_skills": "Python, Machine Learning, SQL",
        "required_experience": 2,
    },
    {
        "job_title": "Business Analyst",
        "job_description": "Analyze business metrics and generate reports.",
        "required_education": "Bachelor's",
        "required_skills": "Excel, SQL, Communication",
        "required_experience": 1,
    },
    {
        "job_title": "ML Engineer",
        "job_description": "Design ML pipelines for production.",
        "required_education": "Master's",
        "required_skills": "Python, TensorFlow, AWS",
        "required_experience": 4,
    }
])

# Expand candidate info across all jobs
for key in ['candidate_education', 'candidate_skills', 'candidate_experience']:
    jobs_df[key] = candidate_info[key]

# Predict probabilities
probs = model.predict_proba(jobs_df)[:, 1]  # probability of hired == 1
jobs_df['hire_probability'] = probs

# Sort and recommend top jobs
top_jobs = jobs_df.sort_values(by='hire_probability', ascending=False)
print("Recommended Jobs:\n", top_jobs[['job_title', 'hire_probability']])
