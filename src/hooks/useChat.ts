import { useState, useEffect } from "react";
import { Chat, Message } from "../types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "chat-history";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "👋 Hi! How can I help you today?",
  timestamp: new Date().toISOString(),
};

// Simulate streaming by breaking text into chunks
const streamText = async (
  text: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
  const words = text.split(" ");
  const chunkSize = Math.max(1, Math.floor(Math.random() * 3));

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(" ") + " ";
    await new Promise((resolve) =>
      setTimeout(resolve, 50 + Math.random() * 50)
    );
    onChunk(chunk);
  }

  onComplete();
};

const CODE_EXAMPLES = [
  `Here's an example of a TypeScript utility type that makes all properties optional:

\`\`\`typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface User {
  name: string;
  profile: {
    age: number;
    address: {
      street: string;
      city: string;
    };
  };
}

// Now all properties are optional, deeply
const partialUser: DeepPartial<User> = {
  name: "John",
  profile: {
    address: {
      city: "New York"
    }
  }
};
\`\`\``,

  `Here's a React custom hook for handling infinite scroll:

\`\`\`typescript
import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  loadMore: () => Promise<void>;
}

export function useInfiniteScroll({ 
  threshold = 100,
  loadMore 
}: UseInfiniteScrollOptions) {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setLoading(true);
          await loadMore();
          setLoading(false);
        }
      },
      { rootMargin: \`\${threshold}px\` }
    );

    const sentinel = document.createElement('div');
    container.appendChild(sentinel);
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [threshold, loadMore, loading]);

  return { containerRef, loading };
}
\`\`\``,

  `Here's a JavaScript debounce function implementation:

\`\`\`javascript
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Example usage:
const handleSearch = debounce((searchTerm) => {
  console.log('Searching for:', searchTerm);
  // API call or expensive operation here
}, 300);

// Call it multiple times rapidly
handleSearch('a');
handleSearch('ap');
handleSearch('app');
// Only the last call will execute after 300ms
\`\`\``,

  `Here's a TypeScript example of the Builder pattern:

\`\`\`typescript
class Pizza {
  private toppings: string[] = [];
  private crustType: string = '';
  private size: string = '';

  addTopping(topping: string): this {
    this.toppings.push(topping);
    return this;
  }

  setCrust(type: string): this {
    this.crustType = type;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  build(): string {
    return \`A \${this.size} \${this.crustType} crust pizza with \${this.toppings.join(', ')}\`;
  }
}

// Usage:
const pizza = new Pizza()
  .setSize('large')
  .setCrust('thin')
  .addTopping('mushrooms')
  .addTopping('pepperoni')
  .build();

console.log(pizza);
// Output: "A large thin crust pizza with mushrooms, pepperoni"
\`\`\``,
];

const SAMPLE_RESPONSES = [
  "I understand your question. Let me help you with that. Here's a detailed explanation...",
  "That's an interesting point! Here's what I think about it...",
  "Based on the information you provided, I would recommend the following approach...",
  "Let me break this down into simpler terms. First, we need to consider...",
  "Here's a practical example that might help illustrate the concept...",
];

export function useChat() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const initialChat: Chat = {
      id: uuidv4(),
      title: "New Chat",
      messages: [WELCOME_MESSAGE],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    return [initialChat];
  });

  const [currentChatId, setCurrentChatId] = useState<string>(chats[0].id);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const currentChat = chats.find((chat) => chat.id === currentChatId)!;

  const addMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Add user message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastUpdated: new Date().toISOString(),
              title:
                chat.messages.length === 1
                  ? content.slice(0, 30) + "..."
                  : chat.title,
            }
          : chat
      )
    );

    // Create bot response message
    const botMessageId = uuidv4();
    const botResponse: Message = {
      id: botMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };

    // Add empty bot message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, botResponse],
              lastUpdated: new Date().toISOString(),
            }
          : chat
      )
    );

    // Start streaming simulation
    setIsStreaming(true);

    // user input -> Response
    const response = content.toLowerCase().includes("code")
      ? CODE_EXAMPLES[Math.floor(Math.random() * CODE_EXAMPLES.length)]
      : SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];

    await streamText(
      response,
      (chunk) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, content: msg.content + chunk }
                      : msg
                  ),
                }
              : chat
          )
        );
      },
      () => setIsStreaming(false)
    );
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: "New Chat",
      messages: [WELCOME_MESSAGE],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  return {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    addMessage,
    createNewChat,
    isStreaming,
  };
}
