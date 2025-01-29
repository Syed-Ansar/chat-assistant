import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Tab {
  key: string;
  label: string;
  icon?: typeof LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={clsx(
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === tab.key
                  ? "border-[#0066b3] text-[#0066b3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {Icon && (
                <Icon
                  className={clsx(
                    "mr-2 h-5 w-5",
                    activeTab === tab.key
                      ? "text-[#0066b3]"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
