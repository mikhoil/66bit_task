import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeContext from '../Layout/ThemeContext';

export const Header = () => {
    const [theme] = useContext(ThemeContext);
    const { pathname } = useLocation();
    return (
        <div
            style={{
                background: `${theme?.secondColor}`,
                color: `${theme?.textColor}`,
                borderColor: `${theme?.mainColor}`,
            }}
            className="text-center text-3xl py-5 w-full lg:border-2"
        >
            {pathname.startsWith('/themes') ? 'Темы' : 'Новости'}
        </div>
    );
};
