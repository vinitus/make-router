import { createContext } from 'react';

interface PathnameState {
  pathname: string;
}

const pathnameState: PathnameState = { pathname: '' };

const RouterContext = createContext(pathnameState);

export default function Router() {
  return <div>Router</div>;
}
