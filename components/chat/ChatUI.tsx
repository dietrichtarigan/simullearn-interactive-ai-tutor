import { useState, useEffect, useRef } from 'react';
import { useSupabase } from '@/lib/supabase-provider';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatUIProps {
  topicId: string;
}

export default function ChatUI({ topicId }: ChatUIProps) {
  const { supabase } = useSupabase();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          topic_id: topicId,
          sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: ChatMessage = { role: 'assistant', content: data.response };
        setMessages((prev) => [...prev, assistantMessage]);
        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
        }
      } else {
        setMessages((prev) => [...prev, { role: 'system', content: `Error: ${data.error || 'Unknown error'}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'system', content: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto border border-gray-300 rounded-md shadow-md p-4 bg-white">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-md max-w-[80%] ${
              msg.role === 'user' ? 'bg-gray-200 self-end' : msg.role === 'assistant' ? 'bg-black text-white self-start' : 'bg-yellow-100 text-yellow-800 self-center'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Tanyakan sesuatu kepada tutor AI..."
          className="flex-1 border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </div>
    </div>
  );
}
