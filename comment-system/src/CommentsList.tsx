import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import CommentBox from './CommentBox';
import Comment from './Comment';

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, 'comments');
      const commentsQuery = query(
        commentsCollection,
        orderBy('timestamp', sortOrder === 'latest' ? 'desc' : 'asc'),
        limit(8 * page)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      setComments(commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchComments();
  }, [sortOrder, page]);

  return (
    <div>
      <div>
        <button onClick={() => setSortOrder('latest')}>Latest</button>
        <button onClick={() => setSortOrder('popularity')}>Popular</button>
      </div>
      <CommentBox />
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
};

export default CommentsList;
