"use client";

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import axios from 'axios';

const QuizQuestions = ({ quizQuestionData, quizId, positiveScore, negativeScore }) => {
  const { data: session } = useSession();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [answers, setAnswers] = useState([]); 
  const [currentQuestionType, setCurrentQuestionType] = useState('single');
  const [selectedValues, setSelectedValues] = useState([]);
  const [numericalAnswer, setNumericalAnswer] = useState(0);
  const [visitedArray, setVisitedArray] = useState([]);
  const [testData, setTestData] = useState({
    quizId: "",
    studentId: "",
    answers: [],
    // submittedAt
  })

  useEffect(()=>{
    setTestData((prevTestData)=>({
      ...prevTestData, quizId, studentId:session?.user?.id
    }))
  },[])


  useEffect(()=>{
    console.log(numericalAnswer)
  },[numericalAnswer])

  useEffect(()=>{
    console.log('selectedValues ',selectedValues)
  },[selectedValues])
  
  useEffect(()=>{
    console.log('answers ',answers)
  },[answers])

  useEffect(() => {
    if (quizQuestionData && quizQuestionData.length > 0) {
      setCurrentQuestionIndex(0); // Set initial question index to 0 when quizQuestionData updates
      setVisitedArray(Array(quizQuestionData.length).fill(0));
    }

    const initialAnswers = quizQuestionData.map((question) => ({
      quizQuestionId: question._id,
      // selectedAnswer: ['']
    }));

    setAnswers(initialAnswers);

  }, [quizQuestionData]);

  useEffect(()=>{
    if(quizQuestionData && quizQuestionData.length > 0){
      setCurrentQuestionType(quizQuestionData[currentQuestionIndex].type);
    }
    setSelectedValues([])
  },[currentQuestionIndex])

  const addCurrentAnswerToAnswers = () =>{
    const updatedAnswers = [...answers];
    let ansSelected = [];
    if(currentQuestionType === 'numerical'){
      const stringNumericalAnswer = numericalAnswer.toString();
      ansSelected = [stringNumericalAnswer];
    }else{
      ansSelected = selectedValues;
    }

    updatedAnswers[currentQuestionIndex] = {
      ...updatedAnswers[currentQuestionIndex],
      selectedAnswer: ansSelected, 
    };
    setAnswers(updatedAnswers);
    console.log("success")
  }

  const goToNextQuestion = () => {

    
    addCurrentAnswerToAnswers();

    // calculateScore(indexToPass);

    if (currentQuestionIndex < quizQuestionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // setCurrentQuestionIndex(0);
      handleSubmit();
    }

    setSelectedValues([]);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (event)=>{
    const { type, value, checked } = event.target;

    if (type === 'checkbox') {
      if (checked) {
        setSelectedValues((prevValues) => [...prevValues, value]);
      } else {
        setSelectedValues((prevValues) => prevValues.filter((val) => val !== value));
      }
    } else if (type === 'radio') {
      console.log('option radio ', value);
      setSelectedValues([value]);
    }
  }

  const handleNumericalOption = (e)=>{
    setNumericalAnswer(e.target.value);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
      selectedAnswer: [numericalAnswer], // Replace with your selectedAnswer field or structure
    };
    setAnswers(updatedAnswers);
  }

  const handleSubmit = async ()=>{
    console.log('answer are here ', answers);

    try{
      const response = await axios.post(`/api/tests/`, {
        testData: {...testData, answers},
      });

      // Call the second API to calculate score using the test ID from the first response
      if (response) {
        try {
          const scoreResponse = await axios.get(`/api/tests/${response.data._id}/score`);
          console.log("Score calculated successfully", scoreResponse.data);
        } catch (scoreError) {
          console.error("Error calculating score:", scoreError.message);
        }
      } 
      
      alert("test created succesfuly")
      window.location.href = '/profile';
    }
    catch (error) {
      alert("error is occur");
      console.error("Error Initializing Quiz:", error);
    }
  }

  // Render component UI
  return (
    <div className="w-full flex">
      <div className="w-1/4 border-2 p-4">
        {/* Sidebar for displaying question numbers */}
        <div className="flex flex-col space-y-4">
          {quizQuestionData.map((question, index) => (
            <div
              key={question._id} // Replace with your unique key
              className={`p-2 cursor-pointer ${
                index === currentQuestionIndex ? 'bg-gray-200' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              Question {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 border p-4">
        {/* Main section for displaying current question */}
        {quizQuestionData.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-col mb-2 ">
              <div className="flex justify-between ">
                <div className="text-lg font-semibold">
                  Question {currentQuestionIndex + 1}
                </div>
                <div className="flex items-center space-x-4 mr-2">
                  {/* Score */}
                  <div className="text-green-500"> + {positiveScore}</div>
                  {/* Negative Score */}
                  <div className="text-red-500"> - {negativeScore}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 font-light">
                Type: {quizQuestionData[currentQuestionIndex].type}
              </div>
            </div>
            <div className="mb-4 ">{quizQuestionData[currentQuestionIndex].question_description}</div>
           
            <div className="space-y-4">
              {(currentQuestionType === 'single' ) && quizQuestionData[currentQuestionIndex].options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type={currentQuestionType === 'single' ? 'radio' : 'checkbox'}
                    name={`question${currentQuestionIndex}`}
                    // name={`question_${currentQuestionIndex}_options`}
                    value={optionIndex}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
              {( currentQuestionType === 'multiple') && quizQuestionData[currentQuestionIndex].options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type={currentQuestionType === 'single' ? 'radio' : 'checkbox'}
                    name={`question_${currentQuestionIndex}_options`}
                    value={optionIndex}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
              {currentQuestionType === 'boolean' &&
                <div className="">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}_options`}
                      value={"true"}
                      // checked={
                      //   currentQuestionType === 'single'
                      //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                      //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                      // }
                      onChange={handleOptionChange}
                    />
                    <label>True</label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}_options`}
                      value={"false"}
                      // checked={
                      //   currentQuestionType === 'single'
                      //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                      //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                      // }
                      onChange={handleOptionChange}
                    />
                    <label>False</label>
                  </div>
                </div>
              }
              {currentQuestionType === 'numerical' &&
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                  <input
                    type="number"
                    name={`question_${currentQuestionIndex}_options`}
                    value={numericalAnswer}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleNumericalOption}
                  />
                  {/* <label>True</label> */}
                </div>
              }
            </div>
            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                // disabled={currentQuestionIndex === quizQuestionData.length - 1}
              >
                {currentQuestionIndex<quizQuestionData.length-1 ?  'Save & Next' : 'Save & Submit'}
              </button>
            </div>
          </div>
        )}
        {/* <div className="w-full">
           <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
        </div> */}
      </div>
    </div>
  );
};

export default QuizQuestions;
