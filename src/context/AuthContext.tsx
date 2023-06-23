import React, { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

interface CognitContextValue {
  user: CognitoUser | null;
  setUser: (user: CognitoUser | null) => void;
}

const CognitoContext = createContext<CognitContextValue>({
  user: null,
  setUser: () => null,
});

function CognitoProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    async function checkUser() {
      Auth.currentAuthenticatedUser()
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
    checkUser();
  }, []);

  return (
    <CognitoContext.Provider value={{ user, setUser }}>
      {children}
    </CognitoContext.Provider>
  );
}

const useCognito = (): CognitContextValue => useContext(CognitoContext);

export { CognitoProvider, useCognito, CognitoContext };
