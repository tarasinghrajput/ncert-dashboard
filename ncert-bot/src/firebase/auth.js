import { auth } from "./firebase";

import { createUserWithEmailAndPassword, updateCurrentUser, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result =await signInWithPopup(auth, provider);
    //result.user 
    return result 
};

export const doSignOut = () => {
    return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doSendEmailVerification = () => {
//     return currentUser.sendEmailVerification({
//         url: `${window.location.origin}/home`
//     });
// };


// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };
