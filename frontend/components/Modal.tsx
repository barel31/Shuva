'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

function Modal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialogElement = document.getElementById(
      'dialogModal'
    ) as HTMLDialogElement;
    if (dialogElement) {
      dialogElement.showModal();
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        router.back();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [router]);

  return (
    <dialog
      id="dialogModal"
      className="absolute top-0 mt-32 m-auto p-2 md:p-10 w-[75vw] md:w-[50vw] dark:bg-neutral-500 rounded-md text-center transition-all shadow-md border-2">
      <div ref={ref}>
        {children}
        <button
          type="button"
          className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 border border-neutral-700 rounded m-4"
          onClick={() => router.back()}>
          סגור
        </button>
      </div>
    </dialog>
  );
}

export default Modal;
