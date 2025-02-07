import { useState } from "react";

const useAuthState = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    attempts,
    setAttempts,
  };
};

export default useAuthState;
