import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import router from "@/router";

const configure = {
    apiKey: "AIzaSyBVWZp5xcS9qKqctiY-X8dbVTEimFPq4BQ",
    authDomain: "workoutapp-87f74.firebaseapp.com",
    projectId: "workoutapp-87f74",
    storageBucket: "workoutapp-87f74.appspot.com",
    messagingSenderId: "185162711978",
    appId: "1:185162711978:web:4aabc84e04327e64ede1d3",
    measurementId: "G-QLMK0ZRZC1"
}

const test = firebase.initializeApp(configure);

export const signUp = (email, password) => {
    try {
        test.auth().createUserWithEmailAndPassword(email, password).then(r => {
            console.log(r);
            router.push("/");
        });
    } catch (err) {
        console.log(err)
    }
}
