import Landing from '@/components/Landing';
import { getCurrentUser } from '../lib/session';

const Home = async () => {
  const user = await getCurrentUser();

  return user ? (
    <div>
      <h1>placeholder</h1>
    </div>
  ) : (
    <div className='flex flex-col'>
      <Landing />
    </div>
  );
};

export default Home;