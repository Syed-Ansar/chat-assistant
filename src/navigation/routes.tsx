import { Route, Routes as BrowserRoutes } from "react-router";
import ChatAssist from "../pages/ChatAssist";
import Analytics from "../pages/Analytics";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/chat-assist" element={<ChatAssist />} />
      <Route path="/analytics" element={<Analytics />} />
    </BrowserRoutes>
  );
};

export default Routes;
