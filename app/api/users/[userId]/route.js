import User from "@models/user";
import { connectToDB } from "@utils/database";
// import User from "../../../../models/user";
// import { connectToDB } from "../../../../utils/database";

// Get the user Details
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.userId);

        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.error("Failed to fetch user with param id " + params.userId , error);
        return new Response(error.message, { status: 500 })
    }
};

// Update User detail
export const PUT = async (request, { params }) => {
    const { userData } = await request.json();
    const {userId} = params;

    try {
        await connectToDB();

        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators
        });

        if (!updatedUser) {
            return new Response("User Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error("Failed to update user", error);
        return new Response("Failed to update user details", { status: 500 });
    }
};

// Delete User
export const DELETE = async (request, {params}) => {
    const {userId} = params;
    try {
        await connectToDB();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return new Response("User Not Found", { status: 404 });
        }

        return new Response("User Deleted Successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete user", error);
        return new Response("Failed to delete user", { status: 500 });
    }
};

