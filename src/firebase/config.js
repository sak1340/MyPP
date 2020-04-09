import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyDjtJbRFGf_TqIjVl3jbbRUIqJicr1-bGs",
    authDomain: "room-service-2d2f7.firebaseapp.com",
    databaseURL: "https://room-service-2d2f7.firebaseio.com",
    projectId: "room-service-2d2f7",
    storageBucket: "room-service-2d2f7.appspot.com",
    messagingSenderId: "297544719220",
    appId: "1:297544719220:web:fd6969a5eeec3d3882ea21",
    measurementId: "G-LKYDMMHSGW"
}


class Firebase {
    constructor(){
        firebase.initializeApp(config)
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async signup(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });
        return logout;
    }
}

export default new Firebase();