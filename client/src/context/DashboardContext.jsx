import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);
  return (
    <DashboardContext.Provider
      value={{
        refreshTrigger,
        triggerRefresh,
        isPopupVisible,
        setIsPopupVisible,
        selectedReview,
        setSelectedReview,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
