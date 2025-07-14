import { initializeApp } from "firebase/app"; // no compat for new SDK
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

// const project = "pleasedateme";

const config = {
  // databaseURL: `https://${project}-default-rtdb.firebaseio.com/`,
  // authDomain: `${project}.firebaseapp.com`,
  apiKey: "AIzaSyDyO07APwWqurb_qQZRbeZe0x9_AgHKdrY",
  authDomain: "pleasedateme.firebaseapp.com",
  databaseURL: "https://pleasedateme-default-rtdb.firebaseio.com",
  projectId: "pleasedateme",
  storageBucket: "pleasedateme.firebasestorage.app",
  messagingSenderId: "258069161432",
  appId: "1:258069161432:web:337b08ae7cd32012757ead",
  measurementId: "G-GY1V15VQL5",
};

var database: Database;
var auth: Auth;
var provider: GoogleAuthProvider;
type ResultType = { val: () => BlobType | null };
type BlobType = any;

declare global {
  interface Window {
    firebaseinitialized: boolean;
  }
}
window.firebaseinitialized = false;
if (!window.firebaseinitialized) {
  window.firebaseinitialized = true;
  var app = initializeApp(config);
  database = getDatabase(app);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

function _connect(path: string, callback: (value: BlobType) => void): void {
  onValue(ref(database, `${path}`), (snapshot: ResultType) => {
    var val = snapshot.val();
    console.log("firebase", Date.now() / 1000, window.location.href, val);
    callback(val);
  });
}

function _get(path: string): BlobType {
  return get(ref(database, `${path}`));
}

function _set(path: string, obj: BlobType): Promise<void> {
  return set(ref(database, `${path}`), obj);
}

function _push(path: string, obj: BlobType): Promise<string> {
  return push(ref(database, `${path}`), obj).then((pushed) => pushed.key!);
}

function _delete(path: string): Promise<void> {
  return remove(ref(database, `${path}`));
}

const ex = {
  _connect,
  _get,
  _set,
  _push,
  _delete,
  signInWithPopup,
  auth: auth!,
  provider: provider!,
};

export default ex;
