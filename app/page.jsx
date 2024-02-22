'use client'
import styles from './page.module.css'
import HomeSeccion1 from '../Components/Home-seccion1'
import HomeSeccion2 from '@/Components/HomeSeccion2'
import RootLayout from '@/app/layout'
import { signIn, signOut, useSession } from 'next-auth/react'


const Home = () => {

  return (
    <RootLayout showNavigation={true}>
        <HomeSeccion1/>
        <HomeSeccion2 />
    </RootLayout>
     
  )
}

export default Home
