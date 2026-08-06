import React from 'react';

const ChatMessage = ({ message, index }) => {
  const isUser = message.type === 'user';
  const avatar = isUser ? '👤' : '🤖';
  const bgClass = isUser ? 'bg-primary text-white' : 'bg-secondary-subtle';

  return (
    <div className={`message-wrapper ${isUser ? 'justify-content-end' : 'justify-content-start'} fade-in`}
         style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="message d-flex align-items-start gap-2 max-w-80">
        <div className={`avatar ${isUser ? 'order-1' : 'order-2'}`}>
          <span className="avatar-icon">{avatar}</span>
        </div>
        <div className={`bubble ${bgClass} p-3 position-relative`}>
          <div className="bubble-content">{message.text}</div>
          <div className="timestamp mt-1 small opacity-75">{message.time}</div>
          {!isUser && (
            <div className={`tail ${isUser ? 'tail-right' : 'tail-left'}`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

