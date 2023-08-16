import { useState } from 'react';
import { signUpWithEmailAndPassword } from "@/firebase";
import Link from 'next/link';
import FormContent from '@/components/FormContent';
import router from 'next/router'

function signUp() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await signUpWithEmailAndPassword(newEmail, newPassword);
        console.log(user);
        if (user) {  
            await router.push('/signIn')
        }
        setNewEmail('');
        setNewPassword('');
    };

    return (
        <FormContent 
            title="サインアップ" 
            email={newEmail}
            setEmail={setNewEmail}
            password={newPassword}
            setPassword={setNewPassword}
            handleSubmit={handleSubmit}
            button="登録"
            description="ログインはこちら"
            link="./signIn"
        />
    );
}

export default signUp;
