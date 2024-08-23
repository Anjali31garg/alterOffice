import React from 'react';
import { Avatar } from '@mui/material';

interface CommentProps {
  text: string;
  timestamp: any;
  user: string;
  avatar: string;
  file: string | null;
  reactions: { likes: number; dislikes: number };
}

const Comment: React.FC<CommentProps> = ({ text, timestamp, user, avatar, file, reactions }) => {
  return (
    <div>
      <Avatar src={avatar} />
      <p>{user}</p>
      <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
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
