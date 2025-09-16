'use client'

import { useState, useEffect } from 'react'
import axios from "axios"

 
export default function App() {

  const onClick = () => {
    axios.get("http://localhost:3001/").then((res) => {
      console.log(res.data);
    });
  }
  
  return (
    <div>
      <button onClick={onClick}>Hello!</button>
    </div>
  )
}