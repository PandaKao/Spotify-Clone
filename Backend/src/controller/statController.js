import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { User } from "../models/userModel.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalUsers, totalAlbums]= await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: {
                        coll: 'albums',
                        pipeline: []
                    }
                },
                {
                    $group:{
                        _id: '$artist',
                    }
                },
                {
                    $count: 'count',
                },
            ]),
        ]);

        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            totalArtists: uniqueArtists[0]?.count || 0,
        })
    } catch (error) {
        next(error);
    }
}