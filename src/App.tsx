import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { News } from './routes/News/News';
import { Themes } from './routes/Themes/Themes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<News />} />
                    <Route path="themes" element={<Themes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
