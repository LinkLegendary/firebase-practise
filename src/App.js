
import React from 'react';
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";

function App() {

const [user, setUser] = React.useState({})
const [loading, setloading] = React.useState(true);

function updatePost(){
  const hardcodedId = "I9uE4ipDBRLHuLiCP60g"
  const postRef =  doc(db, "posts", hardcodedId );
  const newPost = {
    description: "Finish Frontend Simplified",
    uid: "1",
    title: "Land a $7700k job"
  }
  updateDoc(postRef, newPost);
}


async function updatePost(){
  const hardcodedId = "I9uE4ipDBRLHuLiCP60g"
  const postRef =  doc(db, "posts", hardcodedId );
  const post = await getPostById(hardcodedId)
  console.log(post);
  const newPost = {
    ...post, 
    title: "Land a $5500k job",
  };
  console.log(newPost);
  updateDoc(postRef, newPost);
}



function deletePost(){
  const hardcodedId = "I9uE4ipDBRLHuLiCP60g"
  const postRef =  doc(db, "posts", hardcodedId );
  deleteDoc(postRef);
}







function createPost(){
   const post = {
    title: "Finish Interview Section",
    description: "Do Frontend Simplified",
    uid: user.uid,
   };
   addDoc(collection(db, "posts"), post)
}

 async function getAllPosts(){
  const {docs} = await getDocs(collection(db, "posts"));
  // const post = docs.map(elem => elem.data())
  const post = docs.map((elem) => ({...elem.data(), id:elem.id  }))
  console.log(post);

}

async function getPostById(id){
  // const hardcodedId = "I9uE4ipDBRLHuLiCP60g"
  // const postRef =  doc(db, "posts", hardcodedId );

  // const hardcodedId = "I9uE4ipDBRLHuLiCP60g"
  const postRef =  doc(db, "posts", id );
  const postSnap = await getDoc(postRef);
    const post = postSnap.data();
  console.log(post);
}

async function getPostByUid(){
   const postCollectionRef = await query(
     collection(db, "posts"), 
      where("uid", "==", "1" )
        );
const {docs} = await getDocs(postCollectionRef);
        console.log(docs.map(doc => doc.data()));
} 



React.useEffect(() => {
 onAuthStateChanged(auth,(user) => {
  // console.log(user)
  setloading(false)
  if (user) {
    setUser(user)
  }
 } )
},[]);


  function register() {
    console.log("refister");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    

    function login(){
      signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user)
        
      })
      .catch((error) => {
        console.log(error.message);
      });
    }

    function logout(){
        signOut(auth)
        console.log(auth)
        setUser({})
    }





  return (
    <div className="App">
      <button onClick={register}>Resister</button>
       <button onClick={login}>Login</button>
       <button onClick={logout}>Logout</button>
       {loading ? 'Loading...' : user.email}
       <button onClick={createPost}>Create Post</button>
       <button onClick={getAllPosts}>get All Posts</button>
       <button onClick={getPostById}>get Post By Id</button>
       <button onClick={getPostByUid}>get Post By Uid</button>
       <button onClick={updatePost}>Update Post</button>
       <button onClick={deletePost}>Delete Post</button>

       
    </div>
  );
}

export default App;
