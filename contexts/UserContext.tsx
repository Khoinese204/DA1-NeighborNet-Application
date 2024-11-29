import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface UserContextType {
  name: string;
  birthdate: string;
  gender: string;
  setName: (name: string) => void;
  setBirthdate: (birthdate: string) => void;
  setGender: (gender: string) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  name: '',
  birthdate: '',
  gender: '',
  setName: () => {},
  setBirthdate: () => {},
  setGender: () => {},
});

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');

  return (
    <UserContext.Provider value={{ name, birthdate, gender, setName, setBirthdate, setGender }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);