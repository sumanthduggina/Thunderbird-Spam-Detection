# 🛡️ AI-Powered Real-Time Phishing Detection for Thunderbird

A project designed to enhance email security by detecting phishing attacks in real-time using a custom Thunderbird extension integrated with machine learning models.

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

## 🧭 Future Improvements

- Host backend on AWS/GCP for 24/7 uptime
- Upgrade to Transformer-based models
- Add multilingual phishing detection
- Build UI dashboard and user feedback integration


## 🛠️ Implementation Guide

This guide outlines the steps to set up and run the real-time phishing detection system using Google Colab as the backend and Thunderbird as the email client.

---

### 📦 1. Email Classification Backend (Google Colab)

#### ✅ Step 1: Upload Python Scripts
Upload the following files to your Google Colab session:
- `LSTM.py`
- `Embedding_and_positional_encoding.py`
- `Preprocessing.py`
- `Training_and_evaluating.py`
- `Final_rf_model.pkl`
- `Lstm_url_classifier.pth`

#### ✅ Step 2: Install Required Libraries
In a Colab code cell, run:

`!pip install flask torch pyngrok`

### ✅ Step 3: Set Up Ngrok

1. Create an account at [ngrok.com](https://ngrok.com).
2. After registering, get your **auth token** from the Ngrok dashboard.
3. In your Google Colab notebook, run the following to authenticate:

`!ngrok authtoken YOUR_AUTH_TOKEN_HERE`

### ✅ Step 4: Start the Flask Server

- Run the main cell that launches the Flask app.
- Once started, Ngrok will display a public URL (e.g., `https://abc123.ngrok.io`).
- **Copy this URL** — you’ll use it in the Thunderbird extension.

---

## 🧩 2. Thunderbird Extension Setup

### ✅ Step 1: Update the Server URL

- Open the `background.js` file in your Thunderbird extension directory.
- Replace the existing backend URL with the Ngrok URL you copied.
- Save the file.

### ✅ Step 2: Load the Extension in Thunderbird

1. Open **Thunderbird**.
2. Navigate to: Tools > `Developer Tools > Debug Add-ons`
3. Click **Load Temporary Add-on**.
4. Select the `manifest.json` file located in your extension's root directory.

---

## 📬 3. View Classification Results

Once the extension is loaded:

- Open your inbox in Thunderbird.
- The extension will automatically extract email metadata and URLs.
- It will send this data to the backend server for classification.
- Based on the model’s prediction, suspicious emails will be:

- ✅ **Flagged visually**
- 🚨 **Highlighted with red indicators**
- 📛 **Labeled as spam or safe accordingly**

> ⚠️ **Note**: This extension runs temporarily and must be reloaded each time Thunderbird restarts.



