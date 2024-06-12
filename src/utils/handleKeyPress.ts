import React from 'react';

export const handleKeyPress = (e: React.KeyboardEvent, func: () => void) => {
  if (e.key === 'Enter') {
    func();
  }
};
