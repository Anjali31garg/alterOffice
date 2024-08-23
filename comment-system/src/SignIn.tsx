

import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn: React.FC = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <Button onClick={signInWithGoogle} variant="contained">
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignIn;
