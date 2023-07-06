import useRouter from '../hook/useRouter';

export default function About() {
  const { push } = useRouter();

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
