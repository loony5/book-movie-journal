'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import CardMedia from '@mui/material/CardMedia';

export default function WriteReview() {
  const params = useSearchParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    const data = params.get('data');
    if (data) setBook(JSON.parse(decodeURIComponent(data)));
  }, [params]);

  const handleSubmit = async () => {
    if (!review) return alert('리뷰 내용을 입력하세요.');
    try {
      const res = await axios.post(
        'http://localhost:3001/api/reviews',
        {
          title: book.title,
          image: book.image,
          review,
        },
        { withCredentials: true } // 세션 쿠키 포함!
      );
      alert('리뷰가 저장되었습니다!');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        console.error(err);
        alert('리뷰 저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className='p-6'>
      {book && (
        <div className='flex gap-4 mb-4 items-center'>
          {book.image && (
            <CardMedia
              image={book.image}
              alt={book.title}
              width='100'
              height='500'
            />
          )}
          <h2 className='text-xl font-semibold'>{book.title}</h2>
        </div>
      )}

      <TextField
        multiline
        rows={5}
        fullWidth
        label='리뷰 내용'
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button variant='contained' className='mt-4' onClick={handleSubmit}>
        리뷰 저장
      </Button>
    </div>
  );
}
