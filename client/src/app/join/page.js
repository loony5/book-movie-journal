'use client';

import axios from 'axios';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function singup() {
  const [user, setUser] = useState({
    userId: '',
    password: '',
    checkPassword: '',
    name: '',
    phone: '',
  });

  const handlerChange = (e) => {
    const { userId, password, checkPassword, name, phone } = e.target;
    setUser({
      userId,
      password,
      checkPassword,
      name,
      phone,
    });
  };

  const joinHandler = async () => {
    console.log(user.userId);

    try {
      axios.post('http://localhost:3001/api/users/join', user).then((res) => {
        console.log(res.data.message);
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.error);
      } else {
        console.log('서버 에러 발생');
      }
    }
  };

  return (
    <div className='join'>
      <TextField
        id='outlined-basic'
        label='ID'
        variant='outlined'
        defaultValue={user.userId}
        onChange={handlerChange}
      />
      <TextField
        id='outlined-basic'
        label='name'
        variant='outlined'
        defaultValue={user.name}
        onChange={handlerChange}
      />
      <TextField
        id='outlined-basic'
        label='password'
        variant='outlined'
        defaultValue={user.password}
        onChange={handlerChange}
      />
      <TextField
        id='outlined-basic'
        label='password'
        variant='outlined'
        defaultValue={user.checkPassword}
        onChange={handlerChange}
      />
      <TextField
        id='outlined-basic'
        label='phone number'
        variant='outlined'
        defaultValue={user.phone}
        onChange={handlerChange}
      />
      <Button variant='contained' onClick={joinHandler}>
        가입하기
      </Button>
    </div>
  );
}
