import { MessageSquare, Clock, BarChartIcon, Trash2Icon } from "lucide-react";
import { Chat } from "../types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/Button";
import { Link } from "react-router";

interface ChatHistoryProps {
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatHistory({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: ChatHistoryProps) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="overflow-y-scroll flex-1">
        <Button
          onClick={onNewChat}
          icon={MessageSquare}
          fullWidth
          disabled={chats[0].messages.length <= 1}
        >
          New Chat
        </Button>

        <div className="mt-6 space-y-2 overflow-y-auto flex-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                chat.id === currentChatId
                  ? "bg-[#0066b3]/10 text-[#0066b3]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(chat.lastUpdated), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2Icon className="w-4 h-4 hover:text-red-600" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <Link to={"/analytics"}>
          <Button icon={BarChartIcon} fullWidth>
            Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}
