import useRouter from '../hook/useRouter';
import useTitleChange from '../hook/useTitleChange';

export default function About() {
  const { push } = useRouter();
  useTitleChange('About');

  return (
    <>
      <h2>About</h2>
      <button
        type='button'
        onClick={() => {
          push({ path: '/', componentName: 'Root' });
        }}
      >
        Root
      </button>
    </>
  );
}
