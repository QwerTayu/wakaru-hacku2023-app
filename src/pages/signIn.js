import { useState } from 'react';
import { auth, db, logInWithEmailAndPassword, logOut } from "@/firebase";
import FormContent from '@/components/FormContent';
import router from 'next/router'
import { addDoc, collection, getDocs } from 'firebase/firestore';


function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let isExits = false;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await logInWithEmailAndPassword(email, password);
        if (user) { 
            
            const querySnapshot = await getDocs(collection(db, "user"));
            querySnapshot.forEach((doc) => {
              if( doc.data().userId === auth.currentUser.uid){
                  isExits = true;
                  console.log("Document data Found:", doc.data().username);
              }
            });
            if (!isExits) { // ユーザーが存在しない場合は作成
                try {
                    const docRef = await addDoc(collection(db, "user"), {
                        userId: auth.currentUser.uid,
                        username: auth.currentUser.email,
                        isInOffice: true,
                        placeLat: 35,
                        placeLng: 135,
                    });
                    console.log("Document written with ID: ", docRef.id);
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
