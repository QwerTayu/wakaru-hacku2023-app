import { useState } from 'react';
import { auth, col, signUpWithEmailAndPassword } from "@/firebase";
import FormContent from '@/components/FormContent';
import router from 'next/router'
import { doc, getDocs, setDoc } from 'firebase/firestore';

function signUp() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    let isExits = false;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await signUpWithEmailAndPassword(newEmail, newPassword);
        console.log(user);
        if (user) {  
            const querySnapshot = await getDocs(col);
            querySnapshot.forEach((user) => {
              if( user.id === auth.currentUser.uid){
                  isExits = true;
                  console.log("Yeess"+user.id);
              }
            });
            if (!isExits) { // ユーザーが存在しない場合は作成
                try {
                    await setDoc(doc(col, auth.currentUser.uid), {
                        username: auth.currentUser.email,
                        isInOffice: true,
                        placeLat: 35,
                        placeLng: 135,
                        outTime: 1220,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            isExits = false;
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
