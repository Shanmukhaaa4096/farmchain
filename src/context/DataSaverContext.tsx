import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataSaverContextType {
  isDataSaver: boolean;
  toggleDataSaver: () => void;
}

const DataSaverContext = createContext<DataSaverContextType | undefined>(undefined);

export const DataSaverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDataSaver, setIsDataSaver] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('farmchain_data_saver');
      if (saved !== null) {
        return saved === 'true';
      }
      // Check for Save-Data client hint header preference if available
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      if (nav.connection?.saveData) {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem('farmchain_data_saver', String(isDataSaver));
      if (isDataSaver) {
        document.documentElement.classList.add('data-saver-mode');
      } else {
        document.documentElement.classList.remove('data-saver-mode');
      }
    } catch {
      // ignore storage failures
    }
  }, [isDataSaver]);

  const toggleDataSaver = () => {
    setIsDataSaver(prev => !prev);
  };

  return (
    <DataSaverContext.Provider value={{ isDataSaver, toggleDataSaver }}>
      {children}
    </DataSaverContext.Provider>
  );
};

export const useDataSaver = (): DataSaverContextType => {
  const context = useContext(DataSaverContext);
  if (!context) {
    return {
      isDataSaver: false,
      toggleDataSaver: () => {},
    };
  }
  return context;
};
