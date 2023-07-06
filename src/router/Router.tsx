import React, { useState, useEffect } from 'react';
import { RouterContext } from './RouterContext';

export default function Router({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setPathname(window.location.pathname);
    });
  }, []);

  return <RouterContext.Provider value={{ pathname }}>{children}</RouterContext.Provider>;
}
