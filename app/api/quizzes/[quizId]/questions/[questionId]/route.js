import { connectToDB } from '@utils/database';
// import { connectToDB } from '../../../../../../utils/database';
import Quiz from '@models/Quiz'; 
// import Quiz from '../../../../../../models/Quiz'; 
import QuizQuestion from '@models/quizQuestion';
// import QuizQuestion from '../../../../../../models/quizQuestion';
// 
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const { questionId } = params;

        // Find the specific question by questionId
        const question = await QuizQuestion.findById(questionId);

        if (!question) {
            return new Response("Question Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(question), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch question with ID ${questionId}`, error);
        return new Response("Failed to fetch question", { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    try {
        await connectToDB();

        const { questionId } = params;
        const {updateQuestionData} = await request.json();

        // Find the specific question by questionId and update it
        const updatedQuestion = await QuizQuestion.findByIdAndUpdate(questionId, updateQuestionData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators
        });

        if (!updatedQuestion) {
            return new Response("Question Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedQuestion), { status: 200 });
    } catch (error) {
        console.error(`Failed to update question with ID ${questionId}`, error);
        return new Response("Failed to update question", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const { quizId, questionId } = params;

        // Remove the question from the quiz's quizQuestions array
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        const questionIndex = quiz.quizQuestions.findIndex(q => q.equals(questionId));
        if (questionIndex === -1) {
            return new Response("Question Not Found in Quiz", { status: 404 });
        }
        quiz.quizQuestions.splice(questionIndex, 1);
        await quiz.save();

        // Delete the question document itself from the QuizQuestion collection
        const deletedQuestion = await QuizQuestion.findByIdAndDelete(questionId);
        if (!deletedQuestion) {
            return new Response("Question Not Found", { status: 404 });
        }

        return new Response("Question Deleted Successfully", { status: 200 });
    } catch (error) {
        console.error(`Failed to delete question with ID ${questionId}`, error);
        return new Response("Failed to delete question", { status: 500 });
    }
};
