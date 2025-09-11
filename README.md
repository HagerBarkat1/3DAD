# ⚡ Electricity Anomaly Detection (3DAD)

A **hybrid project** combining **Machine Learning** (for anomaly detection in electricity consumption) with a **React.js frontend** for a simple interactive interface.  
The ML model was developed in **Jupyter Notebook** using **Python (NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, imbalanced-learn)**.  
The UI was built with **React.js + Node.js** to simulate user interaction and visualize results.  

✨ Final ML model achieved **98% accuracy using SVM**.  

---

## 🚀 Features
- 🔍 Detect unusual electricity consumption patterns  
- ⚙️ Preprocessing: Outlier removal, Encoding, Normalization, SMOTE  
- 🤖 Tried multiple supervised algorithms → **SVM selected as best**  
- 📊 Data visualization with Matplotlib & Seaborn  
- 💻 React.js UI for user interaction (login, dashboard, predictions, charts)  

---

## 🛠️ Tech Stack
**Machine Learning:**  
- Python, Jupyter Notebook  
- NumPy, Pandas, Scikit-learn  
- Matplotlib, Seaborn, imbalanced-learn  

**Frontend (UI):**  
- React.js, React Router  
- Node.js (for development server)  
- CSS3 for styling  
- LocalStorage (for user/session handling)  

---

## 📂 Project Structure
---
📦 Electricity-Anomaly-Detection
┣ 📂 ml-model/ # Machine Learning Notebook
┃ ┗ 📜 Electricity_Anomaly_Detection.ipynb
┃
┣ 📂 ui/ # React.js frontend
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 pages/ # Login, Signup, Dashboard
┃ ┃ ┣ 📂 services/ # Mock ML service, auth
┃ ┃ ┣ 📜 App.js
┃ ┃ ┗ 📜 index.js
┃ ┣ 📜 package.json
┃ ┗ 📜 README.md (UI-specific)
┃
┣ 📂 data/ # Dataset files
┗ 📜 README.md # Main documentation
---


---

## ▶️ Demo
👉 [(https://drive.google.com/file/d/1ZMigqDMG2U31fwq3D855HUgH_rJ_H2Dt/view?usp=sharing)]
---

---

## ⚡ How to Run

### 🔹 Run ML Model
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Electricity-Anomaly-Detection.git
   cd Electricity-Anomaly-Detection/ml-model

2- Open the Jupyter Notebook:
jupyter notebook Electricity_Anomaly_Detection.ipynb

🔹 Run UI (React.js)

1- Navigate to ui/ folder:
cd ../ui

2- Install dependencies:
npm install

3- Start development server:
npm start

4- App runs on: http://localhost:3000

## 📊 Results
ML model achieved 98% accuracy with SVM
UI simulates user workflow: login/signup → dashboard → anomaly prediction & charts

Clear anomaly visualization and interactive interface

📌 Future Improvements
📡 Connect real ML model to frontend via Flask/FastAPI backend
⏱️ Real-time anomaly detection from IoT data streams
☁️ Deploy full system on cloud (AWS/GCP)
📱 Build mobile app version for wider accessibility

## 👤 Author
Hager Mahmoud Barkat

🌐 LinkedIn: https://www.linkedin.com/in/hager-barkat-1590b2269/ 

✉️ hagermahmoudbarkat123@gmail.com
--

Ahmed Mohammed Ramadan

🌐 LinkedIn: https://www.linkedin.com/in/ahmed-ramadan-27071125a/ 

✉️ ar1895460@gmail.com
---
