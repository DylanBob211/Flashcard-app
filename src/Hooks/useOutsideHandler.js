import { useEffect } from 'react';

export default function useClickOutside(ref, func) {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      func();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
