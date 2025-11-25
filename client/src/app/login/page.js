'use client';

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [user, setLoginUser] = useState({ id: '', password: '' });

  const handleLogin = async () => {
    const res = await axios.post(
      'http://localhost:3001/api/users/login',
      { userId: user.id, password: user.password },
      { withCredentials: true }
    );
    if (res.data.user) {
      setUser(res.data.user); // 전역 상태 업데이트
      router.push('/'); // 이동 시 AppBar도 자동 반영
    }
  };

  return (
    <div className='join'>
      <TextField
        label='ID'
        variant='outlined'
        defaultValue={user.id}
        onChange={(e) => setLoginUser({ ...user, id: e.target.value })}
      />
      <TextField
        label='password'
        variant='outlined'
        defaultValue={user.password}
        type='password'
        onChange={(e) => setLoginUser({ ...user, password: e.target.value })}
      />
      <Button
        variant='contained'
        color='success'
        onClick={() =>
          (window.location.href = 'http://localhost:3001/api/users/naver/login')
        }
      >
        네이버 로그인
      </Button>
      <div className='button-wrap'>
        <Button variant='outlined'>
          <Link href='/join'>회원가입</Link>
        </Button>
        <Button variant='contained' onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  );
}
