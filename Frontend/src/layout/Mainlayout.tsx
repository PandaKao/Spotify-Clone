import { Outlet } from "react-router-dom";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import LeftSidebar from "./LeftSidebar";
import FriendsActivity from "./FriendsActivity";
import AudioPlayer from "../components/AudioPlayer";

const MainLayout = () => {
    const isMobile = false;
    return <div className="h-screen bg-black text-white flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            <AudioPlayer />
            {/* left sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* main content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* right sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={25} collapsedSize={0}>
                <FriendsActivity />
            </ResizablePanel>
        </ResizablePanelGroup>

    </div>
};
export default MainLayout;