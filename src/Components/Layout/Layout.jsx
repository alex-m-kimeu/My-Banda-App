import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaBars, FaTimes } from "react-icons/fa";

export const Layout = ({ Sidebar, Header, Footer, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`relative h-screen overflow-auto flex flex-col ${Sidebar && isLargeScreen ? 'flex' : ''}`}>
            {Header && <Header />}
            <div className="flex flex-grow">
                {Sidebar && (
                    <>
                        <button onClick={handleSidebarToggle} className="absolute right-0 z-20 p-3 lg:hidden">
                            {isSidebarOpen ? <FaTimes className='fill-Secondary' /> : <FaBars className='fill-Secondary' />}
                        </button>
                        {(isSidebarOpen || isLargeScreen) && (
                            <div className={`z-10 w-full lg:w-60 bg-white ${isLargeScreen ? 'relative' : 'absolute'}`}>
                                <Sidebar />
                            </div>
                        )}
                    </>
                )}
                <div className={`flex flex-col flex-grow px-0 ${Header ? '' : 'px-4 lg:px-[40px] py-4 lg:py-[20px]'} ${Sidebar ? '' : 'px-0 py-0'}`}>
                    {children}
                </div>
            </div>
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
            {Footer && <Footer className="mt-auto" />}
        </div>
    )
}