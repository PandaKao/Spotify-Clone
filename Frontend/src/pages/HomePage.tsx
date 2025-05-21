import SectionGrid from "@/components/SectionGrid";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeaturedSection from "@/layout/FeaturedSection";
import { PlayBackControls } from "@/layout/PlayBackControls";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";

const HomePage = () => {

    const {
        fetchFeaturedSongs,
        fetchMadeForYouSongs,
        fetchTrendingSongs,
        isLoading,
        madeForYouSongs,
        featuredSongs,
        trendingSongs,
    } = useMusicStore();

    const { initializeQueue } = usePlayerStore();

    useEffect(() => {
        if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
            initializeQueue(allSongs);
        }
    }, [madeForYouSongs, featuredSongs, trendingSongs]);

    useEffect(() => {
        fetchFeaturedSongs();
        fetchMadeForYouSongs();
        fetchTrendingSongs();
    }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])
    return (
        <main className='flex flex-col h-screen bg-gradient-to-b from-zinc-900 to-zinc-800'>
            <Topbar />
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
                        <FeaturedSection />
                        <div className="space-y-8">
                            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
                            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <PlayBackControls />
        </main>
    )
}
export default HomePage