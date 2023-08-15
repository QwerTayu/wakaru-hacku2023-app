import { useState } from 'react';
import styles from '../styles/Sign.module.css'
import { signUpWithEmailAndPassword } from "@/firebase";


function signUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await signUpWithEmailAndPassword(email, password);
        console.log(user);
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className={styles.title}>Sign Up</h1>
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
                </div>
            </form>
        </div>
    );
}

export default signUp;
