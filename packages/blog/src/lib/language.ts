import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/static/locales';
import { staticRouter } from '@/static/staticRouter';

export const localePrefix = undefined;
export const pathnames = {} as Record<string, string>;

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

export type AppPathnames = keyof typeof staticRouter;
