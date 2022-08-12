import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
import router from "@/router";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import storageService from "@/services/storageService";
import store from "@/store";

const configure = {
    apiKey: "AIzaSyBVWZp5xcS9qKqctiY-X8dbVTEimFPq4BQ",
    authDomain: "workoutapp-87f74.firebaseapp.com",
    projectId: "workoutapp-87f74",
    storageBucket: "workoutapp-87f74.appspot.com",
    messagingSenderId: "185162711978",
    appId: "1:185162711978:web:4aabc84e04327e64ede1d3",
    measurementId: "G-QLMK0ZRZC1"
}

export const firebaseApp = firebase.initializeApp(configure);
export const db = firebaseApp.firestore()

export const getWorkoutsFromExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    const colRef = collection(db1, 'Workouts');

    const q = await query(colRef, where("Exercise", "==", exercise), orderBy("Date", "asc"));

    let workouts = [];

    await getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            workouts.push({...doc.data()})
        })
    })
    return workouts;
}

export const signOut = () => {
    try {
        firebaseApp.auth().signOut().then(() => {
            storageService.clearToken();
            store.state.loggedInDisplayName = null;
            store.state.loggedInImageURL = null;
            store.state.loggedIn = false;
            router.push("/signin")
        });
    } catch (err) {
        console.log(err + "(error)")
    }
}

export const getUser = () => {
    try {
        let currentUser = firebaseApp.auth().currentUser;
        if (currentUser.displayName === null) {
            store.state.loggedInDisplayName = currentUser.email;
        } else {
            store.state.loggedInDisplayName = currentUser.displayName;
        }
        store.state.loggedIn = true;
        store.state.loggedInImageURL = currentUser.photoURL;
        return currentUser;
    } catch (err) {
        console.log(err);
        return "login"
    }
}
