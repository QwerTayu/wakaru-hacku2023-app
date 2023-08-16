import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import HomeContent from '@/components/HomeContent'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <div className={styles.main}>
      <div>こんなアプリですよ～</div>
      <hr />
      <Link href="signUp">使ってみる→</Link>
    </div>
  )
}
