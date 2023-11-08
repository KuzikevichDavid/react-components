import { useNavigate } from 'react-router-dom';

function Fallback() {
  const navigate = useNavigate();
  return (
    <>
      <p>Something went wrong</p>
      <button type="button" onClick={() => navigate('/')}>
        Refresh Page
      </button>
    </>
  );
}

export default Fallback;
