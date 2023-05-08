import LoadingSpinner from "./loading-spinner";

const LoadingFullscreen = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <LoadingSpinner size={128} />
    </div>
  );
}
 
export default LoadingFullscreen;