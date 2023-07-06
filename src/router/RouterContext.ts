import { createContext } from 'react';

interface PathnameState {
  pathname: string;
}

const pathnameState: PathnameState = { pathname: '' };

export const RouterContext = createContext(pathnameState);
