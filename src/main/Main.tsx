import { Outlet } from 'react-router-dom';
import { useStateObject } from '../utils/useStateObject';

export default function Main() {
  const stateAndSetter = useStateObject({
    categoryChoice: 'All',
    sortChoice: 'Price (low to high)',
    bwImages: false
  });

  return <main className="mt-5">
    <Outlet context={stateAndSetter} />
  </main>;
}