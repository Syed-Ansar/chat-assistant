import { useState } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ChatHistory } from "../components/ChatHistory";
import { useChat } from "../hooks/useChat";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

function ChatAssist() {
  const {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    addMessage,
    createNewChat,
    isStreaming,
  } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Card
        className={`
          fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-200
          transform transition-transform duration-200 ease-in-out lg:relative lg:transform-none
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <ChatHistory
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={(chatId) => {
            setCurrentChatId(chatId);
            setIsSidebarOpen(false);
          }}
          onNewChat={createNewChat}
        />
      </Card>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Mobile header */}
        <Card className="lg:hidden flex items-center p-4 rounded-none">
          <Button
            variant="secondary"
            icon={isSidebarOpen ? X : Menu}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <h1 className="ml-4 font-semibold text-lg">Chat</h1>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {currentChat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreaming={
                isStreaming &&
                message.id ===
                  currentChat.messages[currentChat.messages.length - 1]?.id
              }
            />
          ))}
        </div>

        {/* Input Field */}
        <ChatInput onSendMessage={addMessage} disabled={isStreaming} />
      </div>
    </div>
  );
}

export default ChatAssist;
