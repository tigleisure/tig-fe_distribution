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
      },
    },
  },
  plugins: [],
};
export default config;
