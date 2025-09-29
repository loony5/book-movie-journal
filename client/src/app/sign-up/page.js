'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function singup() {
  const user = React.useState({
    id: '',
    password: '',
    checkPassword: '',
    name: '',
    phone: '',
  });
  return (
    <div className='sign'>
      <TextField
        id='outlined-basic'
        label='ID'
        variant='outlined'
        defaultValue={user.id}
      />
      <TextField
        id='outlined-basic'
        label='name'
        variant='outlined'
        defaultValue={user.name}
      />
      <TextField
        id='outlined-basic'
        label='password'
        variant='outlined'
        defaultValue={user.password}
      />
      <TextField
        id='outlined-basic'
        label='password'
        variant='outlined'
        defaultValue={user.checkPassword}
      />
      <TextField
        id='outlined-basic'
        label='phone number'
        variant='outlined'
        defaultValue={user.phone}
      />
      <Button>
        <Link href='/'>가입하기</Link>
      </Button>
    </div>
  );
}
