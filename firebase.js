import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
const firebaseConfig = {
apiKey: "AIzaSyCdRCV9BF_UsLxqRzCE2V0PHmP_ox2yGqI",
authDomain: "freelancehub-v2.firebaseapp.com",
projectId: "freelancehub-v2",
storageBucket: "freelancehub-v2.firebasestorage.app",
messagingSenderId: "600241815817",
appId: "1:600241815817:web:a0e5710e59c44914b413d8"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
};