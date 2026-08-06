import React from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import './ChatStyles.css';

const ChatContainer = ({ messages, loading, onSend, onClear, children }) => {
  return (
    <div className="chat-container d-flex flex-column h-100">
      <ChatHeader onClear={onClear} />
      <div className="chat-body flex-grow-1">
        {children}
      </div>
      <ChatInput 
        onSend={onSend} 
        disabled={loading}
        placeholder="Ask about geopolitics, market impacts, recommendations..."
      />
    </div>
  );
};

export default ChatContainer;

