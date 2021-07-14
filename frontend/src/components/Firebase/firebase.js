import app from 'firebase/app';
import 'firebase/auth';
//TODO: make these values environment variabels
const config = {
    apiKey: "AIzaSyCl5vY6t4dhJ4iB-eR8i0IYhGdOMOl5B8o",
  authDomain: "spotifyparty-a6660.firebaseapp.com",
  databaseURL: "https://spotifyparty-a6660-default-rtdb.firebaseio.com",
  projectId: "spotifyparty-a6660",
  storageBucket: "spotifyparty-a6660.appspot.com",
  messagingSenderId: "296549781677",
  appId: "1:296549781677:web:653279d563932817c97624",
  measurementId: "G-XKQL01K2NR"
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignUpWithEmailAndPassword = async (email, password, phoneNumber, userName) => {
    return fetch('http://127.0.0.1:5000/User', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "phone_number": phoneNumber,
        "display_name": userName
      })
    }
    )


  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

}

export default Firebase