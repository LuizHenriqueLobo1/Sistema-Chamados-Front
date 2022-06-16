import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC0h4voEF2T4JwG8TNAu7iVyFrBj1oGKX0",
    authDomain: "sitema-chamados.firebaseapp.com",
    projectId: "sitema-chamados",
    storageBucket: "sitema-chamados.appspot.com",
    messagingSenderId: "597019820488",
    appId: "1:597019820488:web:7dee40e9ea0c658d5780fd",
    measurementId: "G-Y332EXF0MH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);