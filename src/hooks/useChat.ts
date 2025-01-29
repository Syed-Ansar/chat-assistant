import { useState, useEffect } from "react";
import { Chat, Message } from "../types";
import { v4 as uuidv4 } from "uuid";
import { CODE_EXAMPLES, SAMPLE_RESPONSES } from "../constants/sample-outputs";

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
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const onDeleteChat = (chatId: string) => {
    setChats((prev) => {
      if (prev.length === 1) {
        const newChat: Chat = {
          id: uuidv4(),
          title: "New Chat",
          messages: [WELCOME_MESSAGE],
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
        setCurrentChatId(newChat.id);
        return [newChat];
      }

      const filteredChats = prev.filter((chat) => chat.id !== chatId);

      if (chatId === currentChatId) {
        const currentIndex = prev.findIndex((chat) => chat.id === chatId);
        const nextChatIndex =
          currentIndex === prev.length - 1 ? currentIndex - 1 : currentIndex;
        const nextChat = filteredChats[nextChatIndex];
        setCurrentChatId(nextChat.id);
      }

      return filteredChats;
    });
  };

  return {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    addMessage,
    onDeleteChat,
    createNewChat,
    isStreaming,
  };
}
