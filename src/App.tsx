import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { News } from './routes/News/News';
import { Themes } from './routes/Themes/Themes';
import ThemeContext from './contexts/ThemeContext';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ITheme } from './types';
import axios from './axios';

function App() {
    const [theme, setTheme] = useState<ITheme>();
    useEffect(() => {
        !localStorage.getItem('theme')
            ? (async () => {
                  const newTheme = (
                      await axios.get<ITheme>('/theme/get?name=dark')
                  ).data;
                  setTheme(newTheme);
                  localStorage.setItem('theme', JSON.stringify(newTheme));
              })()
            : setTheme(JSON.parse(localStorage.getItem('theme')!));
    }, []);
    return (
        <ThemeContext.Provider
            value={
                [theme, setTheme] as [ITheme, Dispatch<SetStateAction<ITheme>>]
            }
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<News />} />
                        <Route path="themes" element={<Themes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;
