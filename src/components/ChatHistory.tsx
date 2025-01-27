import { MessageSquare, Clock } from "lucide-react";
import { Chat } from "../types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/Button";

interface ChatHistoryProps {
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatHistory({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
}: ChatHistoryProps) {
  return (
    <div className="h-full flex flex-col p-4">
      <Button onClick={onNewChat} icon={MessageSquare} fullWidth>
        New Chat
      </Button>

      <div className="mt-6 space-y-2 overflow-y-auto flex-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              chat.id === currentChatId
                ? "bg-purple-100 text-purple-900"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="font-medium truncate">{chat.title}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(chat.lastUpdated), {
                addSuffix: true,
              })}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
