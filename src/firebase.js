import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyB9O8r3vRt5jG9EM-Q2Pr0J55N7wPnwSyM",
    authDomain: "react-todo-64a1c.firebaseapp.com",
    projectId: "react-todo-64a1c",
    storageBucket: "react-todo-64a1c.appspot.com",
    messagingSenderId: "88420865539",
    appId: "1:88420865539:web:b7e914e793205a4ac56036"
};

const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();