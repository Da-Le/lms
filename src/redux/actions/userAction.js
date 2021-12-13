import * as actionTypes from '../types';

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from '@firebase/firestore';

import { db } from '../../utils/firebase';

const registerSuccess = (user) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: user
});

const handleNew = async(user) => {
    const docRef = doc(db, "users", user.uid);
    const payload = { displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL};
    await setDoc(docRef, payload);
}

export const registerInitiate = (email, password, displayName, history) => (dispatch) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                }).then(() => {
                    handleNew(user);
                    dispatch(registerSuccess(user));
                    history.push('/dashboarduser');
                }).catch((error) => {
                    alert(error);
                });

            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    } catch (err) {
        console.error(err)
    }
}

const loginSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user
});

export const loginInitiate = (email, password, history) => (dispatch) => {
    try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch(loginSuccess(user));
          history.push('/dashboarduser');
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      
    } catch (err) {
        console.error(err)
    }
}

export const setUser = (user) => async (dispatch) => {
    try {
        await dispatch({ type: actionTypes.SET_USER, payload: user });
    } catch (err) {
        console.error(err)
    }
}

const logoutSuccess = (user) => ({
    type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutInitiate = (user) => async (dispatch) => {
    try {
        const auth = getAuth();
        auth.signOut().then(() => {
            dispatch(logoutSuccess(user));
        }).catch((error) => {
            // An error happened.
        });
    } catch (err) {
        console.error(err)
    }
}



