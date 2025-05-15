import { Song } from "@/types";
import { Button } from "./ui/button";
import PlayButton from "./PlayButton";

type SectionGridProps = {
    title: string;
    songs: Song[];
    isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
    if (isLoading) return (
        <div className="mb-8">
            <div className="h-8 w-48 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-zinc-800/40 p-4 rounded-md animate-pulse">
                        <div className="aspect-square rounded-md bg-zinc-700 mb-4" />
                        <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
                    </div>
                ))}
            </div>
        </div>
    )
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">
                    {title}
                </h2>
                <Button variant="link" className="text-sm text-zinc-400 hover:text-white">
                    Show All
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <div key={song._id} className="bg-zinc-80/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor pointer">
                        <div className="relative mb-4">
                            <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                                <img
                                    src={song.imageUrl}
                                    alt={song.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <PlayButton song={song} />
                        </div>
                        <h3 className="font-medium mb-2 truncate">
                            {song.title}
                        </h3>
                        <p className="text-sm text-zinc-400 truncate">
                            {song.artist}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default SectionGrid;