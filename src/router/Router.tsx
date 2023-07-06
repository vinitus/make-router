import React, { createContext, useState, useEffect } from 'react';

interface PathnameState {
  pathname: string;
}

const pathnameState: PathnameState = { pathname: '' };

export const RouterContext = createContext(pathnameState);

export default function Router({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setPathname(window.location.pathname);
    });
  }, []);

  return <RouterContext.Provider value={{ pathname }}>{children}</RouterContext.Provider>;
}
