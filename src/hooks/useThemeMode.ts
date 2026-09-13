'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeMode() {
  const { resolvedTheme } = useTheme(); // returns 'light' | 'dark' | undefined
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  return currentTheme;
}
