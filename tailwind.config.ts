import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		width: {
  			loginWidth: 'calc(100% * (8/9))',
  			mypageWidth: 'calc(100% * (8/9))',
  			eightNineWidth: 'calc(100% * (8/9))',
  			sevenEightWidth: 'calc(100% * (7/8))',
  			gameCardWidth: 'calc((100% - 50px) / 4)'
  		},
  		maxHeight: {
  			wishListMain: 'calc(100% - 151px)',
  			reservationListMain: 'calc(100% - 148px)'
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
  			mainShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
  		},
  		screens: {
  			resultTab: '440px'
  		},
  		padding: {
  			footerHorizontal: 'calc(100% * (1/18))'
  		},
  		translate: {
  			'-300': '-300%'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
