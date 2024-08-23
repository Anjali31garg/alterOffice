import React from 'react';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

interface CommentProps {
  text: string;
  timestamp: Timestamp; // Ensure this is a Firestore Timestamp
  user: string;
  avatar: string;
  file: string | null;
  reactions: { likes: number; dislikes: number };
}

const Comment: React.FC<CommentProps> = ({ text, timestamp, user, avatar, file, reactions }) => {
  // Convert Firestore Timestamp to JavaScript Date
  const date = timestamp?.toDate();
  
  return (
    <div>
      <Avatar src={avatar} />
      <p>{user}</p>
      <p>{date ? date.toLocaleString() : 'Unknown date'}</p> {/* Format the date */}
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {file && <img src={file} alt="attachment" style={{ width: '100px' }} />}
      <div>
        <span>👍 {reactions.likes}</span>
        <span>👎 {reactions.dislikes}</span>
      </div>
    </div>
  );
};

export default Comment;
