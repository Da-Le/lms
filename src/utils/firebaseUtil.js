import { 
  db, 
  // bucketRef, 
  auth 
} from './firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion, setDoc} from "firebase/firestore"; 



/**
 * 
 * @param {string} email 
 * @param {string} password
 * @param {object} data
 */
export const createUser = async (email, password, data) => {
  const isUserCreated = await createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setDoc(doc(db, 'users', user.uid), data);
    return user
    // ...
  })
  .catch((err) => {
    return err
  });
  return isUserCreated
}

/**
 * 
 * @param {string} collectionName 
 * @param {object} data
 */
// Create a document
export const createDoc = async (collectionName, data) => {

  const docInstance = await addDoc(collection(db,collectionName),data)
  return docInstance
}

/**
 * 
 * @param {string} collectionName
 * @param {string} id 
 * @param {object} data
 */
// Create a document
export const createClassDoc = async (collectionName, id, data) => {

  // const docInstance =  doc(collection(db,collectionName, id),data)
  const docInstance = await setDoc(doc(db, collectionName, id), data);

  return docInstance
}

/**
 * create doc
 * @param {string} collectionName 
 * @param {string} id
 * @param {object} data
 */
export const joinClass = async (collectionName, id, data) => {
  const addData = doc(db, collectionName, id);

// Update field
  // await updateDoc(addData,data);
  await updateDoc(addData, {
    students: arrayUnion(data)
  });

  return addData
}

/**
 * 
 * @param {string} collectionName 
 */
export const getDocsByCollection = async (collectionName) => {
  
  const querySnapshot = await getDocs(collection(db, collectionName));
  
    return querySnapshot.docs.map((doc) => doc.data())

}

/**
 * @param {*} folderName 
 * @param {*} fileName 
 * @param {*} file 
 */
// export const createFile = async (folderName, fileName, file) => {
//   const isCreated = bucketRef.child(`${folderName}/${fileName}`).putString(file, 'data_url').then((snapshot) => {
//     return bucketRef.child(snapshot.ref.location.path_).getDownloadURL()
//   }).catch(err => {
//     return err
//   });

//   return isCreated
// }

/**
 * 
 */
export const getUser = async () => {
const user = await auth.currentUser;

if (user) {
  console.log(user)
  return user
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
} else {
  // No user is signed in.
}
  // const userDetails = await onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     console.log(user)
  //     return user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });
  return user
       
}
