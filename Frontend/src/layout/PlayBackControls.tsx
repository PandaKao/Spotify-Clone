import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatDuration } from "@/pages/AlbumPage";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const PlayBackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector('audio');

        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
    }, [currentSong]);

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    }

    const volumeChange = (value: number[]) => {
        setVolume(value[0]);
        if (audioRef.current) {
            audioRef.current.volume = value[0] / 100;
        }
    }

    return (
        <footer className="h-20 sm:h-24 bg-zinc-900 border=t border-zinc-800 px-4">
            <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
                {/* currently playing song */}
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
                    {currentSong && (
                        <>
                            <img
                                src={currentSong.imageUrl}
                                alt={currentSong.title}
                                className="w-14 h-14 object-cover rounded-md"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate hover:underline cursor-pointer">
                                    {currentSong.title}
                                </div>
                                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                                    {currentSong.artist}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* playback controls */}
                <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
                    <div className="flex items-center gap-4 sm:gap-6">

                        {/* shuffle button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hidden sm:inline-flex hover:text-white text-zinc-400"
                        >
                            <Shuffle className="h-4 w-4" />
                        </Button>

                        {/* skip back button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:text-white text-zinc-400"
                            onClick={playPrevious}
                            disabled={!currentSong}
                        >
                            <SkipBack className="h-4 w-4" />
                        </Button>

                        {/* play/pause button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="bg-green-500 hover:bg-green-400 text-black rounded-full h-8 w-8"
                            onClick={togglePlay}
                            disabled={!currentSong}
                        >
                            {isPlaying ? <Pause className="h-5 w-5 text-black" /> : <Play className="h-5 w-5 text-black" />}
                        </Button>

                        {/* skip forward button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:text-white text-zinc-400"
                            onClick={playNext}
                            disabled={!currentSong}
                        >
                            <SkipForward className="h-4 w-4" />
                        </Button>

                        {/* repeat button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hidden sm:inline-flex hover:text-white text-zinc-400"
                        >
                            <Repeat className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* song slider */}
                    <div className="hidden sm:flex items-center gap-2 w-full">
                        <div className="text-xs text-zinc-400">{formatDuration(currentTime)}</div>
                        <Slider
                            value={[currentTime]}
                            onValueChange={handleSeek}
                            max={duration || 100}
                            step={1}
                            className="w-full hover:cursor-grab active:cursor-grabbing"
                        />
                        <div className="text-xs text-zinc-400">{formatDuration(duration)}</div>
                    </div>
                </div>
                {/* volume slider */}
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-white text-zinc-400"
                    >
                        <Mic2 className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-white text-zinc-400"
                    >
                        <ListMusic className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-white text-zinc-400"
                    >
                        <Laptop2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:text-white text-zinc-400"
                        >
                            <Volume1 className="h-4 w-4" />
                        </Button>

                        <Slider
                            value={[volume]}
                            onValueChange={volumeChange}
                            max={100}
                            step={1}
                            className="w-24 hover:cursor-grab active:cursor-grabbing"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};
