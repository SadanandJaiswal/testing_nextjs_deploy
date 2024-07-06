"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const QuestionMaker = ({quizId}) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question_description: '',
        type: 'single',
        options: ['',''],
        correctAnswer: [],
        quizId: ''
    });

    useEffect(()=>{
        console.log("question is here ", questions);
    },[questions])

    const handleAddOption = () => {
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            options: [...prevQuestion.options, '']
        }));
    };

    const handleDeleteOption = (index) => {
        setCurrentQuestion(prevQuestion => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions.splice(index, 1);
    
            // Ensure correctAnswer or numericalAnswer is consistent with question type
            const updatedCorrectAnswer = prevQuestion.correctAnswer.filter(answer => answer !== index);
            return { ...prevQuestion, options: updatedOptions, correctAnswer: updatedCorrectAnswer };
        });
    };
    

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prevQuestion => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions[index] = value;
            return { ...prevQuestion, options: updatedOptions };
        });
    };

    const handleNumericalChange = (e)=>{
        const { value } = e.target;
        const numAns = value.toString();
        setCurrentQuestion(prevQuestion => ({...prevQuestion, correctAnswer: [numAns] }));
    };
    
    const handleCorrectAnswerChange = (event) => {
        const { type, value, checked } = event.target;
        console.log(type, value, checked)
        setCurrentQuestion(prevQuestion => {
            const stringIndex = value.toString();
            
            if (type === 'radio') {
                return { ...prevQuestion, correctAnswer: [stringIndex] };
            } else if (type === 'checkbox') {
                const updatedCorrectAnswers = checked
                    ? [...prevQuestion.correctAnswer, stringIndex]
                    : prevQuestion.correctAnswer.filter(answer => answer !== stringIndex);
                return { ...prevQuestion, correctAnswer: updatedCorrectAnswers };
            }
            
            return prevQuestion;
        });
    };

    const handleQuestionTypeChange = (e) => {
        const { value } = e.target;
        setCurrentQuestion(prevQuestion => {
            let updatedQuestion = { ...prevQuestion, type: value };
    
            if (value === 'multiple' || value === 'single') {
                updatedQuestion.options = ['', ''];
            }else{
                updatedQuestion.options = [];
            }
            return updatedQuestion;
        });
    };
    

    const handleAddQuestion = () => {
        // setCurrentQuestion(prev => {...prev, quizId: quizId})
        setQuestions(prevQuestions => [
            ...prevQuestions,
            {
                ...currentQuestion,
                quizId: quizId
            }
        ]);

        setCurrentQuestion({
            question_description: '',
            type: 'single',
            options: ['',''],
            correctAnswer: []
        });
    };

    const handleSubmit = async ()=>{
        console.log('questoin are here ', questions);
        try {
            const response = await axios.post(`/api/quizzes/${quizId}/questions`, {
                questionDataArray: questions,
            });

            if(response){
                alert("Quiz Created successfully!");
                setQuestions([]);
                setCurrentQuestion({
                    question_description: '',
                    type: 'single',
                    options: ['',''],
                    correctAnswer: [],
                    quizId : ''
                });
            }

            console.log("response ", response.data);

            window.location.href = '/quizzes';
          } catch (error) {
            alert("error is occur");
            console.error("Error Initializing Quiz:", error);
          }
    }

    useEffect(()=>{
        console.log(questions);
    },[questions])

    // Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae praesentium nobis quas iusto, totam vel non minima quae libero eius.

    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nesciunt.

    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat asperiores dolorem obcaecati, blanditiis ducimus repellendus!

    return (
        <div className="container mx-auto">
            {/* <h1 className="text-2xl font-semibold mb-4">Question Maker</h1> */}

            {questions.map((question, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{index + 1}. {question.question_description}</h3>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Question Type:</span> {question.type}</p>
                <ul className="list-disc pl-5">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex} className="flex items-center py-2">
                      <span className="mr-2 font-semibold">{String.fromCharCode(97 + optIndex)}.</span> {/* a, b, c, d, ... */}
                      <span className="text-gray-800">{option}</span>
                      {question.correctAnswer.includes(optIndex.toString()) && (
                        <span className="ml-2 text-green-500 font-bold">✓</span>
                      )}
                    </li>
                  ))}
                  {(question.type==='numerical' || question.type==='boolean') && 
                    <div className="flex">
                        <p className="font-semibold mr-2">Correct Answer: </p>
                        <p className="text-gray-600"> {question.correctAnswer[0]}</p>
                    </div>
                  }
                </ul>
              </div>
              
            ))}

            <div className="border border-gray-300 p-4 mb-4 rounded-lg">
                <label className="block mb-2 font-medium">Question Description:</label>
                <input
                    type="text"
                    value={currentQuestion.question_description}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question_description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />

                <label className="block mb-2 font-medium">Question Type:</label>
                <select
                    value={currentQuestion.type}
                    onChange={handleQuestionTypeChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="numerical">Numerical</option>
                    <option value="boolean">Boolean</option>
                </select>

                {(currentQuestion.type === 'single') && (
                    <div>
                        <label className="block mb-2 font-medium">Options:</label>
                        {currentQuestion.options.map((option, index) => (
                            <div key={`question${questions.length}_option${index}`} className="flex items-center mb-2">
                                <input
                                    type={'radio'}
                                    name={`question${questions.length}_option`}
                                    value={index}
                                    onChange={handleCorrectAnswerChange}
                                    className="mr-2"
                                />
                                <input
                                    type={'text'}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="mr-2"
                                />
                                 <button
                                    type="button"
                                    onClick={()=>handleDeleteOption(index)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    - Delete Option
                                </button>
                            </div>
                            
                        ))}
                                <button
                                    type="button"
                                    onClick={handleAddOption}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    + Add Option
                                </button>
                    </div>
                )}
                {(currentQuestion.type === 'multiple') && (
                    <div>
                        <label className="block mb-2 font-medium">Options:</label>
                        {currentQuestion.options.map((option, index) => (
                            <div key={`question${questions.length}_option${index}`} className="flex items-center mb-2">
                                <input
                                    type={'checkbox'}
                                    name={`question${questions.length}_option`}
                                    value={index}
                                    onChange={handleCorrectAnswerChange}
                                    className="mr-2"
                                />
                                <input
                                    type={'text'}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="mr-2"
                                />
                                 <button
                                    type="button"
                                    onClick={()=>handleDeleteOption(index)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    - Delete Option
                                </button>
                            </div>
                            
                        ))}
                                <button
                                    type="button"
                                    onClick={handleAddOption}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    + Add Option
                                </button>
                    </div>
                )}

                {currentQuestion.type === 'numerical' && (
                    <div>
                        <label className="block mb-2 font-medium">Correct Number:</label>
                        <input
                            type="number"
                            value={currentQuestion.numericalAnswer}
                            onChange={handleNumericalChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </div>
                )}

                {currentQuestion.type === 'boolean' && (
                    <div>
                        <label className="block mb-2 font-medium">Correct Answer:</label>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="booleanCorrectAnswer"
                                value="true"
                                // checked={currentQuestion.correctAnswer === 'true'}
                                onChange={handleCorrectAnswerChange}
                                className="mr-2"
                            />
                            <label className="mr-4">True</label>
                            <input
                                type="radio"
                                name="booleanCorrectAnswer"
                                value="false"
                                // checked={currentQuestion.correctAnswer === 'false'}
                                onChange={handleCorrectAnswerChange}
                                className="mr-2"
                            />
                            <label>False</label>
                        </div>
                    </div>
                )}


                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                    Add Question
                </button>
            </div>

            <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                    Submit
                </button>
        </div>
    );
};

export default QuestionMaker;
