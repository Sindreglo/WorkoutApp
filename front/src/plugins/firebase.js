import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
import router from "@/router";
import { getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, orderBy, onSnapshot, doc } from "firebase/firestore";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup,getAuth } from "firebase/auth";
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

const firebaseApp = firebase.initializeApp(configure);
const db = firebaseApp.firestore()

export const getWorkouts = async () => {
    await getUser();
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
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

export const getWorkoutsBy = async (exercise, order) => {
    await getUser();
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    const colRef = collection(db1, 'Workouts');
    let q = null;
    if (exercise === 'All Exercises') {
        q = await query(colRef,orderBy(order, "desc"));
    } else {
        q = await query(colRef,where("Exercise", "==", exercise), orderBy(order, "desc"));
    }
    let workouts = [];

    await onSnapshot(q, snapshot => {
        snapshot.docs.forEach(doc => {
            workouts.push({...doc.data(), id: doc.id, doc: doc});
        })
    })

    return workouts;
}

export const addWorkout = async (exercise, reps, weight, date) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    await addDoc(collection(db1, 'Workouts'), {
        Reps: Number(reps),
        Weight: Number(weight),
        Exercise: exercise,
        Date: date,
    })
}

export const editWorkout= async (workout) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());

    const exRef = doc(db1, 'Workouts', workout.id)

    await updateDoc(exRef, {
        Exercise: workout.exercise,
        Weight: Number(workout.weight),
        Reps: Number(workout.reps),
        Date: workout.date,
    })
}

export const deleteWorkout = async (id) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());

    try {
        await deleteDoc(doc(db1, "Workouts", id));
    } catch (err) {
        console.log(err);
    }
}

export const getExercises = async () => {
    await getUser();
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    let exercises = [];

    await getDocs(collection(db1, 'Exercises')).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            exercises.push({...doc.data(), id: doc.id})
        })
    })

    return exercises;
}

export const getAddExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());

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
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    try {
        await deleteDoc(doc(db1, "Exercises", id));
    } catch (err) {
        console.log(err);
    }
}

export const editExercise = async (exercise) => {
    const db1 = firebaseApp.firestore().collection('users').doc(storageService.getToken());
    const exRef = doc(db1, 'Exercises', exercise.editId);

    await updateDoc(exRef, {
        color: exercise.editColor,
    })
}

export const getWorkoutsFromExercise = async (exercise) => {
    await getUser();
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

export const status = async () => {
    let status;

    await firebaseApp.auth().onAuthStateChanged(user => {
        status = !!user;
    })
    return status;
}

export const signUp = (username, email, password) => {
    try {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(r => {
            db.collection('users').doc(firebaseApp.auth().currentUser.uid).set({
                displayName: username,
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

export const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    try {
        await signInWithPopup(firebaseApp.auth(), provider).then(r => {
            db.collection('users').doc(firebaseApp.auth().currentUser.uid).set({
                email: r.user.email,
                displayName: r.user.displayName,
            }).then(e => {
                console.log(e);
                storageService.setToken(r.user.uid);
                router.push({name: 'dashboard', params: {login: 'loggingIn'}});
            })
            console.log(r);
        });
    } catch (err) {
        console.log(err)
    }
}

export const signInFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log(accessToken);

            // ...
        })
        .catch((error) => {
            console.log(error.message);
        });
}

export const signIn = (email, password) => {
    try {
        firebaseApp.auth().signInWithEmailAndPassword(email, password).then(r => {
            storageService.setToken(r.user.uid);
            console.log(r.user.uid);
            console.log(r.user.displayName);
            console.log(r);
            router.push({name: 'dashboard'});
        });
    } catch (err) {
        console.log(err);
    }
}

export const signOut = () => {
    try {
        firebaseApp.auth().signOut().then(r => {
            storageService.clearToken();
            store.state.loggedInDisplayName = null;
            store.state.loggedInImageURL = null;
            store.state.loggedIn = false;
            console.log(r);
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
