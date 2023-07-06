import React, { useContext } from 'react';
import { RouterContext } from './RouterContext';

interface RouteProps {
  path: string;
  component: React.ReactNode;
}

export default function Route(props: RouteProps) {
  const { path, component } = props;
  const { pathname } = useContext(RouterContext);

  if (pathname === path) return component;
}
