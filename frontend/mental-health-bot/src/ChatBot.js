import React, { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to listen. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Bot is offline." }]);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Mind <span>Thanal</span></h2>
        <button className="new-chat-btn">+ New Chat</button>
      </aside>

      <main className="chat-area">
        <header className="chat-header">
          <div className="version-badge">MindThanal 2.0</div>
          <div className="user-controls">
            <span className="dark-toggle"></span>
            <div className="avatar"></div>
          </div>
        </header>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Send a message..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </main>
    </div>
  );
};

export default ChatBot;
