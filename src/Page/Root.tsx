import useRouter from '../hook/useRouter';
import useTitleChange from '../hook/useTitleChange';

export default function Root() {
  const { push } = useRouter();
  useTitleChange('Root');

  return (
    <>
      <h2>Root</h2>
      <button
        type='button'
        onClick={() => {
          push({ path: '/about', componentName: 'About' });
        }}
      >
        About
      </button>
    </>
  );
}
