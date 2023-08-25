import { useState } from 'react';
import { auth, logInWithEmailAndPassword,col } from "@/firebase";
import FormContent from '@/components/FormContent';
import router from 'next/router'
import { doc, getDocs, setDoc } from 'firebase/firestore';


function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let isExits = false;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await logInWithEmailAndPassword(email, password);
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
                        id: auth.currentUser.uid,
                        username: auth.currentUser.email,
                        isInOffice: false,
                        placeLat: 35,
                        placeLng: 135,
                        outTimeHour: 12,
                        outTimeMinute: 20,
                        archiveLat: 35,
                        archiveLng: 135,
                        reQuestReload: false,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            isExits = false;
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
