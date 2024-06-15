import React from 'react';

export function handleKeyDown(e: React.KeyboardEvent, func: () => void) {
  if (e.key === 'Enter') {
    func();
  }
}
