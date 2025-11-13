'use client';
import React, { useState } from 'react';
import axios from 'axios';
import CardMedia from '@mui/material/CardMedia';
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
    <div className='p-6'>
      <div className='flex gap-2 mb-4'>
        <TextField
          label='검색어'
          variant='outlined'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant='contained' onClick={handleSearch}>
          검색
        </Button>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {results.map((item, idx) => (
          <div
            key={idx}
            className='border p-2 rounded cursor-pointer hover:shadow-lg transition'
            onClick={() => handleSelect(item)}
          >
            {item.image && (
              <CardMedia
                component='img'
                image={item.image}
                alt={item.title}
                height={194}
              />
            )}
            <p className='mt-2 text-sm font-medium'>
              {item.title.replace(/<[^>]*>?/g, '')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
