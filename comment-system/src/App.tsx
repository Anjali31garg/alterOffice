import React from 'react';
import SignIn from './SignIn';
import CommentsList from './CommentsList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <CommentsList />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default App;
