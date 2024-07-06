"use client";

import QuizListCard from "@components/QuizListCard";
// import QuizListCard from "../../../components/QuizListCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from 'next/navigation'
import QuizStater from "@components/QuizStater";
// import QuizStater from "../../../components/quizStater";
import QuizQuestions from "@components/QuizQuestions";
// import QuizQuestions from "../../../components/QuizQuestions";

const Quiz = () => {
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizQuestionData, setQuizQuestionData] = useState([]);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/quizzes/${quizId}`);
        console.log('quizData ', response.data)
        setQuizData(response.data);
      } catch (error) {
        alert("error is occur")
        console.error("Error fetching quiz data:", error);
      }
      finally{
        setLoading(false);
      }

      try{
        const response = await axios.get(`/api/quizzes/${quizId}/questions`);
        console.log('questions are here ', response.data)
        setQuizQuestionData(response.data);
      }
      catch (error) {
        alert("error is occur")
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []); 

  return (
    loading?
    (<div className="w-full text-2xl text-black">Loading Data Please Wait...</div>)
    :
    (
      <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {!testStarted &&
          <>
            <QuizStater quizData={quizData} />
            <button onClick={()=>setTestStarted(true)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6">
                Start the Quiz
            </button>
          </>
        }
        {testStarted && 
          <QuizQuestions quizQuestionData={quizQuestionData} quizId={quizId} positiveScore={quizData.positiveScore} negativeScore={quizData.negativeScore} />
        }
      </div>
    )
  );
};

export default Quiz;
