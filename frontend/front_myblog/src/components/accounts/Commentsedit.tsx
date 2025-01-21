import { useLocation } from 'react-router-dom';

export const Commentsedit = () => {
  const location = useLocation();
  const id = location.state?.id;

  return (
    <div>Commentsedit (ID: {id})</div>
  )
}