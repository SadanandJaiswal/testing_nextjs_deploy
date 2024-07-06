import Test from "@models/test";
import QuizQuestion from "@models/quizQuestion";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        await connectToDB();

        // console.log('params:', params); // Check if params is correctly logged
        const { testId } = params; // Destructure testId from params

        // console.log('testId:', testId); // Check if testId is correctly logged

        // // Example of further logging for debugging
        // console.log('typeof params:', typeof params);
        // console.log('params keys:', Object.keys(params));

        // Ensure testId is available in params
        if (!testId) {
            return new Response("testId not found in params", { status: 400 });
        }

        // Fetch test data by testId
        const test = await Test.findById(testId);

        // // Fetch quizQuestionsData by quizId
        const quizQuestionsData = await QuizQuestion.find({ quizId: test.quizId }).populate('quizId', 'positiveScore negativeScore');

        // // Initialize variables
        let userScore = 0;
        const { answers } = test;
        const {quizId} = quizQuestionsData[0];
        const { positiveScore, negativeScore } = quizId;

        let correctAnswerArray = [];
        let incorrectAnswerArray = [];
        let unAnsweredArray = [];
        // console.log('p and n is ', positiveScore, negativeScore);

        // console.log('quizquestion data')
        // console.log(quizQuestionsData)
        // // Iterate through answers array
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            // const quizQuestion = quizQuestionsData.find(q => q._id === answer.quizQuestionId);
            const quizQuestion = quizQuestionsData[i]
            // console.log(quizQuestionsData[i]._id, answer.quizQuestionId) // both array are in same order
            // console.log(`question${i} `, quizQuestion)

            // console.log(answer, quizQuestion)

            if (!quizQuestion) {
                console.log('continue hogaya ', i)
                continue; // Handle case where quiz question is not found
            }

            const { type, correctAnswer } = quizQuestion;
            // const selectedAnswer = answer.selectedAnswer;
            const {selectedAnswer, quizQuestionId} = answer;

            // console.log(type, correctAnswer, selectedAnswer)

            if(selectedAnswer && selectedAnswer.length > 0)
            {
                // console.log('inside if ', i)
                if (arraysEqualIgnoringOrder(selectedAnswer, correctAnswer)) {
                    // console.log('plus ', i)
                    userScore += positiveScore;
                    correctAnswerArray.push(quizQuestionId.toString());
                } else {
                    // console.log('minus ', i)
                    userScore -= negativeScore;
                    incorrectAnswerArray.push(quizQuestionId.toString());
                }
            }else{
                unAnsweredArray.push(quizQuestionId.toString());
            }
        }

        // // Update test with calculated score
        test.score = userScore;
        test.correctAnswerArray = correctAnswerArray;
        test.incorrectAnswerArray = incorrectAnswerArray;
        test.unAnsweredArray = unAnsweredArray;
        await test.save();

        console.log('correctAnswerArray is ', correctAnswerArray)
        console.log('incorrectAnswerArray is ', incorrectAnswerArray)
        console.log('unAnsweredArray is ', unAnsweredArray)
        console.log('score is ', userScore);

        return new Response(JSON.stringify(test), { status: 200 });
    } catch (error) {
        console.error(`Failed to calculate score for test with ID ${testId}`, error.message);
        return new Response("Failed to calculate score", { status: 500 });
    }
};

function arraysEqualIgnoringOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // Create copies of the arrays and sort them
    let sortedArr1 = [...arr1].sort();
    let sortedArr2 = [...arr2].sort();

    // Compare sorted arrays element by element
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}
