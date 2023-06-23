import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>();

  useEffect(() => {
    let isMounted = true;
    setIsFetchingUser(true);
    Auth.currentAuthenticatedUser()
      .then((data) => {
        if (isMounted) {
          setCurrentUser(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCurrentUser(null);
        }
      })
      .finally(() => setIsFetchingUser(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    currentUser,
    isFetchingUser,
  };
};

export { useCurrentUser };
