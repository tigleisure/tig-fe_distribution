import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_orange0: '#CC4D02',
        primary_orange1: '#FF6B00',
        primary_orange2: '#FFF0D3',
        secondary_green1: '#30FF6B',
        secondary_green2: '#D5FFE2',
        white: '#FFFFFF',
        grey1: '#F8F9FA',
        grey2: '#F5F6F7',
        grey3: '#CED3D6',
        grey4: '#A9AFB3',
        grey5: '#878D91',
        grey6: '#4D5256',
        grey7: '#292A2B',
        status_red1: '#F45858',
        black: '#000000',
      },
      width: {
        loginWidth: 'calc(100% * (8/9))',
        mypageWidth: 'calc(100% * (8/9))',
        eightNineWidth: 'calc(100% * (8/9))',
        sevenEightWidth: 'calc(100% * (7/8))',
        gameCardWidth: 'calc((100% - 50px) / 4)',
      },
      maxHeight: {
        wishListMain: 'calc(100% - 151px)',
        reservationListMain: 'calc(100% - 148px)',
      },
      minHeight: {},
      boxShadow: {
        mypageButton: '0 0 0 1px #292A2B inset',
        myPageLogoutButton: '0 0 0 1px #A9AFB3 inset',
        cancelButton: '0 0 0 1px #F45858 inset',
        watchReviewButton: '0 0 0 1px #878D91 inset',
        absoluteButton: '0 5px 20px rgba(0, 0, 0, 0.1)',
        filter: '0 0 30px rgba(0, 0, 0, 0.1)',
        writingReviewInput: '0 0 0 1px #CED3D6 inset',
        paymentSelection: '0 0 0  1px #000000 inset',
        locationButton: '0 5px 20px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        resultTab: '440px',
      },
      padding: {
        footerHorizontal: 'calc(100% * (1/18))',
      },
    },
  },
  plugins: [],
};
export default config;
