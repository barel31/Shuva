'use client';

import { ContactFormAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ContactForm({
  contact,
  message = false,
}: {
  contact: ContactInfo;
  message?: boolean;
}) {
  const router = useRouter();

  const [disableBtn, setDisableBtn] = useState(false);

  const HandleForm = async (e: FormData) => {
    setDisableBtn(() => true);

    const res = await ContactFormAction(e);

    // server-action don't work in including generateStaticParams in page (experimental)
    // optional chaining required.
    if (res?.success) {
      router.push('thank-you');
    } else {
      console.error('Unable to send Mail.');
      console.log(res.info);

      router.push('error');
      setDisableBtn(() => false);
    }
  };

  return (
    <div
      className={cn(
        'm-auto flex flex-col placeholder:text-neutral-950text-lg 5ustify-around w-full h-full border-8 border-[#FFD700] rounded-sm gold-effect-border',
        {
          'bg-neutral-400 dark:bg-neutral-dark:600 lg:flex-row': !message,
        }
      )}>
      {!message && (
        <a
          href={`tel:${contact?.mobile}`}
          className="w-1/2 m-auto text-neutral-950 dark:text-neutural-400 font-bold text-xl"
          title="צור קשר">
          התקשרו{' '}
          <span className="text-cyan-800 dark:text-neutral-200 font-bold">
            {contact?.mobile}
          </span>{' '}
          או השאירו פרטים:
        </a>
      )}

      <form
        action={HandleForm}
        className={cn('m-auto flex flex-col gap-2 items-baseline p-2', {
          'w-full': message,
          'md:flex-row max-md:w-full': !message,
        })}>
        <input
          autoComplete="name"
          type="text"
          placeholder="* שם:"
          name="name"
          className="focus:outline-none bg-neutral-400 dark:placeholder:text-white placeholder:text-neutral-950 border-2 border-neutral-500 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <input
          autoComplete="tel"
          type="text"
          placeholder="* טלפון:"
          name="tel"
          className="focus:outline-none bg-neutral-400 dark:placeholder:text-white placeholder:text-neutral-950 border-2 border-neutral-500 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <input
          autoComplete="email"
          type="email"
          placeholder="* אימייל:"
          name="email"
          className="focus:outline-none bg-neutral-400 dark:placeholder:text-white placeholder:text-neutral-950 border-2 border-neutral-500 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {message && (
          <textarea
            placeholder="הודעה:"
            name="message"
            className="focus:outline-none bg-neutral-400 dark:placeholder:text-white placeholder:text-neutral-950 border-2 border-neutral-500 text-neutral-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        )}
        <button
          disabled={disableBtn}
          type="submit"
          className={cn(
            'focus:outline-none text-white bg-neutral-400 hover:bg-neutral-800 disabled:bg-neutral-200 hover:disabled:bg-neutral-200 disabled:cursor-not-allowed focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-sm px-8 py-2.5 dark:bg-neutral-500 dark:hover:bg-neutral-600 dark:focus:ring-neutral-800',
            { 'w-full': message, 'max-md:w-full': !message }
          )}>
          שלח
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
