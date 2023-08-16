import styles from "./FormContent.module.css"
import Link from "next/link";

function FormContent(props) {
    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => props.handleSubmit(e)}>
                <h1 className={styles.title}>{props.title}</h1>
                <hr />
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <label>メールアドレス</label>
                        <input
                            type="text"
                            placeholder='メールアドレス'
                            name='mailAddress'
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label>パスワード</label>
                        <input
                            type="password"
                            placeholder='パスワード'
                            name='password' 
                            value={props.password}
                            onChange={(e) => props.setPassword(e.target.value)}
                        />
                    </div>
                    <button type={'submit'} className={styles.submitButton}>{props.button}</button>
                    <p className={styles.sign}><Link href={props.link}>{props.description}</Link></p>
                </div>
            </form>
        </div>
    );
}

export default FormContent;
