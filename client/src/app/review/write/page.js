'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

export default function WriteReview() {
  const router = useRouter();
  const params = useSearchParams();
  const [data, setData] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    const raw = params.get('data');
    if (raw) setData(JSON.parse(decodeURIComponent(raw)));
  }, [params]);

  const handleSubmit = async () => {
    if (!review) return alert('리뷰 내용을 입력하세요.');

    try {
      await axios.post(
        'http://localhost:3001/api/reviews',
        {
          title: data.title,
          image: data.image,
          review,
        },
        { withCredentials: true }
      );

      alert('리뷰가 업로드되었습니다!');
      router.push('/');
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
    <div className='card-wrapper'>
      {data && (
        <Card sx={{ maxWidth: 400 }}>
          {data.image && (
            <CardMedia
              component='img'
              height='600'
              image={data.image}
              alt={data.title}
            />
          )}
          <CardContent>
            <Typography>{data.title}</Typography>
          </CardContent>
        </Card>
      )}

      <TextField
        multiline
        rows={10}
        fullWidth
        label='리뷰'
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button variant='contained' className='mt-4' onClick={handleSubmit}>
        리뷰 올리기
      </Button>
    </div>
  );
}
