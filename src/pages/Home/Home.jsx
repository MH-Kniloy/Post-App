import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
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
  const [post, setPost]=useState("")
  const [postData, setPostData]=useState([])
  const handleSubmit = () => {
    set(ref(db, "biodata/" + data.uid), {
      occupation: occupation,
      home_town: hometown,
      current_city: currentcity,
      email:auth.currentUser.email
    });
    setOccupation("");
    setHometown("");
    setCurrentcity("");
    setBioOpenClose(false);
  };
  
  const handlePost=()=>{
    set(push(ref(db, "post/")),{
       postedByEmail:auth.currentUser.email,
       postedByName:auth.currentUser.displayName,
       postedByPhoto:auth.currentUser.photoURL,
       post:post,  
    }).then(()=>{
        setPost("")
    })

  }

  useEffect(() => {
    onValue(ref(db, "biodata/"), (snapshot) => {
      let arr = [];

      snapshot.forEach((biodata) => {
        if (data.email === biodata.val().email) {
          arr.push(biodata.val());
        }
      });
      setBiodata(arr);
    });
  }, []);

  useEffect(() => {
    onValue(ref(db, "post/"), (snapshot) => {
      let arr = [];

      snapshot.forEach((post) => {
        if (data.email === post.val().postedByEmail) {
          arr.push(post.val());
        }
      });
      setPostData(arr);
    });
  }, []);
 
  return (
    <>
      <section className="bg-gray-950 min-h-screen relative pb-20">
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
            {biodata &&
              biodata.map((item) => (
                <div>
                  <p className="text-gray-500 font-bold">{item.occupation}</p>

                  <p className="text-gray-500 font-bold">
                    {" "}
                    From {item.home_town}
                  </p>
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
            <div className="mt-12">
              <p className="text-white text-xl font-bold mb-6">Create Post</p>
              <div className="">
                <textarea
                  onChange={(e) => setPost(e.target.value)}
                  value={post}
                  className="resize-none outline-none border-none rounded-md text-xl text-gray-100 bg-gray-900 p-5 font-semibold"
                  placeholder="Whats on your mind"
                  cols="80"
                  rows="5"
                ></textarea>
                <p
                  onClick={handlePost}
                  className="text-white text-xl font-bold py-2 px-4 rounded-md bg-gray-900 w-[80px] text-center cursor-pointer active:scale-[0.98]"
                >
                  Post
                </p>
              </div>
            </div>
            {postData &&
              postData.map((item) => (
                <div className="mt-10 w-[940px] bg-gray-900 rounded-md p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      className="w-[30px] h-[30px] rounded-full"
                      src={item.postedByPhoto}
                      alt=""
                    />
                    <p className="text-white font-bold ">{item.postedByName}</p>
                  </div>
                  <div className="overflow-auto w-full max-h-[170px]">
                    <p className="text-white font-medium ">{item.post}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {bioOpenClose && (
          <div className="w-[500px] h-[300px] bg-gray-800 absolute top-[40%] left-[50%] p-5">
            <input
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              className="w-full py-2 ps-4 mt-5 rounded-md text-xl font-semibold border-none outline-none "
              placeholder="Occupation"
              type="text"
            />
            <input
              onChange={(e) => setHometown(e.target.value)}
              value={hometown}
              className="w-full py-2 ps-4 mt-5 rounded-md text-xl font-semibold border-none outline-none "
              placeholder="Home Town"
              type="text"
            />
            <input
              onChange={(e) => setCurrentcity(e.target.value)}
              value={currentcity}
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
