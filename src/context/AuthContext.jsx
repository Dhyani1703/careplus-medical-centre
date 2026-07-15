import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // Register a new user
  const register = (name, email, phone, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.some((u) => u.email === email);
    if (alreadyExists) {
      return { success: false, message: "This email is already registered." };
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  // Login an existing user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      return { success: false, message: "Please register first." };
    }

    if (foundUser.password !== password) {
      return { success: false, message: "Incorrect password." };
    }

    setUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}