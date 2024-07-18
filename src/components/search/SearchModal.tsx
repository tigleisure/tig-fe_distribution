'use client';
import useSearchModal from '@store/searchModalStore';
import ReactModal from 'react-modal';
import Header from '@components/all/Header';
import SearchHeader from '@components/all/SearchHeader';
import SearchCloseSVG from '@public/svg/searchClose.svg';
import { SearchInput } from '@components/all/SearchInput';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSearchModalInput from '@store/searchModalInputStore';
import { useSearchInputInfo } from '@store/searchInfoStore';

const DUMMYRECENTSEARCH = ['신촌', '볼링', '탁구', '당구', '잠실'];

export default function SearchModal() {
  const [recentSearch, setRecentSearch] = useState(DUMMYRECENTSEARCH);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isModalOpen = useSearchModal(
    (state) => state.selectedIsSearchModalOpen
  );
  const setModal = useSearchModal(
    (state) => state.setSelectedIsSearchModalOpen
  );
  const inputValue = useSearchInputInfo((state) => state.searchInput);
  const setInputValue = useSearchInputInfo((state) => state.setSearchInput);

  const deleteHandler = (idx: number) => () => {
    setRecentSearch((prev) => prev.filter((_, i) => i !== idx));
  };

  const deleteAllHanler = () => {
    setRecentSearch([]);
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10); // 모달 렌더링이 끝난 이후 input창에 포커싱
    }
  }, [isModalOpen]);

  useEffect(() => {
    // 최근 검색어 get 요청
    setRecentSearch(DUMMYRECENTSEARCH);
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, searchValue: e.target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setModal(false);
    }
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      closeTimeoutMS={300}
      overlayClassName={{
        base: 'ReactModal__Overlay',
        afterOpen: 'ReactModal__Overlay--after-open',
        beforeClose: 'ReactModal__Overlay--before-close',
      }}
      id="searchModal"
      onRequestClose={() => setModal(false)}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Pop up Message"
    >
      <Header
        buttonType="close"
        isCenter={true}
        title="검색하기"
        isSearchModal
      />
      <div className="w-full pt-[68px] px-5">
        <SearchInput
          placeholder="위치나 장소 입력"
          value={inputValue.searchValue}
          onChange={inputHandler}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <p className="title4 text-grey7">최근검색</p>
        <p
          className="caption3 text-grey5 cursor-pointer"
          onClick={deleteAllHanler}
        >
          전체삭제
        </p>
      </div>
      {recentSearch.map((search, idx) => (
        <div
          key={idx + search}
          className="w-full flex justify-between items-center gap-[10px] px-5"
        >
          <p
            className="body2 cursor-pointer"
            onClick={() => {
              router.push(
                `/search/result?location=${search}&date=24.05.17&adultCount=5`
              );
            }}
          >
            {search}
          </p>
          <SearchCloseSVG
            className="cursor-pointer"
            onClick={deleteHandler(idx)}
          />
        </div>
      ))}
    </ReactModal>
  );
}
const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'white',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
    animation: 'fadeIn 0.3s',
  },
  content: {
    display: 'flex',
    padding: '0',
    gap: '20px',
    top: '0',
    inset: '0',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
    minWidth: '360px',
    maxWidth: '480px',
    height: '100dvh',
    zIndex: '202',
    position: 'fixed',
    backgroundColor: 'white',
    overflow: 'auto',
    border: 'none',
    boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.1)',
  },
};
