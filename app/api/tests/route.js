import Test from "@models/test";
// import Test from "../../../models/test";
import Quiz from "@models/quiz";
// import Quiz from "../../../models/quiz";
import { connectToDB } from "@utils/database";
// import { connectToDB } from "../../../utils/database";

export const GET = async () => {
    try {
        await connectToDB();

        const tests = await Test.find();

        return new Response(JSON.stringify(tests), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch tests", error.message);
        return new Response("Failed to fetch tests", { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectToDB();

        const { testData } = await request.json();

        console.log(testData)

        // Find the quiz by quizId
        // const quiz = await Quiz.findById(quizId);
        // if (!quiz) {
        //     return new Response("Quiz Not Found", { status: 404 });
        // }

        // Create a new test
        const newTest = new Test({
            ...testData,
        });

        const savedTest = await newTest.save();

        return new Response(JSON.stringify(savedTest), { status: 201 });
    } catch (error) {
        console.error("Failed to start test", error.message);
        return new Response("Failed to start test", { status: 500 });
    }
};
