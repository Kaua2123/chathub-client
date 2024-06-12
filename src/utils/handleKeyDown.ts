import React from 'react';

export const handleKeyDown = (e: React.KeyboardEvent, func: () => void) => {
  if (e.key === 'Enter') {
    func();
  }
};
