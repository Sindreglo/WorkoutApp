import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
import router from "@/router";
import { getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, orderBy, onSnapshot, doc } from "firebase/firestore";

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
    const colRef = collection(db1, 'Workouts');
    const q = await query(colRef, orderBy("Date", "desc"));
    let workouts = [];

    await onSnapshot(q, snapshot => {
        snapshot.docs.forEach(doc => {
            workouts.push({...doc.data(), id: doc.id});
        })
    })
    return workouts;
}

export const addWorkout = async (exercise, reps, weight, date) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    await addDoc(collection(db1, 'Workouts'), {
        Reps: reps,
        Weight: weight,
        Exercise: exercise,
        Date: date,
    })
}

export const editWorkout= async (workout) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);

    const exRef = doc(db1, 'Workouts', workout.id)

    await updateDoc(exRef, {
        Exercise: workout.exercise,
        Weight: workout.weight,
        Reps: workout.reps,
        Date: workout.date,
    })
}

export const deleteWorkout = async (id) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);

    try {
        await deleteDoc(doc(db1, "Workouts", id));
    } catch (err) {
        console.log(err);
    }
}

export const getExercises = async () => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    let exercises = [];

    await getDocs(collection(db1, 'Exercises')).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            exercises.push({...doc.data(), id: doc.id})
        })
    })

    return exercises;
}

export const getAddExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);

    const colRef = collection(db1, 'Exercises');

    const q = await query(colRef, where("exercise", "==", exercise))
    let exercises = [];

    await onSnapshot(q, snapshot => {
        snapshot.docs.forEach(doc => {
            exercises.push({...doc.data()});
        })
        if (exercises.length === 0) {
            addDoc(collection(db1, 'Exercises'), {
                exercise: exercise,
                color: '#00000000',
            })
        }
    })
}

export const deleteExercise = async (id) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    try {
        await deleteDoc(doc(db1, "Exercises", id));
    } catch (err) {
        console.log(err);
    }
}

export const editExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
    const exRef = doc(db1, 'Exercises', exercise.editId);

    await updateDoc(exRef, {
        color: exercise.editColor,
    })
}

export const getWorkoutsFromExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid);
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
