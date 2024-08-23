import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

interface CommentProps {
  text: string;
  timestamp: Timestamp; 
  user: string;
  avatar: string;
  file: string | null;
  reactions: { likes: number; dislikes: number; usersWhoLiked: Set<string>; usersWhoDisliked: Set<string> };
  currentUser: string; // ID of the current user
  onReact: (type: 'like' | 'dislike' | 'remove') => void; // Callback for handling reactions
}

const Comment: React.FC<CommentProps> = ({ text, timestamp, user, avatar, file, reactions, currentUser, onReact }) => {
  const [localReactions, setLocalReactions] = useState({
    likes: reactions.likes,
    dislikes: reactions.dislikes,
    userReaction: reactions.usersWhoLiked.has(currentUser) ? 'like' : reactions.usersWhoDisliked.has(currentUser) ? 'dislike' : null,
  });

  useEffect(() => {
    setLocalReactions(prev => ({
      ...prev,
      likes: reactions.likes,
      dislikes: reactions.dislikes,
      userReaction: reactions.usersWhoLiked.has(currentUser) ? 'like' : reactions.usersWhoDisliked.has(currentUser) ? 'dislike' : null,
    }));
  }, [reactions, currentUser]);

  const handleLike = () => {
    if (localReactions.userReaction === 'like') {
      return; // Already liked
    }
    if (localReactions.userReaction === 'dislike') {
      // Remove previous dislike
      setLocalReactions(prev => ({ ...prev, dislikes: prev.dislikes - 1 }));
      onReact('remove');
    }
    setLocalReactions(prev => ({ ...prev, likes: prev.likes + 1, userReaction: 'like' }));
    onReact('like');
  };

  const handleDislike = () => {
    if (localReactions.userReaction === 'dislike') {
      return; // Already disliked
    }
    if (localReactions.userReaction === 'like') {
      // Remove previous like
      setLocalReactions(prev => ({ ...prev, likes: prev.likes - 1 }));
      onReact('remove');
    }
    setLocalReactions(prev => ({ ...prev, dislikes: prev.dislikes + 1, userReaction: 'dislike' }));
    onReact('dislike');
  };

  return (
    <div>
      <Avatar src={avatar} />
      <p>{user}</p>
      <p>{timestamp?.toDate().toLocaleString() || 'Unknown date'}</p>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {file && <img src={file} alt="attachment" style={{ width: '100px' }} />}
      <div>
        <button onClick={handleLike} aria-label="Like" disabled={localReactions.userReaction === 'like'}>
          👍 {localReactions.likes}
        </button>
        <button onClick={handleDislike} aria-label="Dislike" disabled={localReactions.userReaction === 'dislike'}>
          👎 {localReactions.dislikes}
        </button>
      </div>
    </div>
  );
};

export default Comment;
