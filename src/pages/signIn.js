import { useState } from 'react';
import { logInWithEmailAndPassword, logOut } from "@/firebase";
import Link from 'next/link';
import FormContent from '@/components/FormContent';
import router from 'next/router'


function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await logInWithEmailAndPassword(email, password);
        console.log(user);
        if (user) {  
            await router.push('/home')
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
