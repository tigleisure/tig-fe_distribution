import useReservationModal from '@store/modalStore';
import ReactModal from 'react-modal';
import WarningSVG from '@public/svg/warning.svg';
import FullButton from './FullButton';

interface ModalProps {
  size: 'sm' | 'lg';
  button1Content: string;
  button2Content?: string;
  title: string;
  subTitle?: string;
}

export default function Modal({
  size,
  button1Content,
  button2Content,
  title,
  subTitle,
}: ModalProps) {
  const isReservationModalOpen = useReservationModal(
    (state) => state.selectedIsReservationModalOpen
  );
  const setReservationModal = useReservationModal(
    (state) => state.setSelectedIsReservationModalOpen
  );

  const customModalStyles = getCustomModalStyles(size);

  return (
    <ReactModal
      isOpen={isReservationModalOpen}
      onRequestClose={() => setReservationModal(false)}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Pop up Message"
    >
      <WarningSVG />
      <div className="w-full flex flex-col gap-2 items-center">
        <p className="title3 text-grey5">{title}</p>
        {subTitle && <p className="body4">{subTitle}</p>}
      </div>
      <div className="flex gap-[10px] title3 w-full">
        {button2Content && (
          <FullButton
            bgColor="grey2"
            color="grey4"
            content={button2Content}
            size="md"
            className="shadow-myPageLogoutButton"
            onClick={() => setReservationModal(false)}
          />
        )}
        <FullButton
          bgColor="black"
          color="white"
          content={button1Content}
          size="md"
          onClick={() => setReservationModal(false)}
        />
      </div>
    </ReactModal>
  );
}

const getCustomModalStyles = (size: 'sm' | 'lg'): ReactModal.Styles => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100vh',
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
  },
  content: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    width: size === 'sm' ? '247px' : '296px',
    height: 'fit-content',
    zIndex: 150,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
});
