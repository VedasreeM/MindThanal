# 🧠 MindThanal – A shelter for your mind

MindThanal is a Generative AI-based mental health chatbot developed during the 2025 Generative AI Hackathon. It provides empathetic responses to users, helping them share their thoughts and feel emotionally better. It supports voice input and intelligent suggestions to assist users in times of stress, anxiety, or loneliness.

## 💡 Features

- 🤖 Empathetic chatbot trained using Groq Cloud API
- 🎤 Voice input using Web Speech API
- 💬 Real-time chat interface with React frontend
- 🧘 Suggests motivational activities and exercises
- 🧑‍🤝‍🧑 User-friendly, conversational UI
- 🔒 Privacy-respecting — no sensitive data stored

## 🛠️ Tech Stack

- **Frontend**: React, Web Speech API
- **Backend**: Flask, Groq Cloud API
- **Deployment**: Localhost (for development)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mindthanal.git
cd mindthanal
````

### 2. Run the Frontend (React)

```bash
npm install
npm start
```

### 3. Run the Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> ⚠️ Make sure the backend is running on the expected port (default: `http://localhost:5000`) and the frontend fetches from the same.

## 📁 Project Structure

```
mindthanal/
├── frontend/       # React app with voice integration
├── backend/        # Flask app handling API routes and Groq interaction
└── README.md       # Project documentation
```

## 👨‍💻 Contributors

| Name     | Contribution             |
| -------- | ------------------------ |
| Sabari R Nadh | Frontend Developer       |
| Anjana S | Frontend Developer       |
| Vedasree M    | Frontend Developer       |
| Adersh A | Groq API & Training Data |

---

## 🤝 Acknowledgements

* **Groq Cloud** for Generative AI APIs
* **React & Flask** for a seamless full-stack experience
* **Web Speech API** for voice interaction support

