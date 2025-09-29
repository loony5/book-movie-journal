'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function signin() {
  const user = React.useState({ id: '', password: '' });

  return (
    <div className=' sign'>
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
      <Button>
        <Link href='/sign-up'>Sign Up</Link>
      </Button>
    </div>
  );
}
