const getFriendlyErrorMessage = (errorCode) => {
    console.log(errorCode);
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/wrong-password':
            return 'The password you entered is incorrect.';
        case 'auth/email-already-in-use':
            return 'This email is already in use by another account.';
        case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password.';
        case 'auth/invalid-email':
            return 'The email address is invalid. Please check and try again.';
        default:
            return 'An error occurred. Please try again later.';
    }
};

export default getFriendlyErrorMessage;