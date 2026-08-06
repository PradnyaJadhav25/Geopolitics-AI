import React, { useRef, useEffect } from 'react';

const ChatInput = ({ onSend, disabled, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (value) {
      onSend(value);
      inputRef.current.value = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-group input-group-lg rounded-pill overflow-hidden">
        <input
          ref={inputRef}
          type="text"
          className="form-control border-0 ps-4 chat-input-field"
          placeholder={placeholder}
          onKeyDown={handleKeyPress}
          disabled={disabled}
        />
        <button type="submit" className="btn btn-primary px-4 send-btn" disabled={disabled}>
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </form>
  );

};

export default ChatInput;

