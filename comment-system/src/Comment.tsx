import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

interface CommentProps {
  text: string;
  timestamp: Timestamp; 
  user: string;
  avatar: string;
  file: string | null;
  reactions: { likes: number; dislikes: number };
  onReact: (type: 'like' | 'dislike') => void; // Callback for handling reactions
}

const Comment: React.FC<CommentProps> = ({ text, timestamp, user, avatar, file, reactions, onReact }) => {
  const [localReactions, setLocalReactions] = useState(reactions);

  // Convert Firestore Timestamp to JavaScript Date
  const date = timestamp?.toDate();

  const handleLike = () => {
    setLocalReactions(prev => ({ ...prev, likes: prev.likes + 1 }));
    onReact('like');
  };

  const handleDislike = () => {
    setLocalReactions(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
    onReact('dislike');
  };

  return (
    <div>
      <Avatar src={avatar} />
      <p>{user}</p>
      <p>{date ? date.toLocaleString() : 'Unknown date'}</p> {/* Format the date */}
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {file && <img src={file} alt="attachment" style={{ width: '100px' }} />}
      <div>
        <button onClick={handleLike} aria-label="Like">
          👍 {localReactions.likes}
        </button>
        <button onClick={handleDislike} aria-label="Dislike">
          👎 {localReactions.dislikes}
        </button>
      </div>
    </div>
  );
};

export default Comment;
