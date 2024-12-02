'use client';

import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import Flag from 'react-world-flags';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface LanguageSelectProps {}

const LanguageSelector: React.FC<LanguageSelectProps> = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLocale = event.target.value as string;
    router.push(`/${selectedLocale}`);
  };

  const languages = [
    {
      value: 'pt-BR',
      code: 'BR',
      alt: 'Português',
    },
    {
      value: 'en-US',
      code: 'US',
      alt: 'English',
    },
  ];

  return (
    <FormControl variant="outlined" size="small">
      <Select
        value={locale} // Idioma atual
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Language' }}
        style={{ width: 70 }}
      >
        {languages.map((lang, index) => (
          <MenuItem value={lang.value} key={lang.alt + index}>
            <Flag code={lang.code} alt={lang.alt} width={24} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
