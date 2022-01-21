import React, { useState, useEffect, useContext, createContext } from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginUser = () => setIsLoggedIn(!isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggedIn(true);
    }
  });

  const DataContext = createContext({});
  const todaysDate = new Date().toISOString().split("T")[0];

  return (
    <div className="planner-app">
      <DataContext.Provider value={todaysDate}>
        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? <Dashboard /> : <Login logFunction={loginUser} />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
}

export default App;
