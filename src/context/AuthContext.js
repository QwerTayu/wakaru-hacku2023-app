import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import router from 'next/router';

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (!user) {
                console.log("please login");
                router.push('/');
            }
        });
        return () => {
            unsubscribed();
        };
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {user ? children : null}
        </AuthContext.Provider>
    );
}