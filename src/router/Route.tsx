import React from 'react';

interface RouteProps {
  path: string;
  component: React.ReactNode;
}

export default function Route(props: RouteProps) {
  const { path, component } = props;
  console.log(path, component);

  return <div>Route</div>;
}
