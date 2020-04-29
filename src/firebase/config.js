import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const config = {
    apiKey: "AIzaSyDmrBhKZ_PI4khjyXpYAX9RKNbJ1FPQ0Gg",
  authDomain: "phiphi-review.firebaseapp.com",
  databaseURL: "https://phiphi-review.firebaseio.com",
  projectId: "phiphi-review",
  storageBucket: "phiphi-review.appspot.com",
  messagingSenderId: "89333066411",
  appId: "1:89333066411:web:c74a6ee2a5554ca42625ee",
  measurementId: "G-8D9G0DYTE6"
}


class Firebase {
    constructor() {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
    }
    
    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).then((e) => {
            localStorage.setItem("email",email)
            return e
        }).catch(err => {
            console.log(err)
            return err
        });
        return user
    }

    async signup(email, password) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err)
            return err
        })
        return user
    }

    async logout() {
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err)
            return err
        })
        return logout
    }

    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    async getPosts() {
        let postsArray = [];
        const posts = await firebase.firestore().collection("Posts").get();
        posts.forEach(doc => {
            postsArray.push({ id: doc.id, data: doc.data() })
        })
        return postsArray
    }

    async getPost(postid) {
        const post = await firebase.firestore().collection("Posts").doc(postid).get()
        const postData = post.data()
        return postData
    }

    async createPost(post) {
        const storageRef = firebase.storage().ref()
        const storageChild = storageRef.child(post.cover.name)
        const postCover = await storageChild.put(post.cover)
        const downLoadURL = await storageChild.getDownloadURL()
        const fileRef = postCover.ref.location.path

        let newPost = {
            title: post.title,
            content: post.content,
            cover: downLoadURL,
            fileref: fileRef,
            email : localStorage.getItem("email")
        }
        const firestorePost = await firebase.firestore().collection("Posts").add(newPost).catch(err => {
            console.log(err)
            return err
        })
        return firestorePost
    }
    async updatePost(postid, postData) {
        if (postData["cover"]) {
            const storageRef = firebase.storage().ref()
            const storageChild = storageRef.child(postData.cover.name)
            const postCover = await storageChild.put(postData.cover)
            const downLoadURL = await storageChild.getDownloadURL()
            const fileRef = postCover.ref.location.path

            await storageRef.child(postData["oldcover"]).delete().catch(err => {
                console.log(err);
            })
            let updatedPost = {
                title: postData.title,
                content: postData.content,
                cover: downLoadURL,
                fileref: fileRef
            }
            const post = await firebase.firestore().collection("Posts").doc(postid).set(updatedPost, { merge: true }).catch(err => {
                console.log(err);
            })
            return post
        } else {
            const post = await firebase.firestore().collection("Posts").doc(postid).set(postData, { merge: true }).catch(err => {
                console.log(err);
            })
            return post
        }
    }
    async deletePost(postid, fileref) {
        const storageRef = firebase.storage().ref()
        await storageRef.child(fileref).delete().catch(err => {
            console.log(err);
        })
        const post = await firebase.firestore().collection("Posts").doc(postid).delete().catch(err => {
            console.log(err);
        })
        return post
    }
}
export default new Firebase()