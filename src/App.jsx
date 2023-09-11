import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./utils";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import HolidayEvent from "./HolidayEvent";
import SignIn from "./SignIn";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set } from "firebase/database";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCyZKBLUwE-5lJBj8aLhVqZnniAXlJwaJE",

    authDomain: "chronoview-7a39a.firebaseapp.com",

    databaseURL: "https://chronoview-7a39a-default-rtdb.firebaseio.com",

    projectId: "chronoview-7a39a",

    storageBucket: "chronoview-7a39a.appspot.com",

    messagingSenderId: "655782600676",

    appId: "1:655782600676:web:1474d9a01940d0563b31f1",

    measurementId: "G-Y2DQX1P6CW",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(true);
  console.log(showSignIn);
  const auth = getAuth();

  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const tasks = JSON.parse(localStorage.getItem("savedEvents"));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //       setShowSignIn(false);
  //     } else {
  //       setUser(null);
  //       setShowSignIn(true);
  //     }
  //   });
  // }, [auth]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      setShowSignIn(false);
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <React.Fragment>
      {showSignIn && <SignIn handleSignIn={handleSignIn} />}
      <HolidayEvent />
      {showEventModal && <EventModal />}

      {!showSignIn && (
        <div className="App">
          <CalendarHeader db={db} user={user} />
          <div className="container">
            <Sidebar />
            <Month month={currenMonth} user={user} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
