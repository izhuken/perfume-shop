'use client';

import { ReactNode, ReactPortal, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './lib';

export function useModal<PromiseType, T = unknown>(
  node: ReactNode,
  payload?: T
) {
  const [child, setChild] = useState<ReactPortal | null>(null);
  const [modalPromise, setModalPromise] = useState<Promise<PromiseType> | null>(
    null
  );

  return {
    toggle: () => {
      if (!child) {
        return setModalPromise(
          new Promise<PromiseType>((resolve, reject) => {
            const modalRoot = document.getElementById('modal-root')!;
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';

            const resolver = (
              value: PromiseType | PromiseLike<PromiseType>
            ) => {
              let body = document.getElementsByTagName('body')[0];
              body.style.overflow = 'auto';
              resolve(value);
            };
            const rejector = () => {
              setModalPromise(null);
              let body = document.getElementsByTagName('body')[0];
              body.style.overflow = 'auto';
              reject();
            };

            const portal = createPortal(
              <ModalContext.Provider
                value={{
                  resolve: resolver,
                  reject: rejector,
                  payload: payload,
                }}
              >
                {node}
              </ModalContext.Provider>,
              modalRoot
            );
            setChild(portal);
          }).finally(() => setChild(null))
        );
      }
    },
    child: child,
    modalPromise,
  };
}

export * from './lib';
