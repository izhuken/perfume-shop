import { CommonHeaderStyles } from '@/shared';
import React, { useEffect, useState } from 'react';
import { formatTimeString, getMonthName } from './lib';
interface HeaderCommon {
  title: string;
}

export const HeaderCommon: React.FC<HeaderCommon> = ({ title }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const hours = formatTimeString(currentDate.getHours().toLocaleString());
  const minutes = formatTimeString(currentDate.getMinutes().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <>
      <header className={CommonHeaderStyles.header}>
        <div className={CommonHeaderStyles.conteiner}>
          <h1 className={CommonHeaderStyles.title}>{title}</h1>
          <div className={CommonHeaderStyles.time}>
            <p>
              {hours}:{minutes}
            </p>
            <p>
              {currentDate.getDate()} {getMonthName(currentDate)}
            </p>
          </div>
        </div>
      </header>
    </>
  );
};
