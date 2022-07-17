import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // login-register-logout vs işlemler yapildiginda firebase otomatik olarak auth state’ini değiştiriyor ve bu metotla bize de kontrol imkani sağlıyor.
  // useEffect kullanarak component’ımız mount oldugu anda bu metotla currentUser state’imizi eşitleyerek mevcut user’a erişim imkanımız oluyor.
  // bu bize bir listener döndürecek. bunu kullanabilmek için de asagida onAuthStateChangedListener adinda bir yardımcı işlev oluşturduk.
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyh84FOnUXVn0I5wU_M-yoQpw9jK0cgCU",
  authDomain: "esadsiz-clothing-db.firebaseapp.com",
  projectId: "esadsiz-clothing-db",
  storageBucket: "esadsiz-clothing-db.appspot.com",
  messagingSenderId: "383966352091",
  appId: "1:383966352091:web:6e42d451e84ff0dff2b2fe",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
// tanimladigimiz bu Listener auth üzerindeki durum degisikligini bize geri döndürür.
// bunun icin onAuthStateChanged iki parametre alir. birinci parametre auth; kullanıcının oturum açıp açmadığını veya oturumu kapatıp kapatmadığını takip eder.
// ikinci parametre ise bu auth durumu her değiştiğinde cagirmak isteyeceğimiz bir callback olacaktır.
// yani diyoruz ki "bu işlevi ne zaman başlatırsan, bana bir "callback" vermelisin çünkü bu "callback", state üzerindeki durum degisikligine vereceğim yanittir.
// Simdi bu onAuthStateChangeListener'i aldik ve user.context.jsx'e girdik. Bunu user.context.jsx'te yapmamizin nedeni, kullanıcı value'sunu almak ve
// izlemekle ilgili olan kodlarin onu depoladığımız yerde tutulması gerektiğidir.
