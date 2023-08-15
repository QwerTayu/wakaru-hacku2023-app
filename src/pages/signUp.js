import { useState } from 'react';
import styles from '../styles/Sign.module.css'
import { signUpWithEmailAndPassword } from "@/firebase";
import Link from 'next/link';


function signUp() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await signUpWithEmailAndPassword(newEmail, newPassword);
        console.log(user);
        setNewEmail('');
        setNewPassword('');
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className={styles.title}>サインアップ</h1>
                <hr />
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <label>メールアドレス</label>
                        <input
                            type="text"
                            placeholder='メールアドレス'
                            name='mailAddress'
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label>パスワード</label>
                        <input
                            type="password"
                            placeholder='パスワード'
                            name='password' 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type={'submit'} className={styles.submitButton}>登録</button>
                    <p className={styles.sign}><Link href='/signIn'>ログインはこちら</Link></p>
                </div>
            </form>
        </div>
    );
}

export default signUp;
