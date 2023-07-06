import useRouter from '../hook/useRouter';

export default function Root() {
  const { push } = useRouter();

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
