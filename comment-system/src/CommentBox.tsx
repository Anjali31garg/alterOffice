import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Button, TextField } from '@mui/material';

const CommentBox: React.FC = () => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (comment.length > 0) {
      const docRef = await addDoc(collection(db, 'comments'), {
        text: comment,
        timestamp: serverTimestamp(),
        user: auth.currentUser?.displayName,
        avatar: auth.currentUser?.photoURL,
        file: file ? file.name : null,
        reactions: { likes: 0, dislikes: 0 },
      });
      setComment('');
      setFile(null);
    }
  };

  return (
    <div>
      <ReactQuill theme="snow" value={comment} onChange={setComment} />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default CommentBox;
    