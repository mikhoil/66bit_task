import { createContext, Dispatch, SetStateAction } from 'react';
import { ITheme } from '../types';

export default createContext<[ITheme, Dispatch<SetStateAction<ITheme>>]>(
    undefined!
);
