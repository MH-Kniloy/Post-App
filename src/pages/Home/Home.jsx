import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";

const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const [occupation, setOccupation] = useState("");
  const [hometown, setHometown] = useState("");
  const [currentcity, setCurrentcity] = useState("");
  const [bioOpenClose, setBioOpenClose] = useState(false);
  const [biodata, setBiodata] = useState([]);

  const handleSubmit = () => {
    update(ref(db, "users/" + data.uid), {
      occupation: occupation,
      home_town: hometown,
      current_city: currentcity,
    });
    setOccupation("");
    setHometown("");
    setCurrentcity("");
    setBioOpenClose(false);
  };

  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      let arr = [];

      snapshot.forEach((user) => {
        if (data.email === user.val().email) {
          arr.push(user.val());
        }
      });
      setBiodata(arr);
    });
  }, []);

  return (
    <>
      <section className="bg-gray-950 h-screen relative">
        <div className="w-full h-[400px] bg-cover-photo bg-no-repeat bg-cover bg-center rounded-ee-[20px] rounded-es-[20px] relative ">
          <div className="w-[350px] h-[350px] bg-profile bg-no-repeat bg-cover bg-center rounded-full border-gray-800 border-[16px] absolute bottom-[-180px] left-[200px]">
            <img
              className="h-[320px] w-[350px] rounded-full"
              src={data.photoURL}
              alt=""
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-[30%]"></div>
          <div className="w-[70%]">
            <h2 className="text-white font-bold text-3xl pt-4">
              {data.displayName}
            </h2>
            <h3 className="text-gray-500 pt-3 text-xl font-bold">
              {data.email}
            </h3>
            { biodata &&
            biodata.map((item) => (
               

                <div>

                    <p className="text-gray-500 font-bold">{item.occupation}</p>
                    
                    
                    <p className="text-gray-500 font-bold"> From {item.home_town}</p>
                    <p className="text-gray-500 font-bold">
                      Living in {item.current_city}
                    </p>
                
                </div>
               
                
              
            ))}
            <p
              onClick={() => setBioOpenClose(!bioOpenClose)}
              className="text-white flex gap-2 items-center text-[18px] mt-4 px-3 py-2 rounded-lg bg-gray-900 w-[140px] justify-center active:scale-[0.98] cursor-pointer"
            >
              <FaPencil />
              Add bio
            </p>
          </div>
        </div>
        {bioOpenClose && (
          <div className="w-[500px] h-[300px] bg-gray-800 absolute top-[40%] left-[50%] p-5">
            <input
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full py-2 ps-4 mt-5 rounded-md text-xl font-semibold border-none outline-none "
              placeholder="Occupation"
              type="text"
            />
            <input
              onChange={(e) => setHometown(e.target.value)}
              className="w-full py-2 ps-4 mt-5 rounded-md text-xl font-semibold border-none outline-none "
              placeholder="Home Town"
              type="text"
            />
            <input
              onChange={(e) => setCurrentcity(e.target.value)}
              className="w-full py-2 ps-4 mt-5 rounded-md text-xl font-semibold border-none outline-none "
              placeholder="Current City"
              type="text"
            />
            <div className="flex gap-3 justify-center mt-5">
              <p
                onClick={() => setBioOpenClose(false)}
                className="py-2 px-3 bg-gray-700 active:scale-[0.98] text-xl cursor-pointer rounded-lg text-white font-semibold"
              >
                Back
              </p>
              <p
                onClick={handleSubmit}
                className="py-2 px-3 bg-gray-700 active:scale-[0.98] text-xl cursor-pointer rounded-lg text-white font-semibold"
              >
                Submit
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
