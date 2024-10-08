import { User } from '@/entities';
import { checkAuthServer, perfumeAPIBuild } from '@/features';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProductsDesktop } from './(desktop)';
import { ProductMobile } from './(mobile)';

interface ProductRetrieveParams {
  id: string;
}

interface ProductRetrieveProps {
  params: ProductRetrieveParams;
}

export const metadata: Metadata = {
  title: 'Духи в Ростове-на-Дону | Famous perfume',
  description: 'Магазин духов в Ростове (Ростове-на-Дону). Вход',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://perfume.labofdev.ru/sign-in',
    countryName: 'Россия',
    siteName: 'Famous perfume',
    title: 'Famous perfume',
    description: 'Сайт для продажи духов в Ростове (Ростове-на-Дону)',
  },
};

export default async function ProductRetrievePage({
  params: { id },
}: ProductRetrieveProps) {
  const cook = cookies();
  let user: User | null = null;
  const perfumeAPI = perfumeAPIBuild.serverApi();

  const { data } = await perfumeAPI
    .fetchByID(id)
    .catch(() => redirect('/not-found'));

  const authPayload = await checkAuthServer(
    cook.get('access')?.value,
    cook.get('refresh')?.value
  );

  if (typeof authPayload === 'string') {
    user = (await checkAuthServer(authPayload)) as User;
  }

  if (typeof authPayload === 'object') {
    user = authPayload;
  }

  return (
    <>
      <ProductsDesktop user={user} perfume={data} />
      <ProductMobile perfume={data} />
    </>
  );
}
