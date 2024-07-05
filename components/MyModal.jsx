// components/CustomModal.js
import React from "react";
import MyGaugeChart from "./MyGaugeChart";

const MyModal = ({ isOpen, onClose, currentTestDetails }) => {
  const { quizId, correctAnswerArray, incorrectAnswerArray, unAnsweredArray, createdAt, score } =
    currentTestDetails;
  if (!isOpen) return null;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    
    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
  
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
  
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 pb-0 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4  mt-3 text-center">
          {quizId?.title}
        </h2>

        {/* GaugeChart */}
        <MyGaugeChart correct={correctAnswerArray?.length} incorrect={incorrectAnswerArray?.length} unanswered={unAnsweredArray?.length} />

        {/* Modal Rest Body */}
        <div className="bg-white  rounded-lg p-6 max-w-md mx-auto my-4 mb-2">
          {/* Score */}
          <div className="flex justify-center items-center border-2 pb-2">
            <div className="text-3xl font-bold text-blue-600 border mr-2">
              Score:
            </div>
            <div className="font-semibold border text-center mt-2">
              <div className="text-xl border-b-2 border-black">
                {score}
              </div>
              <div className="text-xl ">
                {quizId?.totalScore}
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-600">
            <div className="flex justify-between py-1">
              <div className="font-medium">Date of Test:</div>
              <div>{formatDateTime(createdAt)}</div>
            </div>
            <div className="flex justify-center pt-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow w-full">
                View Test
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
