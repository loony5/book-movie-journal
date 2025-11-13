'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { TextField, Button } from '@mui/material';

export default function ReviewSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('book'); // book or movie
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return alert('검색어를 입력하세요.');
    const res = await axios.get(`http://localhost:3001/api/search`, {
      params: { query, type },
    });
    setResults(res.data.items || []);
  };

  const handleSelect = (item) => {
    // 선택한 아이템 정보를 쿼리스트링으로 step2에 전달
    const encoded = encodeURIComponent(
      JSON.stringify({
        title: item.title.replace(/<[^>]*>?/g, ''), // HTML 태그 제거
        image: item.image,
      })
    );
    router.push(`/review/write?data=${encoded}`);
  };

  return (
    <div className='main'>
      <div className='search-field'>
        <TextField
          label='책 및 영화 검색'
          variant='outlined'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant='contained' onClick={handleSearch}>
          검색
        </Button>
      </div>

      <Grid container spacing={2} className='search-result'>
        {results.map((item, idx) => (
          <Grid size={6} className='search-item'>
            <Card
              sx={{ maxWidth: 200 }}
              key={idx}
              onClick={() => handleSelect(item)}
            >
              {item.image && (
                <CardMedia
                  component='img'
                  image={item.image}
                  alt={item.title}
                  height={300}
                />
              )}
              <CardContent>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {item.title.replace(/<[^>]*>?/g, '')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
