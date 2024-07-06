import Quiz from "@models/quiz";
// import Quiz from "../../../../models/quiz";
import { connectToDB } from "@utils/database";
// import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const { quizId } = params;

        // Find the quiz by quizId
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(quiz), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch quiz with ID ${params.quizId}`, error);
        return new Response("Failed to fetch quiz", { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    try {
        await connectToDB();

        const {quizData} = await request.json(); 
        const { quizId } = params;

        // Update the quiz by quizId with quizData
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators
        });

        if (!updatedQuiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedQuiz), { status: 200 });
    } catch (error) {
        console.error(`Failed to update quiz with ID ${params.quizId}`, error);
        return new Response("Failed to update quiz", { status: 500 });
    }
};

export const DELETE = async (request, {params}) => {
    const {quizId} = params;
    try {
        await connectToDB();

        const deletedUser = await Quiz.findByIdAndDelete(quizId);

        if (!deletedUser) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        return new Response("Quiz Deleted Successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete quiz", error.message);
        return new Response("Failed to delete quiz", { status: 500 });
    }
};