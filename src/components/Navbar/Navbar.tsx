import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../Layout/ThemeContext';

export const Navbar = () => {
    const [theme] = useContext(ThemeContext);
    return (
        <nav
            style={{
                color: `${theme?.textColor}`,
                background: `${theme?.secondColor}`,
                borderColor: `${theme?.mainColor}`,
            }}
            className="flex justify-around py-5 text-xl lg:border-2"
        >
            <Link to={'/'} className="hover:scale-110">
                Новости
            </Link>
            <Link to={'/themes'} className="hover:scale-110">
                Темы
            </Link>
        </nav>
    );
};
