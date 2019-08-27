import React, { useState, useContext } from 'react';

const ErrorContext = React.createContext(['', () => {}]);

export const useErrorContext = () => useContext(ErrorContext);

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState('');
  return (
    <ErrorContext.Provider
      value={[
        error,
        setError,
      ]}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
