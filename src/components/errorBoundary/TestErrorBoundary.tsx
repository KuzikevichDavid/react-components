import { useState } from 'react';

function TestErrorBoundary() {
  const [isThrow, setIsThrow] = useState(false);

  function onClick() {
    setIsThrow(true);
  }

  if (isThrow) throw new Error('Error in TestErrorBoundary');

  return (
    <section>
      <button type="button" onClick={onClick}>
        Test Error Boundary
      </button>
    </section>
  );
}

export default TestErrorBoundary;
