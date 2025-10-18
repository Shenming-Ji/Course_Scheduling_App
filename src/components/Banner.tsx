import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

type BannerProps = { title: string };

const Banner = ({ title }: BannerProps) => {
  const { user } = useAuthState();
  return (
    <header className="p-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="ml-auto">
          <span className="mr-4">Welcome, {user ? user.displayName : 'guest'}!</span>
          {user ? (
            <button className="px-3 py-1 border rounded" onClick={() => signOut()}>
              Sign Out
            </button>
          ) : (
            <button className="px-3 py-1 border rounded" onClick={() => signInWithGoogle()}>
              Sign In
            </button>
          )}
        </div>
      </div>
      <hr className="my-4" />
    </header>
  );
};

export default Banner;