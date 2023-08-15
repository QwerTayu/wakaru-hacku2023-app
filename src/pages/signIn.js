import { useState } from 'react';
import styles from '../styles/Sign.module.css'
import { logInWithEmailAndPassword, logOut } from "@/firebase";
import Link from 'next/link';


function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await logInWithEmailAndPassword(email, password);
        console.log(user);
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className={styles.title}>サインイン</h1>
                <hr />
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <label>メールアドレス</label>
                        <input
                            type="text"
                            placeholder='メールアドレス'
                            name='mailAddress'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label>パスワード</label>
                        <input
                            type="password"
                            placeholder='パスワード'
                            name='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type={'submit'} className={styles.submitButton}>ログイン</button>
                    <p className={styles.sign}><Link href='/signUp'>利用登録はこちら</Link></p>
                </div>
            </form>
            <div className={styles.logout}>
                <button type={'button'} onClick={logOut}>ログアウト</button>
            </div>
        </div>
    );
}

export default signIn;
