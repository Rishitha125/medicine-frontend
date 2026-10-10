import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AddMedicine from "./pages/AddMedicine";
import Billing from "./pages/Billing";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/inventory" element={<Inventory />} />

                <Route path="/add-medicine" element={<AddMedicine />} />

                <Route path="/billing" element={<Billing />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;