import { useState, useEffect, useRef } from 'react';
import { chatHistory } from '../data/mockData';
import ChatContainer from '../components/chat/ChatContainer';
import ChatMessage from '../components/chat/ChatMessage';
import TypingIndicator from '../components/chat/TypingIndicator';
import '../components/chat/ChatStyles.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Format mock data for new UI (add types/timestamps)
    const formattedHistory = chatHistory.map((msg, idx) => ({
      id: `mock-${idx}`,
      type: msg.role === 'user' ? 'user' : 'ai',
      text: msg.text,
      time: msg.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }));
    setMessages(formattedHistory);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { 
      id: Date.now(), 
      type: 'user', 
      text, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) 
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Fake AI response
    setTimeout(() => {
      const aiResponses = [
        'India maintains geopolitical stability despite border tensions, but watch China economic slowdown.',
        'Nifty 50 likely to recover 2.3% next week if Fed rate cut confirmed.',
        'High confidence: India-China trade talks progress positive for bilateral relations.',
        'Recommendation: Increase defense allocation by 12%, monitor oil prices.',
        'Risk matrix shows moderate escalation probability - confidence 78%.',
        'AI analysis complete. Event correlation matrix available in dashboard.',
        'Oil prices volatile due to Middle East tensions - hedge recommendation.',
        'Russia sanctions impact: European energy prices up 15% projected.'
      ];
      const aiMsg = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)], 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200 + Math.random() * 1800);
  };

  const handleClear = () => {
    setMessages([]);
    setLoading(false);
  };

  return (
    <ChatContainer 
      messages={messages} 
      loading={loading} 
      onSend={handleSend}
      onClear={handleClear}
    >
      <div className="messages-list" ref={messagesEndRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={msg.id} message={msg} index={index} />
        ))}
        {loading && <TypingIndicator />}
      </div>
    </ChatContainer>
  );
}

