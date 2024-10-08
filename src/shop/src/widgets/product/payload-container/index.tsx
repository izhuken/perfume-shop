'use client';

import {
  cartActions,
  Perfume,
  PerfumeType,
  PerfumeVolume,
  StoredPerfume,
  User,
} from '@/entities';
import { createFavorite, useAppDispatch } from '@/features';
import { BaseStyle, DefaultButton, lora, ProductStyle } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImageContainer, VolumePoints } from './ui';

interface PayloadContainerProps {
  perfume: Perfume;
  perfumeType: PerfumeType;
  user?: User | null;
}

export const PayloadContainer = ({
  user,
  perfume,
  perfumeType,
}: PayloadContainerProps) => {
  const [currentVolume, setCurrentVolume] = useState<PerfumeVolume>(
    perfume.perfume_volume[0]
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <article className={ProductStyle.productPayloadContainer}>
      <ImageContainer
        images={perfume.file.map(({ url }) => ({ link: url }))}
        description={perfume.description}
      />
      <section className={ProductStyle.productTextContainer}>
        <p
          style={{
            color: 'var(--gray-blur)',
          }}
        >
          {perfumeType.name}
          <span
            style={{
              marginLeft: 20,
              display: user?.is_admin ? 'inline' : 'none',
            }}
          >
            <Link
              href={`/products/${perfume.id}/edit`}
              className={BaseStyle.pointer}
            >
              <Image src='/edit.svg' alt='edit' width={16} height={16} />
            </Link>
          </span>
        </p>
        <div className={clsx(ProductStyle.title, lora.className)}>
          {perfume.name}
        </div>
        <div style={{ fontSize: 14, marginBottom: 10 }}>{perfume.aroma}</div>
        <p style={{ marginBottom: 20 }}>{currentVolume.cost} $</p>
        <p>Объем, ml</p>
        <VolumePoints
          volumes={perfume.perfume_volume}
          currentVolume={currentVolume}
          setCurrentVolume={setCurrentVolume}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DefaultButton
            onClick={() => {
              const storedPerfume: StoredPerfume = {
                perfume: perfume,
                quantity: 1,
                volume: currentVolume,
              };
              toast.success('Товар добавлен в корзину');
              dispatch(cartActions.append(storedPerfume));
            }}
          >
            В корзину
          </DefaultButton>
          <Image
            src={'/favorite.svg'}
            alt='Любимое'
            height={24}
            width={24}
            className={BaseStyle.pointer}
            onClick={() => createFavorite(perfume.id, router)}
          />
        </div>
      </section>
    </article>
  );
};

export { ImageContainerMobile, PayloadMobile } from './ui';
