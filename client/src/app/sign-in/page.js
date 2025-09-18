'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Link from 'next/link'

export default function singin() {
    return (
        <div className=' sign'>
            <TextField id="outlined-basic" label="ID" variant="outlined" />
            <TextField id="outlined-basic" label="password" variant="outlined" />
            <Button><Link  href="/sign-up">Sign Up</Link></Button>
        </div>
    )
}