import User from "@models/user";
import { connectToDB } from "@utils/database";
// import User from "../../../models/user";
// import { connectToDB } from "../../../utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const Users = await User.find()

        if (!Users) {
            return new Response("Users not found", { status: 404 });
        }

        return new Response(JSON.stringify(Users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch Users Details", { status: 500 })
    }
} 