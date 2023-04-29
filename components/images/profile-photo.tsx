import Image from "next/image";

const ProfilePhoto = () => {
  return (
    <Image src={'/profile.jpg'} alt='profile-photo' className='w-full h-auto border-2 border-tournamento-800 rounded-full' width='0' height='0' sizes='100vw' />
  );
}
 
export default ProfilePhoto;