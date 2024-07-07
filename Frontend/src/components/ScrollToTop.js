import React, { useState, useEffect } from 'react';
import { BiUpArrowAlt } from "react-icons/bi";
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-[10%] right-[70px] bg-skin-light text-black p-4 rounded-full transition-opacity ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
      style={{ outline: 'none' }}
    >
      <BiUpArrowAlt className='text-5xl' />
    </button>
  );
};

export default ScrollToTop;
