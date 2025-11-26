'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

export default function ReviewSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('book');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return alert('검색어를 입력하세요.');

    const res = await axios.get(`http://localhost:3001/api/search`, {
      params: { query, type },
    });

    const list =
      type === 'movie'
        ? res.data.results?.map((m) => ({
            title: m.title,
            image: m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : null,
          }))
        : res.data.items?.map((b) => ({
            title: b.title.replace(/<[^>]*>?/g, ''),
            image: b.image,
          }));

    setResults(list || []);
  };

  const handleSelect = (item) => {
    const encoded = encodeURIComponent(JSON.stringify(item));
    router.push(`/review/write?data=${encoded}`);
  };

  return (
    <div className='main'>
      <div className='search-field'>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(e, v) => v && setType(v)}
          sx={{ mb: 2 }}
          style={{ margin: 0 }}
        >
          <ToggleButton value='book'>📚 책</ToggleButton>
          <ToggleButton value='movie'>🎬 영화</ToggleButton>
        </ToggleButtonGroup>

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
          <Grid size={6} className='search-item' key={idx}>
            <Card sx={{ maxWidth: 200 }}>
              <CardActionArea onClick={() => handleSelect(item)}>
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
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
