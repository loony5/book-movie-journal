'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    userId: {
      value: '',
      error: false,
      text: '영문 소문자 또는 숫자 포함 조합의 5~16자를 입력해주세요.',
      validation: false,
    },
    name: {
      value: '',
      error: false,
      text: '한글 또는 영문의 2~10자를 입력해주세요.',
      validation: false,
    },
    password: {
      value: '',
      error: false,
      text: '영문 대소문자 구분, 숫자, 특수문자 조합의 8~12자를 입력해주세요.',
      validation: false,
    },
    checkPassword: {
      value: '',
      error: false,
      text: '',
      validation: false,
    },
    phone: {
      value: '',
      error: false,
      text: '하이픈(-)은 제외한 숫자만 입력해주세요.',
      validation: false,
    },
  });

  const [checkJoin, setCheckJoin] = useState(false);

  useEffect(() => {
    const allValid = Object.values(user).every((field) => field.validation);
    setCheckJoin(allValid);
  }, [user]);

  const userIdHandler = (e) => {
    if (e.target.value.length < 5 || e.target.value.length > 16) {
      setUser((prev) => ({
        ...prev,
        userId: {
          ...prev.userId,
          value: e.target.value,
          error: true,
          validation: false,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        userId: {
          ...prev.userId,
          value: e.target.value,
          error: false,
          validation: true,
        },
      }));
    }
  };

  const nameHandler = (e) => {
    if (e.target.value.length < 2) {
      setUser((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          value: e.target.value,
          error: true,
          validation: false,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          value: e.target.value,
          error: false,
          validation: true,
        },
      }));
    }
  };

  const passwordHandler = (e) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/;

    if (!regex.test(e.target.value)) {
      setUser((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          value: e.target.value,
          error: true,
          validation: false,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          value: e.target.value,
          error: false,
          validation: true,
        },
      }));
    }
  };

  const checkPasswordHandler = (e) => {
    if (user.password.value !== e.target.value) {
      setUser((prev) => ({
        ...prev,
        checkPassword: {
          value: e.target.value,
          error: true,
          text: '패스워드를 확인해주세요.',
          validation: false,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        checkPassword: {
          value: e.target.value,
          error: false,
          text: '',
          validation: true,
        },
      }));
    }
  };

  const phoneHandler = (e) => {
    const regex = /^\d{3}\d{3,4}\d{4}$/;

    if (!regex.test(e.target.value)) {
      setUser((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          value: e.target.value,
          error: true,
          validation: false,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          value: e.target.value,
          error: false,
          validation: true,
        },
      }));
    }
  };

  const joinHandler = async () => {
    const userInfo = {
      userId: user.userId.value,
      name: user.name.value,
      password: user.password.value,
      phone: user.phone.value,
    };

    try {
      axios
        .post('http://localhost:3001/api/users/join', userInfo)
        .then((res) => {
          router.push('/login');
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
        label='ID'
        variant='outlined'
        value={user.userId.value}
        name='userId'
        error={user.userId.error}
        helperText={user.userId.text}
        onChange={userIdHandler}
      />
      <TextField
        label='Name'
        variant='outlined'
        value={user.name.value}
        name='name'
        error={user.name.error}
        helperText={user.name.text}
        onChange={nameHandler}
      />
      <TextField
        label='Password'
        variant='outlined'
        value={user.password.value}
        name='password'
        error={user.password.error}
        helperText={user.password.text}
        onChange={passwordHandler}
        type='password'
      />
      <TextField
        label='Confirm Password'
        variant='outlined'
        value={user.checkPassword.value}
        name='checkPassword'
        error={user.checkPassword.error}
        helperText={user.checkPassword.text}
        onChange={checkPasswordHandler}
        type='password'
      />
      <TextField
        label='Phone Number'
        variant='outlined'
        value={user.phone.value}
        name='phone'
        error={user.phone.error}
        helperText={user.phone.text}
        onChange={phoneHandler}
      />
      <Button variant='contained' onClick={joinHandler} disabled={!checkJoin}>
        가입하기
      </Button>
    </div>
  );
}
