import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const fetchUser = async () => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        refreshTrigger,
        triggerRefresh,
        currentUser,
        setCurrentUser,
        fetchUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
