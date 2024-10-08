import { perfumeAPIBuild } from '@/features';
import { ProductList, ProductsHeader } from '@/widgets';
import { Metadata } from 'next';

interface Params {
  [key: string]: string;
}

interface ProductProps {
  searchParams: Params;
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

export default async function ProductPage({ searchParams }: ProductProps) {
  const perfumeApi = perfumeAPIBuild.serverApi();
  const payload = await perfumeApi
    .fetchAll({ params: { ...searchParams } })
    .catch(() => null);

  return (
    <>
      <ProductsHeader />
      <ProductList products={payload?.data.data} />
    </>
  );
}
