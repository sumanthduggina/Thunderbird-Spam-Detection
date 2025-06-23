# 🛡️ AI-Powered Real-Time Phishing Detection for Thunderbird

A capstone project designed to enhance email security by detecting phishing attacks in real-time using a custom Thunderbird extension integrated with machine learning models.

---

## 🚀 Project Overview

Phishing emails pose a growing threat worldwide. Traditional spam filters struggle to detect new, sophisticated attacks. This project introduces a **Thunderbird email extension** powered by **LSTM** and **Random Forest** models to identify and flag suspicious emails instantly.

---

## 🔍 Key Features

- 🔗 **Phishing URL Detection** using an LSTM neural network
- 📧 **Sender Email Analysis** via Random Forest
- ⚡ **Real-Time Detection** inside the Thunderbird email client
- 🔁 **Backend communication** using Flask APIs and Ngrok
- 🧠 Models trained on open-source phishing datasets from Kaggle and Zenodo

---

## 🧠 ML Models Used

1. **LSTM Model** (URL-level detection)
   - Character-level embedding
   - 2-layer LSTM, hidden size 32
   - Achieved ~84.2% accuracy

2. **Random Forest** (Email metadata classification)
   - Features: digit count, domain name length, special characters, etc.
   - 100 estimators
   - F1 Score: 0.80

---

## 🛠️ Tech Stack

- **Backend**: Python, Flask, PyTorch, Scikit-learn
- **Frontend**: JavaScript, CSS, JSON (Thunderbird Extension)
- **Deployment**: Google Colab, Ngrok

---

## 🧪 How It Works

1. User opens an email in Thunderbird.
2. Extension script extracts the email sender and URLs.
3. Data is sent to Flask backend via HTTP POST.
4. ML models classify the content.
5. If phishing is detected, the email is flagged visually in the inbox.

---

## 📁 Repository Structure
📦thunderbird-phishing-detector/
├── backend/ # Flask server with ML models
│ ├── rf_model.pkl
│ ├── lstm_model.pth
│ └── app.py
├── extension/ # Thunderbird extension files
│ ├── manifest.json
│ ├── background.js
│ ├── content-script.js
│ └── styles.css
├── data/ # Sample datasets
├── README.md



## 🧭 Future Improvements

- Host backend on AWS/GCP for 24/7 uptime
- Upgrade to Transformer-based models
- Add multilingual phishing detection
- Build UI dashboard and user feedback integration
