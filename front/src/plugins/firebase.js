import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
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

const firebaseApp = firebase.initializeApp(configure);
const db = firebaseApp.firestore();

export const status = async () => {
    let status;

    await firebaseApp.auth().onAuthStateChanged(user => {
        status = !!user;
    })
    return status;
}

export const signUp = (email, password) => {
    try {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(r => {
            db.collection('users').doc(firebase.auth().currentUser.uid).set({
                email: email,
            }).then(e => {
                console.log(e);
                router.push("/");
            })
            console.log(r);
        }).catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
        })
    } catch (err) {
        console.log(err)
    }
}

export const signIn = (email, password) => {
    try {
        firebaseApp.auth().signInWithEmailAndPassword(email, password).then(r => {
            console.log(r);
            router.push("/");
        });
    } catch (err) {
        console.log(err);
    }
}

export const signOut = () => {
    try {
        firebaseApp.auth().signOut().then(r => {
            console.log(r);
            router.push("/signin")
        });
    } catch (err) {
        console.log(err + "(error)")
    }
}

export const getUser = () => {
    try {
        return firebaseApp.auth().currentUser.email;
    } catch (err) {
        console.log(err);
        return "login"
    }
}

export const getData = async () => {
    try {
        await db.collection('users').doc(firebaseApp.auth().currentUser.uid).get().then(r => {
            console.log(r.data());
            return r.data();
        })
    } catch (err) {
        console.log(err);
    }
    return null;
}
