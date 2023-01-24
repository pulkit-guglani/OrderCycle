import { createContext, useContext, useState } from "react";
import CustomizedSnackbar from "./SnackBar";

const appContext = createContext();

const ContextProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    severity: "error",
    message: "None",
    isVisible: false,
  });

  return (
    <appContext.Provider value={{ alertState, setAlertState }}>
      <CustomizedSnackbar
        alertState={alertState}
        setAlertState={setAlertState}
      />
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => useContext(appContext);
export default ContextProvider;
