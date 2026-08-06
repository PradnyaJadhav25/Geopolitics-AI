import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator d-flex align-items-center gap-2 fade-in">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <small className="text-muted">AI is typing...</small>
    </div>
  );
};

export default TypingIndicator;

