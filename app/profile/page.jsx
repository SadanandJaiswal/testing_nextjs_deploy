"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'; // Adjust this based on your auth library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizListCard from '@components/QuizListCard';
import CustomModal from '@components/CustomModal';
import MyModal from '@components/MyModal';
import MyGaugeChart from '@components/MyGaugeChart';
import UserProfileDetails from '@components/UserProfileDetails';

const Profile = () => {
  const { data: session, status} = useSession(); // Retrieve session data
  const [tests, setTests] = useState([]);
  const [userDetail, setUserDetail] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentTest, setCurrentTest] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const fetchUserTests = async () => {
      if (status === 'loading') {
        // Session data is still being fetched
        return (<div>Hello Statu is loading</div>);
      }

      console.log("id is ", session?.user?.id);

      try {
        const response = await axios.get(`/api/users/${session?.user?.id}/tests/`);
        setTests(response.data.tests);
        setUserDetail(response.data.user);

        console.log('user is  here ', response.data.user)
        console.log('test are here ', response.data.tests)
        // toast.success("Tests fetched successfully!");
      } catch (error) {
        setError(error.message);
        toast.error(`Error fetching tests: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTests();
  }, [session, status]);

  useEffect(()=>{
    console.log("current test ", currentTest)
  },[currentTest])

  const handleTestClick = (index)=>{
    setCurrentTest(tests[index]);
    // openModal();
    setModalIsOpen(!modalIsOpen)
  } 

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <UserProfileDetails user={userDetail} totalQuizGiven={tests?.length}/>

      <div className='flex flex-col items-center justify-center w-full'>
        <h2 className="text-2xl font-semibold mb-4">Quiz Taken By You</h2>
          <hr className="w-full max-w-3xl mb-4 border-gray-400" />
        {tests.length > 0 ? (
          tests.map((test,index) => (
            <div key={test._id} onClick={()=>handleTestClick(index)} className="bg-white rounded-xl shadow-md overflow-hidden w-full my-4 transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <QuizListCard
                title={test.quizId.title}
                duration={test.quizId.duration}
                totalScore={test.score}
                isProfilePage
              />
            </div>
          ))
        ) : (
          <p>No tests found</p>
        )}
      </div>

      {/* <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} currentTestDetails={currentTest} /> */}

      <MyModal isOpen={modalIsOpen} onClose={closeModal} currentTestDetails={currentTest}/>

    </>
  );
  
};

export default Profile;
