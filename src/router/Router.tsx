import React, { createContext, useState } from 'react';

interface PathnameState {
  pathname: string;
}

const pathnameState: PathnameState = { pathname: '' };

const RouterContext = createContext(pathnameState);

export default function Router({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState('');

  return <RouterContext.Provider value={{ pathname }}>{children}</RouterContext.Provider>;
}
