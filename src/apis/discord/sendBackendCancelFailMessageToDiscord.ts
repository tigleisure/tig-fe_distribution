const handleSendTigCancelFailToDiscord = async (
  reservationId: number,
  paymentId: string
) => {
  try {
    const discordMessage = {
      username: 'tig 백엔드 예약 취소 실패 알림',
      content:
        '포트원 결제 취소는 성공했지만 TIG 백엔드에서의 예약 취소 실패로 인한 알림입니다!',
      embeds: [
        {
          description: `백엔드에서의 예약 취소 실패입니다. 예약 번호는 ${reservationId}이며, 포트원 결제 id는 ${paymentId}입니다.`,
        },
      ],
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DISCORD_CANCELLATION_FAIL_URL}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default handleSendTigCancelFailToDiscord;
