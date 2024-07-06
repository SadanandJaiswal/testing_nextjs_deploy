import Quiz from "@models/quiz";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB();

        const quizzes = await Quiz.find({ totalQuestion: { $gt: 0 } });

        return new Response(JSON.stringify(quizzes), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch quizzes", error);
        return new Response("Failed to fetch quizzes", { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectToDB();

        const { quizData } = await request.json();
        // const {hostId, title, duration, startAt, totalScore} = await quizData;

        // Create a new quiz
        const newQuiz = new Quiz({
            ...quizData,
            createdAt: new Date(),
        });

        const savedQuiz = await newQuiz.save();

        return new Response(JSON.stringify(savedQuiz), { status: 201 });
    } catch (error) {
        console.error("Failed to create quiz", error);
        return new Response("Failed to create quiz", { status: 500 });
    }
};