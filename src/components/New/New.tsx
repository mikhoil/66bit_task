import { FC, useContext } from 'react';
import { INew } from '../../types';
import ThemeContext from '../Layout/ThemeContext';
import dayjs from 'dayjs';

export const New: FC<Omit<INew, 'id'>> = ({
    content,
    title,
    createdAt,
    updatedAt,
}) => {
    const [theme] = useContext(ThemeContext);
    return (
        <div
            style={{ borderColor: theme?.secondColor }}
            className="border rounded-2xl mb-5 p-2"
        >
            <h1 className="text-xl text-center mb-2">{title}</h1>
            <p>{content}</p>
            <br />
            <p className="text-center">
                created at{' '}
                {dayjs(new Date(createdAt)).format('HH:mm:ss DD.MM.YYYY')}
                <br />
                edited at{' '}
                {dayjs(new Date(updatedAt)).format('HH:mm:ss DD.MM.YYYY')}
            </p>
        </div>
    );
};
