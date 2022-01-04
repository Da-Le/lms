import { 
  db, 
  // bucketRef, 
  auth 
} from './firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion, setDoc, orderBy, query, where} from "firebase/firestore"; 



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
    setDoc(doc(db, 'users', user.uid), 
      {
        displayName: data.displayName, 
        email: data.email, 
        isTeacher: data.isTeacher,
        phone: data.phone,
        ownerId: user.uid
      }
    );
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
  const data = collection(db, collectionName)
  const querySnapshot = await getDocs(data);
    return querySnapshot.docs.map((doc) => doc.data())

}

/**
 * 
 * @param {string} collectionName 
 * @param {object} data
 */
export const updateDocsByCollection = async (collectionName, data) => {
  const getData = collection(db, collectionName)
  const querySnapshot = await getDocs(getData);
  let docId = ''
  querySnapshot.docs.filter(item => item.ownerId === data.ownerId).map((doc) => docId = doc.id)

  const docInstance = doc(db, collectionName, docId)
  await updateDoc(docInstance, data);
  return docInstance

}

/**
 * 
 * @param {string} collectionName 
 * @param {string} sort
 */
export const getAnnouncement = async (collectionName, sort) => {
  const data = collection(db, collectionName)
  const q = query(data,orderBy(sort, 'desc'))
  const querySnapshot = await getDocs(q);
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
  const data = collection(db, 'users')
  const q = query(data,where("ownerId", "==", user.uid))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data())
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
