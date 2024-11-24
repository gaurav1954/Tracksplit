import React from "react";
import "./GroupChat.css";

const GroupChat = () => {
  const currentUser = "Alice"; // Replace with the logged-in user's name
  const messages = [
    { id: 1, sender: "Alice", amount: 100, note: "Paid for lunch", type: "expense" },
    { id: 2, sender: "Bob", amount: 150, note: "Paid for groceries", type: "expense" },
    { id: 3, sender: "Alice", amount: 50, note: "Paid for snacks", type: "expense" },
  ];

  const groupName = "Trip To Dehradun"; // Example group name

  return (
    <div className="group-chat">
      <div className="group-header">
        <h2>{groupName}</h2>
      </div>
      <div className="chat-box">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === currentUser ? "right" : "left"
            }`}
          >
            <p className="sender-name">
              {message.sender === currentUser ? "YOU" : message.sender}
            </p>
            <div className="message-details">
              <p className="amount">₹{message.amount}</p>
              <p className="note">{message.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChat;
