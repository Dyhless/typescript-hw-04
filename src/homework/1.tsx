import React, { ReactNode, useEffect, useRef } from 'react';

// Описуємо типи для пропсів 
interface Props {
  children: ReactNode; // Будь-який валідний реакт вузол 
  onContentEndVisible: () => void; // Функція без аргументів, яка повертає void 
}

export function Observer({ children, onContentEndVisible }: Props) {
  // Вказуємо правильний тип для useRef, у цьому випалку прсилання на HTMLDivElement або null
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Вказуємо правильний тип для options, IntersectionObserverInit
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
