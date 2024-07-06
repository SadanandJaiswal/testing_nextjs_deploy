// Import necessary modules and models
import { connectToDB } from '@utils/database';
import Quiz from '@models/quiz'; // Assuming your Quiz model is defined in '@models/Quiz'
import QuizQuestion from '@models/quizQuestion';
// import { connectToDB } from '../../../../../utils/database';
// import Quiz from '../../../../../models/Quiz'; // Assuming your Quiz model is defined in '@models/Quiz'
// import QuizQuestion from '../../../../../models/quizQuestion';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        const { quizId } = params;

        // Find the quiz by quizId and populate the quizQuestions array
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        const questions = await QuizQuestion.find({quizId: quizId});

        if (!questions) {
            return new Response("Quiz Question Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(questions), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch questions for quiz with ID ${params.quizId}`, error);
        return new Response("Failed to fetch questions for quiz", { status: 500 });
    }
};

export const POST = async (request, { params }) => {
    try {
      await connectToDB();
  
      const { quizId } = params;
      const { questionDataArray } = await request.json();
  
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return new Response("Quiz Not Found", { status: 404 });
      }
  
      const savedQuestions = await QuizQuestion.insertMany(questionDataArray);
  
      const newTotalQuestions = quiz.totalQuestion + questionDataArray.length;
      const newTotalScore = quiz.totalScore + (quiz.positiveScore * questionDataArray.length);
  
      quiz.totalQuestion = newTotalQuestions;
      quiz.totalScore = newTotalScore;
  
      await quiz.save();
  
      return new Response(JSON.stringify(savedQuestions), { status: 201 });
    } catch (error) {
      console.error(`Failed to create or add question to quiz with ID ${params.quizId}`, error.message);
      return new Response("Failed to create or add question to quiz", { status: 500 });
    }
};
  

