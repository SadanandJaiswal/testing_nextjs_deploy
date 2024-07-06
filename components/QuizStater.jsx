import React from 'react'

const QuizStater = ({quizData}) => {
  return (
    <>
            <h1 className="text-3xl font-bold mb-4">{quizData.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{quizData.summary}</p>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-sm text-gray-600">Total Score</p>
                    <p className="text-xl font-semibold">{quizData.totalScore}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-xl font-semibold">{quizData.duration} mins</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Total Questions</p>
                    <p className="text-xl font-semibold">{quizData.totalQuestion}</p>
                </div>
            </div>
      </>
  )
}

export default QuizStater
