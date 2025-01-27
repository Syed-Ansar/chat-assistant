import { Route, Routes as BrowserRoutes } from "react-router";
import ChatAssist from "../pages/ChatAssist";
import Analytics from "../pages/Analytics";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/chat-assist" element={<ChatAssist />} />
      <Route path="/analytics" element={<Analytics />} />
    </BrowserRoutes>
  );
};

export default Routes;
