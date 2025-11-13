'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Button from '@mui/material/Button';
import Link from 'next/link';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';

export default function App() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date'];
  return (
    <>
      <Button color='inherit'>
        <Link href='/review'>리뷰하기</Link>
      </Button>
      <div className='card-wrapper'>
        {items.map((item, index) => (
          <Card></Card>
        ))}
      </div>
    </>
  );
}
