import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <>
      <Head>
        <title>wakaru | Product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={styles.main}>
      <h1>WAKARU</h1>
      <hr />
      <Link href="signIn">サインイン</Link>
      <h3 className={styles.notes}>注意事項</h3>
      <ul className={styles.note}>
        <li>このサービスは現在開発中です</li>
        <li>ページ右上のアイコンからアカウントデータの削除を行えます</li>
        <li>登録メールアドレスの最初の５文字がユーザー名として表示されます</li>
        <li>開発者は予告なくユーザのアカウントデータを削除します</li>
        <li>開発者は予告なくサービスを停止します</li>
        <li>開発者は予告なくサービスを変更します</li>
        <li>開発者は予告なくサービスを終了します</li>
      </ul>
    </div>
    </>
  )
}
