import PlayButton from "@/components/PlayButton";
import { useMusicStore } from "@/stores/useMusicStore";

const FeaturedSection = () => {
    const { isLoading, featuredSongs, error } = useMusicStore();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden animate-pulse">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0" />
                        <div className="flex-1 p-4">
                            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return <p className="text-red-500 mb-4 text-lg">{error}</p>
    }

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {featuredSongs.map((song) => (
            <div key={song._id}
                className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
            >
                <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1 p-4">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                </div>
                <PlayButton song={song} />
            </div>
        ))}
    </div>
};
export default FeaturedSection