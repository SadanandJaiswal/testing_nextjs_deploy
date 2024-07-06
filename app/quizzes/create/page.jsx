"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import QuestionMaker from "@components/QuestionMaker";
// import QuestionMaker from "../../../components/QuestionMaker";

const CreateQuiz = () => {
  const { data: session } = useSession();

  const [quizDetails, setQuizDetails] = useState({
    title: "",
    summary: "",
    duration: "",
    positiveScore: "",
    negativeScore: ""
  });

  const [quizId, setQuizId] = useState("");
  const [quizCreated, setQuizCreated] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleInitializeQuiz = async () => {
    try {
      const now = new Date();
      const quizData = {
        ...quizDetails,
        hostId: session.user.id,
        startAt: now,
      };
      const response = await axios.post("/api/quizzes", {
        quizData,
      });
      setQuizCreated(true);
      setQuizId(response.data._id);
      console.log("response ", response.data);
      // console.log('response ', quizData)
    } catch (error) {
      alert("error is occur");
      console.error("Error Initializing Quiz:", error);
    }
  };

  useEffect(() => {
    console.log("quiz id is ", quizId);
  }, [quizId]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 ">Create Quiz</h1>
      <div className="w-full flex flex-col border-2">
        <div className="flex w-full">
          <LabelInput quizCreated={quizCreated} name={"title"} value={quizDetails.title} onChange={handleChange} label={"Title"} type={"text"} placeholder={"Enter a Title for Quiz!"} />
          <LabelInput
            quizCreated={quizCreated}
            name={"duration"}
            value={quizDetails.duration}
            onChange={handleChange}
            label={"Duration (in Minutes)"}
            type={"number"}
            placeholder={"Enter a Title for Quiz!"}
          />
        </div>
        <div className="flex w-full">
          <LabelTextArea
            quizCreated={quizCreated}
            name={"summary"}
            value={quizDetails.summary}
            onChange={handleChange}
            label={"Description of Quiz"}
            placeholder={"Give Description of the Quiz!"}
          />
        </div>
        <div className="flex w-full">
          <LabelInput quizCreated={quizCreated} name={"positiveScore"} value={quizDetails.positiveScore} onChange={handleChange} label={"Score (on each correct)"} type={"number"} placeholder={"Marks Awarded for each Question Correct"} />
          <LabelInput
            quizCreated={quizCreated}
            name={"negativeScore"}
            value={quizDetails.negativeScore}
            onChange={handleChange}
            label={"Negative Mark"}
            type={"number"}
            placeholder={"Marks Deducted on Wrong Answer"}
          />
        </div>
        <div className="w-full flex justify-center space-x-4 mt-4">
          {!quizCreated && (
            <button
              onClick={handleInitializeQuiz}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Create Quiz
            </button>
          )}
          <button
            onClick={() => setQuizCreated(false)}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
          >
            Edit
          </button>
        </div>
      </div>
          {quizCreated && 
            <div className="w-full flex flex-col">
              <h2 className="text-2xl font-bold mt-4 mb-4">Add Question to the Quiz</h2>
              <div className="flex w-full flex-col">
                <QuestionMaker quizId={quizId}/>
              </div>
            </div>
          }
    </div>
  );
};

export default CreateQuiz;

const LabelInput = ({
  name,
  quizCreated,
  value,
  onChange,
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="mb-4 mx-4 w-full">
      <label htmlFor={name} className="block text-lg font-semibold mb-2">
        {label}
      </label>
      {quizCreated ? (
        <p className="block w-full p-2 border bg-transparent">{value}</p>
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="w-[100%] px-2 border-0 border-b-2 border-gray-300  focus:ring-0 focus:border-b-indigo-600 focus:outline-none bg-transparent rounded-md"
          required
        />
      )}
    </div>
  );
};
const LabelTextArea = ({
  name,
  quizCreated,
  value,
  onChange,
  label,
  placeholder,
}) => {
  return (
    <div className="mb-4 mx-4 w-full">
      <label htmlFor={name} className="block text-lg font-semibold mb-2">
        {label}
      </label>
      {quizCreated ? (
        <p className="block w-full p-2 border bg-transparent">{value}</p>
      ) : (
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full p-2 border border-2 border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-0 peer bg-transparent"
          required
        />
      )}
    </div>
  );
};
