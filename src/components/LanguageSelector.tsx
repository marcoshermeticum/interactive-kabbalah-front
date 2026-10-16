'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useNavigationLoading } from '@/components/NavigationLoading';

const languages = [
  { value: 'pt-BR', label: 'PT', flag: '🇧🇷' },
  { value: 'en-US', label: 'EN', flag: '🇺🇸' },
  { value: 'ja', label: 'JA', flag: '🇯🇵' },
  { value: 'he', label: 'HE', flag: '🇮🇱' },
] as const;

export default function LanguageSelector({ variant = 'overlay' }: { variant?: 'overlay' | 'token' }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const ui = useTranslations('ui');
  const showLoading = useNavigationLoading();
  const isToken = variant === 'token';

  return (
    <select
      value={locale}
      onChange={(e) => {
        const nextLocale = e.target.value;
        if (nextLocale === locale) return;
        showLoading();
        router.replace(pathname, { locale: nextLocale });
      }}
      className={`appearance-none bg-transparent rounded-full px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-all duration-200 focus:outline-none ${
        isToken
          ? 'language-selector-token border'
          : 'text-white/50 hover:text-white border border-white/10 hover:border-white/20 focus:ring-1 focus:ring-white/20'
      }`}
      style={isToken ? { color: 'var(--text-muted)', borderColor: 'var(--border)' } : undefined}
      aria-label={ui('language')}
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value} className="bg-gray-900 text-white">
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}
