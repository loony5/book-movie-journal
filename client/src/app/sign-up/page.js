'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link'

export default function singup() {
    return (
        <div className=' sign'>
            <TextField id="outlined-basic" label="ID" variant="outlined" />
            <TextField id="outlined-basic" label="password" variant="outlined" />
            <TextField id="outlined-basic" label="password" variant="outlined" />
            <TextField id="outlined-basic" label="name" variant="outlined" />
            <TextField id="outlined-basic" label="phone number" variant="outlined" />
            <Button><Link  href="/">가입하기</Link></Button>
        </div>
    )
}