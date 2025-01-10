import React from 'react'
import google from '../../assets/google.png'

const Login = () => {
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
          <div className='flex justify-center mt-10 '>
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
}

export default Login