import { 
  db, 
  // bucketRef, 
  auth 
} from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs} from "firebase/firestore"; 



/**
 * 
 * @param {string} email 
 * @param {string} password
 */
export const createUser = async (email, password) => {
  const isUserCreated = await createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
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
export const createDoc = async (collectionName, data) => {

  const docInstance = await addDoc(collection(db,collectionName),data)
  return docInstance
}

/**
 * 
 * @param {string} collectionName 
 */
export const getDocsByCollection = async (collectionName) => {
  // const collection = await db.collection(collectionName).get().then(querySnapshot => {
  //   return querySnapshot.docs.map((doc) => doc.data())
  // }).catch((err) => err);
  const collection = await getDocs(collection(db, collectionName));
  collection.forEach((doc) => {
    console.log(doc)
    // console.log(`${doc.id} => ${doc.data()}`);
    // return `${doc.id} => ${doc.data()}`
  });

  return collection
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
