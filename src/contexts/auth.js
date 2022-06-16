import { useState, createContext, useEffect, useContext } from 'react';
import { auth } from '../services/firebaseConnection';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged, 
    signOut
} from 'firebase/auth';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    async function signUp(email, password, nome) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function signIn(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logOut() {
        return await signOut(auth);
    }

    useEffect(() => {        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        setUser,
        signUp,
        signIn,
        logOut
    };

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;