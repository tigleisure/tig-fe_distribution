'use client';
import useModal from '@store/modalStore';
import ReactModal from 'react-modal';
import WarningSVG from '@public/svg/warning.svg';
import FullButton from './FullButton';

interface ModalProps {
  size: 'sm' | 'lg';
  button1Content?: string;
  button2Content?: string;
  title: string;
  subTitle?: string;
  secondButtonFunc?: () => void;
}

export default function Modal({
  size,
  button1Content,
  button2Content,
  title,
  subTitle,
  secondButtonFunc,
}: ModalProps) {
  const isModalOpen = useModal((state) => state.selectedIsModalOpen);
  const setModal = useModal((state) => state.setSelectedIsModalOpen);

  const customModalStyles = getCustomModalStyles(size);

  return (
    <ReactModal
      isOpen={isModalOpen}
      overlayClassName={{
        base: 'Modal__Overlay',
        afterOpen: 'Modal__Overlay--after-open',
        beforeClose: 'Modal__Overlay--before-close',
      }}
      closeTimeoutMS={300}
      onRequestClose={() => setModal(false)}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Pop up Message"
    >
      <WarningSVG />
      <div className="w-full flex flex-col gap-2 items-center">
        <p className="title3">{title}</p>
        {subTitle && <p className="body4 text-grey5">{subTitle}</p>}
      </div>
      <div className="flex gap-[10px] title3 w-full">
        {button1Content && (
          <FullButton
            bgColor="grey2"
            color="grey4"
            content={button1Content}
            size="md"
            className="shadow-myPageLogoutButton"
            onClick={() => setModal(false)}
          />
        )}
        {button2Content && (
          <FullButton
            bgColor="black"
            color="white"
            content={button2Content}
            size="md"
            onClick={() => (secondButtonFunc ? secondButtonFunc() : null)}
          />
        )}
      </div>
    </ReactModal>
  );
}

const getCustomModalStyles = (size: 'sm' | 'lg'): ReactModal.Styles => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100vh',
    zIndex: 500,
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
    zIndex: 202,
    position: 'absolute',
    top: '50dvh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
});
