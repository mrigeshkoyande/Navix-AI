'use client';

import { useState, useRef, useEffect } from 'react';
import { useVenue } from '@/context/VenueContext';
import { generateAIResponse, generateAIId } from '@/lib/aiEngine';
import { ChatMessage } from '@/lib/types';
import { ClientTime } from '@/components/ui/TimeAgo';
import { Send, Mic, Paperclip, Bot, User } from 'lucide-react';
import clsx from 'clsx';

const QUICK_ACTIONS = [
  'Find Coffee',
  'Shortest Line to Exit',
  'Heatmap Summary',
  'Staff Locations',
];

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isAI = msg.role === 'ai';
  return (
    <div className={clsx('flex gap-3 mb-5', isAI ? 'justify-start' : 'justify-end')}>
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-cyan-400" />
        </div>
      )}
      <div className={clsx('max-w-[75%]', isAI ? '' : 'order-first')}>
        <div
          className={clsx(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line',
            isAI
              ? 'bg-gray-800/70 text-gray-200 rounded-tl-sm border border-gray-700/50'
              : 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-tr-sm ml-auto'
          )}
        >
          {msg.content}
        </div>
        {/* Metrics */}
        {msg.metrics && msg.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {msg.metrics.map((m, i) => (
              <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-xl px-3 py-2">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{m.label}</div>
                <div className={clsx('text-base font-bold', {
                  'text-cyan-400': m.color === 'cyan',
                  'text-green-400': m.color === 'green',
                  'text-red-400': m.color === 'red',
                  'text-yellow-400': m.color === 'yellow',
                  'text-white': !m.color || m.color === 'white',
                })}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={clsx('text-[10px] text-gray-600 mt-1.5', isAI ? '' : 'text-right')}>
          <ClientTime date={msg.timestamp} /> • {isAI ? 'AI CORE' : 'OPERATOR'}
        </div>
      </div>
      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-cyan-400" />
      </div>
      <div className="bg-gray-800/70 border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const { state, dispatch } = useVenue();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: generateAIId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const response = generateAIResponse(text, state.zones);
    const aiMsg: ChatMessage = {
      id: generateAIId(),
      role: 'ai',
      content: response.content,
      timestamp: new Date(),
      metrics: response.metrics,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: aiMsg });
    setTyping(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Session header */}
      <div className="text-[10px] text-gray-600 text-center tracking-widest uppercase py-3 border-b border-gray-800/50">
        Session started: <ClientTime date={state.messages[0]?.timestamp ?? new Date(0)} /> UTC
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {state.messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      <div className="px-5 pb-3 flex gap-2 flex-wrap">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => sendMessage(action)}
            className="px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700/60 text-gray-400 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask FlowSphere AI anything about your venue..."
            className="flex-1 bg-transparent text-gray-300 text-sm placeholder-gray-600 focus:outline-none"
          />
          <button className="text-gray-600 hover:text-gray-400 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-400 transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <Send className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
        <div className="text-center text-[10px] text-gray-700 mt-2 tracking-wider">PRESS ENTER TO SEND</div>
      </div>
    </div>
  );
}
