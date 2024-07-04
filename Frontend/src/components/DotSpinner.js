import React from 'react';

const DotSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="dot-spinner animate-bounce bg-blue-500 h-4 w-4 rounded-full"></div>
      <div className="dot-spinner animate-bounce bg-blue-500 h-4 w-4 rounded-full animation-delay-200"></div>
      <div className="dot-spinner animate-bounce bg-blue-500 h-4 w-4 rounded-full animation-delay-400"></div>
      <div className="dot-spinner animate-bounce bg-blue-500 h-4 w-4 rounded-full animation-delay-400"></div>
    </div>
  );
};

export default DotSpinner;
