import React from "react";
import google from "../../assets/google.png";
import {  signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
        if (auth.currentUser.emailVerified) {
          setTimeout(() => {
            navigate("/Home");
          }, 2000);
        }
      }).then(()=>{
        set(ref(db, "users/" + auth.currentUser.uid), {
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          profile_picture: auth.currentUser.photoURL,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      <section className="bg-gray-300 h-screen flex justify-center items-center">
        <div className="w-[600px] h-[500px] bg-gray-900 rounded-[10px] flex flex-col justify-center">
          <h1 className="uppercase font-bold text-center pt-8 text-3xl text-white">
            Welcome To Post App
          </h1>
          <p className=" font-semi bold text-center pt-8 text-xl text-white shadow-white">
            Please Login To Continue
          </p>
          <div onClick={handleLogin} className="flex justify-center mt-10 active:scale-[0.98]">
            <img
              className="bg-black hover:bg-gray-800 cursor-pointer w-[150px] rounded-[10px] py-4 px-8"
              src={google}
              alt="google-logo"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
