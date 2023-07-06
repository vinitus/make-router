export interface HistoryPushStateArgs {
  path: string;
  componentName: string;
}

export default function useRouter() {
  const push = ({ path, componentName }: HistoryPushStateArgs) => {
    history.pushState(null, componentName, path); //
  };
  return { push };
}
