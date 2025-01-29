import { useState } from "react";
import { Bot, LayoutDashboard, Table as TableIcon } from "lucide-react";
import { Charts } from "../components/ChartsPage";
import { DataTable } from "../components/tables/DataTable";
import { Tabs } from "../components/ui/Tabs";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";

const tabs = [
  {
    key: "charts",
    label: "Charts",
    icon: LayoutDashboard,
  },
  {
    key: "table",
    label: "Table",
    icon: TableIcon,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
          </div>
          <div className="flex justify-between h-16 items-center"></div>
          <Button icon={Bot}>
            <Link to={"/chat-assist"}>Chat Assist</Link>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key as "charts" | "table")}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "charts" ? <Charts /> : <DataTable />}
      </main>
    </div>
  );
}

export default App;
