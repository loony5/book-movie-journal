'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const onClick = () => {
    axios.get('http://localhost:3001/').then((res) => {
      console.log(res.data);
    });
  };

  const member = () => {
    axios.get('http://localhost:3001/api/users').then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <button onClick={onClick}>클릭</button>
      <button onClick={member}>멤버</button>
    </div>
  );
}
