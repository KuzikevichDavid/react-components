function Fallback() {
  return (
    <>
      <p>Something went wrong</p>
      <button type="button" onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </>
  );
}

export default Fallback;
