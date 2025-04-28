import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMusicStore } from "../stores/useMusicStore";

const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    console.log({ albums });

    return <div className="h-full flex flex-col gap-2">

        {/* navigation menu */}
        <div className="rounded-lg bg-zinc-900 p-4">
            <div className="space-y-2">

                {/* home */}
                <Link to={'/'} className={cn(buttonVariants(
                    {
                        variant: 'ghost',
                        className: 'w-full justify-start text-white hover:bg-zinc-800',
                    }
                ))}>
                    <HomeIcon className="mr-2 size-5" />
                    <span className="hidden md:inline">Home</span>
                </Link>

                {/* messages */}
                <SignedIn>
                    <Link to={'/chat'} className={cn(buttonVariants(
                        {
                            variant: 'ghost',
                            className: 'w-full justify-start text-white hover:bg-zinc-800',
                        }
                    ))}>
                        <MessageCircle className="mr-2 size-5" />
                        <span className="hidden md:inline">Messages</span>
                    </Link>
                </SignedIn>
            </div>
        </div>

        {/* library section */}
        <div className="flex-1 rounded-lg bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2" />
                    <span className="hidden md:inline">Playlists</span>
                </div>
            </div>

            <ScrollArea className="h-[clac(100vh-300px)]">
                <div className="space-y-2">
                    {isLoading ? (
                        Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="p-2 rounded-md flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse" />
                                <div className="flex-1 min-w-0 hidden md:block space-y-2">
                                    <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
                                    <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : (
                        albums.map((album) => (
                            <Link
                                to={`/albums/${album._id}`}
                                key={album._id}
                                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                            >
                                <img
                                    src={album.imageUrl}
                                    alt="Playlist img"
                                    className="size-12 rounded-md flex-shrink-0 object-cover"
                                />

                                <div className="flex-1 min-w-0 hidden md:block">
                                    <p className="font-medium truncate">{album.title}</p>
                                    <p className="text-sm text-zinc-400 truncate">Album • {album.artist}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
};
export default LeftSidebar;