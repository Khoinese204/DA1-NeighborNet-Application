import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface UserContextType {
  name: string;
  birthdate: Date;
  gender: string;
  clusterid: number;
  setName: (name: string) => void;
  setBirthdate: (birthdate: Date) => void;
  setGender: (gender: string) => void;
  setClusterid: (clusterid: number) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  name: '',
  birthdate: new Date(),
  gender: '',
  clusterid: 0,
  setName: () => {},
  setBirthdate: () => {},
  setGender: () => {},
  setClusterid: () => {},
});

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState<Date>(new Date()); 
  const [gender, setGender] = useState('');
  const [clusterid, setClusterid] = useState<number>(0);

  return (
    <UserContext.Provider value={{ name, birthdate, gender, clusterid, setName, setBirthdate, setGender, setClusterid }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);