import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import Subtitle from "./subtitle";
import { BsX } from "react-icons/bs";

interface Props {
  title: string,
  isOpen: boolean,
  close: () => void
}

const Modal = ({ title, isOpen, close, children }: PropsWithChildren<Props>) => {
  return (
    <Transition
      show={isOpen}
      appear
      as={Fragment}
      enter='ease-out duration-100'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog onClose={close} className='relative z-50'>
        {/* Dark background */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* fullscreen container */}
        <div className='fixed inset-0 flex items-center justify-center p-2'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0 scale-90'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Panel className='w-full rounded max-w-lg bg-white px-4 py-1'>
              
              <div className='flex items-center justify-between'>
                <Dialog.Title as='div'>
                  <Subtitle>{title}</Subtitle>
                </Dialog.Title>
                <button onClick={close} className='text-2xl hover:text-red-500 duration-100'>
                  <BsX />
                </button>
              </div>
                <section className='px-2'>
                    {children}
                </section>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
 
export default Modal;