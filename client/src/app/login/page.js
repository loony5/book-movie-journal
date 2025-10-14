'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function login() {
  const user = React.useState({ id: '', password: '' });

  return (
    <div className=' join'>
      <TextField
        id='outlined-basic'
        label='ID'
        variant='outlined'
        defaultValue={user.id}
      />
      <TextField
        id='outlined-basic'
        label='password'
        variant='outlined'
        defaultValue={user.password}
      />
      <div className='button-wrap'>
        <Button variant='outlined'>
          <Link href='/join'>회원가입</Link>
        </Button>
        <Button variant='contained'>
          <Link href='/'>확인</Link>
        </Button>
      </div>
    </div>
  );
}
