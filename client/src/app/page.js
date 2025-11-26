'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@mui/material/Button';
import CardComponent from './components/Card';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/reviews')
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('리뷰 불러오기 실패:', err);
      });

    const checkLogin = () => {
      fetch('http://localhost:3001/api/users/check', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then(({ loggedIn }) => setLoggedIn(loggedIn));
    };

    checkLogin();
    const timer = setInterval(checkLogin, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='review-wrapper'>
      {loggedIn && (
        <Button
          variant='outlined'
          onClick={() => router.push('/review')}
          style={{ marginTop: '50px' }}
        >
          리뷰하기
        </Button>
      )}
      <div className='card-wrapper'>
        {reviews.map((review) => (
          <CardComponent key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
