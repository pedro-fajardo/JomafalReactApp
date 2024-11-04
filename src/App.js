import { useState } from "react";
import TopBar from "./components/TopBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientPage from "./pages/ClientPage";
import EquipmentPage from "./pages/EquipmentPage";

function App() {
   const [selectedTab, setSelectedTab] = useState("equipments");

   const setSelectedTabHandler = (selectedTab) => {
      setSelectedTab(selectedTab);
   }

   return (
      <Router>
         <TopBar selectedTab={selectedTab} setSelectedTab={setSelectedTabHandler} />
         <Routes>
         <Route path="/" exact element={<EquipmentPage />} />
         <Route path="/clients" element={<ClientPage />} />
         </Routes>
      </Router>
   );
}

export default App;

