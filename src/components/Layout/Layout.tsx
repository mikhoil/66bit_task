import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {
    return (
        <div className="flex flex-col m-auto h-screen max-h-screen lg:w-1/2">
            <Header />
            <main className="grow overflow-y-auto" id="scrollable">
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};
