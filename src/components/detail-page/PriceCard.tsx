import {
  BallingPrice,
  BaseballPrice,
  GolfPrice,
  PricesInfo,
  SoccerPrice,
  SquashPrice,
  TennisPrice,
} from '@apis/reservation/getClubResInfo';
import { getProgramDescription } from '@utils/programName';
import InfoSvg from '@public/svg/mypage/info.svg';
import ArrowSvg from '@public/svg/mypage/arrow.svg';
import { formatDate } from 'date-fns';
import { useState, useEffect } from 'react';

interface PriceItem {
  description: string;
  price: number;
}

export default function PriceCard({
  prices,
  category,
  date,
}: {
  prices: PricesInfo;
  category: string;
  date: string;
}) {
  const [priceList, setPriceList] = useState<PriceItem[]>([]);

  useEffect(() => {
    // 패키지 상세: 운영시간 없이 모든 가격 노출
    if (
      Array.isArray(prices) &&
      prices.length > 0 &&
      typeof (prices as any[])[0]?.programName === 'string' &&
      (prices as any[]).every((p) => (p as any).duration === -1)
    ) {
      const updated: PriceItem[] = (prices as any[]).map((p) => ({
        description: String((p as any).programName),
        price: Number((p as any).price) || 0,
      }));
      setPriceList(updated);
      return;
    }

    if (category === 'BALLING') {
      const ballingPrices = prices as BallingPrice[];
      const todayBallingPrices = ballingPrices.filter(
        (price) =>
          price.dayOfWeek === formatDate(new Date(date), 'EEE').toUpperCase()
      );
      const updatedPriceList: PriceItem[] = todayBallingPrices.map((price) => {
        return {
          description: `${
            price.dayOfWeek === 'SAT' || price.dayOfWeek === 'SUN'
              ? '주말'
              : '평일'
          }(${price.startTime.slice(0, 5)} ~ ${price.endTime.slice(
            0,
            5
          )}) ${getProgramDescription(price.programName)}`,
          price: price.price,
        };
      });
      setPriceList(updatedPriceList);
    } else if (category === 'GOLF') {
      const golfPrices = prices as GolfPrice[];
      const todayGolfPrices = golfPrices.filter(
        (price) =>
          price.dayOfWeek === formatDate(new Date(date), 'EEE').toUpperCase()
      );
      const updatedPriceList: PriceItem[] = todayGolfPrices.map((price) => {
        if (price.duration === -1) {
          return {
            description: `${
              price.dayOfWeek === 'SAT' || price.dayOfWeek === 'SUN'
                ? '주말'
                : '평일'
            }(${price.startTime.slice(0, 5)} ~ ${price.endTime.slice(0, 5)}) ${
              price.holes
            }홀`,
            price: price.price,
          };
        } else {
          return {
            description: `${
              price.dayOfWeek === 'SAT' || price.dayOfWeek === 'SUN'
                ? '주말'
                : '평일'
            }(${price.startTime.slice(0, 5)} ~ ${price.endTime.slice(0, 5)}) ${
              price.duration
            }분`,
            price: price.price,
          };
        }
      });
      setPriceList(updatedPriceList);
    } else if (category === 'BASEBALL') {
      const todayBaseballPrices = prices as BaseballPrice[];
      const updatedPriceList: PriceItem[] = todayBaseballPrices.map((price) => {
        if (price.duration === -1) {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.inning
            }이닝`,
            price: price.price,
          };
        } else {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.duration
            }분`,
            price: price.price,
          };
        }
      });
      setPriceList(updatedPriceList);
    } else if (
      category === 'FOOTBALL' ||
      category === 'BILLIARDS' ||
      category === 'TABLE_TENNIS'
    ) {
      const todayFootballPrices = prices as SoccerPrice[];
      const updatedPriceList: PriceItem[] = todayFootballPrices.map((price) => {
        if (price.duration === -1) {
          return {
            description: `${getProgramDescription(price.programName)}`,
            price: price.price,
          };
        }
        return {
          description: `${getProgramDescription(price.programName)} ${
            price.duration
          }분`,
          price: price.price,
        };
      });
      setPriceList(updatedPriceList);
    } else if (category === 'SQUASH') {
      const todaySquashPrices = prices as SquashPrice[];
      const updatedPriceList: PriceItem[] = todaySquashPrices.map((price) => {
        if (price.duration === -1) {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.lessonCount
            }회`,
            price: price.price,
          };
        } else {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.duration
            }분`,
            price: price.price,
          };
        }
      });
      setPriceList(updatedPriceList);
    } else if (category === 'TENNIS') {
      const tennisPrices = prices as TennisPrice[];
      const todayTennisPrices = tennisPrices.filter(
        (price) =>
          price.dayOfWeek === formatDate(new Date(date), 'EEE').toUpperCase()
      );
      const updatedPriceList: PriceItem[] = todayTennisPrices.map((price) => {
        if (price.duration === -1) {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.countPerWeek
            }회`,
            price: price.price,
          };
        } else {
          return {
            description: `${getProgramDescription(price.programName)} ${
              price.duration
            }분`,
            price: price.price,
          };
        }
      });
      setPriceList(updatedPriceList);
    }
  }, [prices, category, date]);

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="w-full bg-[#FFFBF2]/50 flex flex-col px-3 py-5 gap-5 rounded-[14px]">
      <div className="w-full gap-2 flex relative">
        <p className="title3 text-grey7">가격표</p>
        {category === 'BILLIARDS' && (
          <p
            className="self-end cursor-pointer"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            <InfoSvg className="relative top-[-1px]" />
          </p>
        )}
        {isHover && category === 'BILLIARDS' && (
          <div className="absolute z-[100] top-[20px] flex flex-col">
            <ArrowSvg className="ml-[46px]" />
            <div className="relative top-[-1px] rounded-[12px] bg-grey6 text-white flex flex-col justify-between h-[76px] px-[10px] py-1">
              <p className="title4">
                중대와 대대는 당구대 크기 차이로 나뉘어요!
              </p>
              <p className="title4">
                중대 : 2.540mm X 1.270mm
                <br />
                대대 : 2.844mm X 1.4222mm
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-[6px]">
        {priceList.map((price, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center w-full h-6"
          >
            <p className="body2 text-grey6">{price.description}</p>
            <p className="title3 text-[#D39200]">
              {price.price.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
