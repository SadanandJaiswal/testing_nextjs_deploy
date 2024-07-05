// components/CustomModal.js
import React from "react";
import Modal from "react-modal";

// Modal.setAppElement("#__next"); // Important for accessibility
Modal.setAppElement(".app");

const CustomModal = ({ isOpen, onRequestClose, currentTestDetails }) => {

    const {quizId, correctAnswerArray, incorrectAnswerArray, createdAt, score} = currentTestDetails;
    // const {title, duration, positiveScore, negativeScore, totalQuestion, totalScore} = quizId;

    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          zIndex: 100,
        },
      };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={quizId?.title}
      style={customStyles}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-4 border-2 border-blue-400">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="text-xl font-semibold text-gray-800">
            Marks Obtained
          </div>
          <div className="text-xl font-semibold text-gray-800">Total Marks</div>
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="text-2xl font-bold text-blue-600">
            {score}
          </div>
          <div className="text-2xl font-bold text-blue-600">{quizId?.totalScore}</div>
        </div>
        <div className="mt-4 text-gray-600">
          <div className="flex justify-between py-1">
            <div className="font-medium">Duration of Quiz:</div>
            <div>{quizId?.duration}</div>
          </div>
          <div className="flex justify-between py-1">
            <div className="font-medium">Quiz Taken Date:</div>
            <div>{createdAt}</div>
          </div>
          <div className="flex justify-between py-1">
            <div className="font-medium">Total Number of Questions:</div>
            <div>{quizId?.totalQuestion}</div>
          </div>
          <div className="flex justify-between py-1">
            <div className="font-medium">Correct Answers:</div>
            <div>{correctAnswerArray?.length}</div>
          </div>
          <div className="flex justify-between py-1">
            <div className="font-medium">Wrong Answers:</div>
            <div>{incorrectAnswerArray?.length}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
