'use client';

import dynamic from 'next/dynamic';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';

// Create a component to wrap your children
const ClientOnly = ({ children }) => {
  return <>{children}</>;
};

// Use dynamic import to prevent SSR for this wrapper component
const NoSSRWrapper = dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false,
});

const appbar = ({ children }) => {
  return (
    <div className='root-container'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link href='/'>Book & Movie Journal</Link>
            </Typography>
            <Link href='/login'>로그인</Link>
          </Toolbar>
        </AppBar>
      </Box>
      <NoSSRWrapper>{children}</NoSSRWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(appbar), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});
