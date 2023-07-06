export interface HistoryPushStateArgs {
  path: string;
  componentName: string;
}

export default function useRouter() {
  const push = ({ path, componentName }: HistoryPushStateArgs) => {
    history.pushState({ pathname: path }, componentName, path);

    const popStateEvnetInstance = new PopStateEvent('popstate');

    dispatchEvent(popStateEvnetInstance);
  };
  return { push };
}
