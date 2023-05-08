import Image from "next/image";

const Logo = () => {
  return (
    <Image src={'/logo.png'} alt='logo' width='0' height='0' sizes='100vw' className='max-w-lg w-full h-auto' />
  );
}
 
export default Logo;