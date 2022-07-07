import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
import router from "@/router";
import { getDocs, addDoc, collection } from "firebase/firestore";

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
const db = firebaseApp.firestore()

export const getWorkouts = async () => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    let workouts = [];

    await getDocs(collection(db1, 'Workouts')).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            workouts.push({...doc.data()})
        })
    })
    return workouts;
}

export const addWorkout = async (id,exercise, reps, weight, date) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    console.log("her")

    await addDoc(collection(db1, 'Workouts'), {
        id: id,
        Reps: reps,
        Weight: weight,
        Exercise: exercise,
        Date: date,
    })
}

export const deleteWorkout = async (exercise, reps, weight) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);

    await addDoc(collection(db1, 'Workouts'), {
        Reps: reps,
        Weight: weight,
        Exercise: exercise
    })
}












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

export const newWorkout = async (exercise) => {
    try {
        await db.collection('users').doc(firebaseApp.auth().currentUser.uid).collection("exercises").doc(exercise).collection('workout').add({
            weight: 60,
            reps: 12
        })
    } catch (err) {
        console.log(err)
    }
}

export const newWorkout2 = async (exercise) => {
    try {
        await db.collection('users').doc(firebaseApp.auth().currentUser.uid).collection("Exercises").add({
            exercise: exercise,
        })
    } catch (err) {
        console.log(err)
    }
}

export const checkExercise = async (exercise) => {
    await db.collection('users').doc(firebaseApp.auth().currentUser.uid).collection("Exercises").doc(exercise).get()
        .then(snapshot => {
            if (snapshot.exists) {
                console.log(snapshot)
            }
            else {
                console.log("finnes ikke")
                console.log(snapshot)
            }
        })
}

export const getExercises = async () => {
    await db.collection('users').doc(firebaseApp.auth().currentUser.uid).collection("Exercises").get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            console.log(doc.data())
        })
    });
}
