import { getAuth } from 'firebase/auth';
import React from 'react'
import profile from '../../assets/profile.png'

const Home = () => {
    const auth = getAuth();
    const data = JSON.parse(localStorage.getItem("userInfo"))
    console.log(data.photoURL)
  return (
    <>
    
    <section className='bg-gray-950 h-screen'>
        <div className='w-full h-[400px] bg-cover-photo bg-no-repeat bg-cover bg-center rounded-ee-[20px] rounded-es-[20px] relative '>
           <div className='w-[350px] h-[350px] bg-profile bg-no-repeat bg-cover bg-center rounded-full border-gray-800 border-[16px] absolute bottom-[-180px] left-[200px]'>
            <img className='h-[320px] w-[350px] rounded-full' src={data.photoURL} alt="" />
           </div>
        </div>
           <div className='flex'>

           <div className='w-[30%]' ></div>
           <div className='w-[70%]'>
            <h2 className='text-white font-bold text-3xl pt-4'>
                {data.displayName}
            </h2>
            <h3 className='text-gray-500 pt-3 text-xl font-bold'>
                {data.email}
            </h3>
            
           </div>
           </div>
    </section>
    
    </>
  )
}

export default Home