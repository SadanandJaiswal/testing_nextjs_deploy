import Test from "@models/test";
import { connectToDB } from "@utils/database";
// import Test from "../../../../models/test";
// import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const { testId } = params;

        // Find the quiz by testId
        const test = await Test.findById(testId);

        if (!test) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(test), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch quiz with ID ${params.testId}`, error);
        return new Response("Failed to fetch quiz", { status: 500 });
    }
};