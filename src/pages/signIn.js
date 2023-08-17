import { useState } from 'react';
import { auth, db, logInWithEmailAndPassword,col } from "@/firebase";
import FormContent from '@/components/FormContent';
import router from 'next/router'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';


function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await logInWithEmailAndPassword(email, password);
        if (user) { 
            await router.push('/home');
        } else {
            await router.push('/signUp')
        }
        setEmail('');
        setPassword('');
    };

    return (
        <FormContent 
            title="サインイン" 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            button="ログイン"
            description="利用登録はこちら"
            link="./signUp"
        />
    );
}

export default signIn;
