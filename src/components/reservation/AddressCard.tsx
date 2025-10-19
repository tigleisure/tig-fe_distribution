import InfoCard from '@components/all/InfoCard';
import { useState, useEffect } from 'react';
import { useGameReservationStore } from '@store/makeReservationInfo';

export default function AddressCard({ number = 2 }: { number?: number }) {
  // 전역 상태에서 배송 주소 가져오기
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  // 로컬 상태로 배송 주소 관리
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    gameReservationInfo.deliveryAddress || ''
  );

  // 전역 상태와 로컬 상태 동기화
  useEffect(() => {
    setDeliveryAddress(gameReservationInfo.deliveryAddress || '');
  }, [gameReservationInfo.deliveryAddress]);

  return (
    <section
      className={`w-full flex flex-col p-5 border-b border-grey2 gap-6 ${
        number === 1 ? 'mt-[68px]' : 'mt-5'
      }`}
    >
      <InfoCard number={number} content="배송받을 주소를 입력해주세요." />
      <input
        className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
        placeholder="주소를 입력해주세요."
        value={deliveryAddress}
        onChange={(e) => {
          setDeliveryAddress(e.target.value);
          setGameReservationInfo({
            ...gameReservationInfo,
            deliveryAddress: e.target.value,
          });
        }}
      />
    </section>
  );
}
