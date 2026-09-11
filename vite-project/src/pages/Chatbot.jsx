import { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import ChatContainer from '../components/chat/ChatContainer';
import ChatMessage from '../components/chat/ChatMessage';
import TypingIndicator from '../components/chat/TypingIndicator';
import '../components/chat/ChatStyles.css';
const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export default function Chatbot() {
  const [messages, setMessages] = useState([{ id: 'welcome', type: 'ai', text: 'Ask a geopolitical question.', time: timestamp() }]);
  const [loading, setLoading] = useState(false); const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  const handleSend = async text => { if (!text.trim() || loading) return; const userMsg = { id: Date.now(), type: 'user', text, time: timestamp() }; const history = messages.slice(-6).map(message => ({ role: message.type === 'ai' ? 'assistant' : 'user', content: message.text })); setMessages(previous => [...previous, userMsg]); setLoading(true); try { const { data } = await api.post('/chat', { message: text, history }); setMessages(previous => [...previous, { id: Date.now() + 1, type: 'ai', text: data.response, time: timestamp() }]); } catch (error) { const detail = error.response?.data?.detail || 'Gemini could not answer right now. Please try again shortly.'; setMessages(previous => [...previous, { id: Date.now() + 1, type: 'ai', text: `AI unavailable: ${detail}`, time: timestamp() }]); } finally { setLoading(false); } };
  return <ChatContainer messages={messages} loading={loading} onSend={handleSend} onClear={() => setMessages([])}><div className="messages-list" ref={messagesEndRef}>{messages.map((message, index) => <ChatMessage key={message.id} message={message} index={index} />)}{loading && <TypingIndicator />}</div></ChatContainer>;
}