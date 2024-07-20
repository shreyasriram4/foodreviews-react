import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState, useEffect} from 'react'
import MenuItem from '../components/MenuItem';

export default function HomePage(props) {
  console.log('Home page')

  return (
    <div>
      <MenuItem />
    </div>
  );
};