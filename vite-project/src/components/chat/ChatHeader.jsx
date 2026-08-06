import React from 'react';

const ChatHeader = ({ onClear }) => {
  return (
    <div className="chat-header">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-1 fw-bold">🌍 Geopolitics AI</h5>
          <p className="mb-0 text-muted small">Real-time geopolitical analysis & recommendations</p>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={onClear}>
          <i className="bi bi-trash me-1"></i>Clear
        </button>
      </div>
    </div>
  );

};

export default ChatHeader;

