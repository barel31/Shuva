'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

function AccordionItem({ qa }: { qa: QAndA }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const panel = e.currentTarget.nextElementSibling! as HTMLElement;
    setOpen(() => !open);

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  };

  return (
    <div>
      <button
        className={cn(
          'dark:text-neutral-300 p-5 w-full transition-all duration-[400ms] dark:bg-neutral-600 hover:bg-neutral-500',
          { 'bg-neutral-400 dark:!bg-neutral-500': open, 'bg-neutral-300': !open }
        )}
        onClick={handleClick}
        type="button"
        title={qa.question}>
        {qa.question}
      </button>
      <div className="dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700 max-h-0 px-5 overflow-hidden transition-all duration-200 ease-out">
        <p>{qa.answer}</p>
      </div>
    </div>
  );
}

export default AccordionItem;
