import { useContext, useEffect, useState } from 'react';
import axios from '../../axios';
import ThemeContext from '../../contexts/ThemeContext';
import { ITheme } from '../../types';

export const Themes = () => {
    const [curTheme, setCurTheme] = useContext(ThemeContext);
    const [themes, setThemes] = useState<ITheme[]>([]);
    const toggleTheme = (name: string) => {
        const newTheme = themes.find(th => th.name === name)!;
        setCurTheme(newTheme);
        localStorage.setItem('theme', JSON.stringify(newTheme));
    };

    useEffect(() => {
        (async () => {
            const res: ITheme[] = [];
            for (let name of ['dark', 'light', 'blue'])
                res.push(
                    (await axios.get<ITheme>(`/theme/get?name=${name}`)).data
                );
            setThemes(res);
        })();
    }, []);

    return (
        <div
            style={{
                background: `${curTheme?.mainColor}`,
                color: `${curTheme?.textColor}`,
            }}
            className="flex flex-col h-full"
        >
            {themes.map(
                ({ title, name, id, mainColor, secondColor, textColor }) => (
                    <button
                        key={id}
                        onClick={() => toggleTheme(name)}
                        style={{
                            color: textColor,
                            borderColor: secondColor,
                            background: mainColor,
                        }}
                        className="text-xl p-1 max-sm:w-1/2 sm:w-1/3 m-auto border rounded-2xl hover:scale-110 active:scale-100"
                    >
                        {title}
                    </button>
                )
            )}
        </div>
    );
};
