import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from '../../axios';
import { ITheme } from '../../types';
import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';
import ThemeContext from './ThemeContext';

export const Layout = () => {
    useEffect(() => {
        if (!localStorage.getItem('theme'))
            (async (name: string) => {
                const res = (await axios.get<ITheme>(`/theme/get?name=${name}`))
                    .data;
                localStorage.setItem('theme', JSON.stringify(res));
            })('dark');
    }, []);

    return (
        <ThemeContext.Provider
            value={useState(JSON.parse(localStorage.getItem('theme')!))}
        >
            <div className="flex flex-col m-auto h-screen max-h-screen lg:w-1/2">
                <Header />
                <main className="grow overflow-y-auto" id="scrollable">
                    <Outlet />
                </main>
                <Navbar />
            </div>
        </ThemeContext.Provider>
    );
};
