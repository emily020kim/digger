import { getCurrentUser } from '../lib/session';

export default function Home() {
  const user = getCurrentUser();

  return user ? (
    <div>
      {/** page if they are signed in */}
    </div>
  ) : (
    <div>
      {/** landing page */}
    </div>
  );
};