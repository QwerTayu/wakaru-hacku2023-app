import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import StatusContent from '@/components/StatusContent'

const inter = Inter({ subsets: ['latin'] })

export default function Status() {
  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <StatusContent />
    <Menu />
    </>
  )
}
