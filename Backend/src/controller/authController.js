import { User } from "../models/userModel.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        await User.findOneAndUpdate({ clerkId: id },
            {
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({ success: true })
    } catch (error) {
        console.log('Error in auth callback', error);
        next(error);
    }
}