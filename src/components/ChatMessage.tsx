import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message } from '../types';
import { Avatar } from './ui/Avatar';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <Avatar role={message.role} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-medium text-sm text-gray-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
          {!isUser && isStreaming && (
            <span className="inline-block w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
          )}
        </div>
        <div className="prose prose-sm max-w-none break-words">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="max-w-full overflow-x-auto">
                    <SyntaxHighlighter
                      style={materialDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}