import React from 'react'
import Link from "next/link";
import QuizListCard from "./QuizListCard";

const QuizList = ({quizData, heading }) => {
  return (
    <>
        <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
        <hr className="w-full max-w-3xl mb-4 border-gray-400" />
        {quizData.map((quiz) => {
            return (
            <Link href={`/quizzes/${quiz._id}`} className="bg-white rounded-xl shadow-md overflow-hidden w-full my-4 transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer" key={quiz._id}>
                <QuizListCard
                title={quiz.title}
                deadline={quiz.deadline}
                duration={quiz.duration}
                totalScore={quiz.totalScore}
                />
            </Link>
            );
        })}
    </>
  )
}

export default QuizList
