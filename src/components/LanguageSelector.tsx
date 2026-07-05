'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
  { value: 'pt-BR', label: 'PT' },
  { value: 'en-US', label: 'EN' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => router.push(`/${e.target.value}`)}
      className="appearance-none bg-transparent text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-full px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/20"
      aria-label="Select Language"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value} className="bg-gray-900 text-white">
          {lang.label}
        </option>
      ))}
    </select>
  );
}
