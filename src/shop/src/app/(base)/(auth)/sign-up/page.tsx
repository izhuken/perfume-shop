import { AuthStyle } from '@/shared';
import { SignUpForm } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация | Famous perfume',
  description: 'Магазин духов в Ростове (Ростове-на-Дону). Вход',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://perfume.labofdev.ru/sign-up',
    countryName: 'Россия',
    siteName: 'Famous perfume',
    title: 'Famous perfume',
    description: 'Сайт для продажи духов в Ростове (Ростове-на-Дону)',
    images: [
      {
        url: 'https://perfume.labofdev.ru/og-preview.png',
        width: 1300,
        height: 500,
        alt: 'Famous perfume духи',
      },
    ],
  },
};

export default async function Page() {
  return (
    <div className={AuthStyle.pageAuthLayout}>
      <SignUpForm />
    </div>
  );
}
