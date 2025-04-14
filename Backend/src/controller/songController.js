import { Song } from "../models/songModel.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        // Fetch random songs using MoongoDb aggregation
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);

        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getTopSongs = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userTopSongs = await Song.aggregate([
            {
                $match: {
                    "plays.userId": userId
                }
            },
            {
                $addFields: {
                    playCount: {
                        $size: {
                            $filter: {
                                input: '$plays',
                                as: 'play',
                                cond: { $eq: ['$$play.userId', userId] }
                            }
                        }
                    }
                }
            },
            {
                $sort: { playCount: -1 }
            },
            {
                $limit: 4
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);

        res.json(userTopSongs);
    } catch (error) {
        next(error);
    }
};