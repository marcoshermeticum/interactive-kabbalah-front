'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
  { value: 'pt-BR', label: '🇧🇷 PT' },
  { value: 'en-US', label: '🇺🇸 EN' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => router.push(`/${e.target.value}`)}
      className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm cursor-pointer hover:bg-white/20 transition"
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
