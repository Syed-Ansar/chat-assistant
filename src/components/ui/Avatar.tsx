import { User, Bot, DivideIcon as LucideIcon } from "lucide-react";

interface AvatarProps {
  role: "user" | "assistant";
}

export function Avatar({ role }: AvatarProps) {
  const Icon: typeof LucideIcon = role === "user" ? User : Bot;
  const colors =
    role === "user"
      ? { bg: "bg-[#0066b3]/10", text: "text-[#0066b3]" }
      : { bg: "bg-[#ed1941]/10", text: "text-[#ed1941]" };

  return (
    <div
      className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}
    >
      <Icon className={`w-5 h-5 ${colors.text}`} />
    </div>
  );
}
