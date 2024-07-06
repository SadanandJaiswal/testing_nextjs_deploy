"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import QuizList from "@components/QuizList";
// import QuizList from "../../components/QuizList";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Quizzes = () => {
  const { data: session } = useSession();

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myQuizData, setMyQuizData] = useState([]);
  const [selectedMyQuiz, setSelectedMyQuiz] = useState(false);
  

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/quizzes");
        console.log('response ', response.data)
        setQuizData(response.data);
      } catch (error) {
        alert("error is occur")
        console.error("Error fetching quiz data:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []); 

  const handleMyQuiz = () => {
    setSelectedMyQuiz(true);
    console.log(session.user.id);
    console.log(quizData);
    const updatedArray = quizData.filter((quiz) => quiz.hostId === session?.user.id);
    setMyQuizData(updatedArray);
  }

  useEffect(()=>{
    console.log('my quiz data ', myQuizData)
  },[myQuizData])

  return (
    loading? 
    (<div className="w-full text-2xl text-black">Loading Data Please Wait...</div>)
    :

   ( <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-3xl flex justify-center gap-4 mb-8">
          <button
            className={`py-2 px-4 rounded-md ${!selectedMyQuiz ? 'bg-gray-300 text-gray-800' : 'bg-gray-600 text-white'} hover:bg-gray-400`}
            onClick={() => setSelectedMyQuiz(false)}
          >
            All Quizzes
          </button>
          <button
            className={`py-2 px-4 rounded-md ${selectedMyQuiz ? 'bg-gray-300 text-gray-800' : 'bg-gray-600 text-white'} hover:bg-gray-400`}
            onClick={handleMyQuiz}
          >
            My Quizzes
          </button>
        </div>
      
        {!selectedMyQuiz ? (
          <QuizList quizData={quizData} heading="Quizzes" />
        ) : (
          <>
            <div className="w-full ">
              <Link href="/quizzes/create">
                <div className="text-blue-400 hover:underline">+ Create a new Quiz</div>
              </Link>
            </div>
            
            <QuizList quizData={myQuizData} heading="My Quizzes"/>
          </>
        )}
    </div>
    )

  );
};

export default Quizzes;
