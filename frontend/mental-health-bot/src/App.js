import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to listen. How are you feeling today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async (textArg) => {
  const rawInput = typeof textArg === "string" ? textArg : input;
  const text = (rawInput ?? "").trim();
  if (!text) return;

  const userMsg = { text, sender: "user" };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);

  try {
    const res = await axios.post("https://mindthanal.onrender.com/chat", {
      message: text,
    });

    const botText = typeof res.data.response === "string"
      ? res.data.response
      : JSON.stringify(res.data.response);

    const botMsg = { text: botText, sender: "bot" };
    setMessages((prev) => [...prev, botMsg]);
    speak(botText);
  } catch (err) {
    const errorMsg = {
      text: "⚠️ Failed to get response from server.",
      sender: "bot",
    };
    setMessages((prev) => [...prev, errorMsg]);
  } finally {
    setIsTyping(false);
  }
};


  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (listening) {
      recognition.stop();
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => {
      console.error("Speech error:", e);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      recognition.stop();
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Recognition already active:", err);
    }
  };

  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { text: "Hello! I'm here to listen. How are you feeling today?", sender: "bot" },
    ]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <div className="header-shimmer"></div>
          <h2 className="app-title">MindThanal.AI</h2>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>I'm here to listen</span>
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-container ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className={`chat-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message-container bot-message">
              <div className="chat-bubble bot typing-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage()}
              placeholder="Type how you feel or speak..."
              disabled={isTyping}
              className="message-input"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="send-button"
            >
              {isTyping ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg
                  className="send-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>

            {/* 🎤 Mic Button */}
            <button
              onClick={startListening}
              disabled={isTyping}
              title="Speak"
              className="send-button"
              style={{ backgroundColor: listening ? "#f87171" : "#10b981" }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 1v8m4 4a4 4 0 01-8 0V9a4 4 0 018 0v4zm-4 8v-4m0 0H9m3 0h3"
                />
              </svg>
            </button>
          </div>

          {/* Utility Buttons */}
          <div className="button-group">
            <button onClick={stopSpeaking} className="utility-button stop-speaking">
              Stop Reading
            </button>
            <button onClick={clearChat} className="utility-button clear-chat">
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
