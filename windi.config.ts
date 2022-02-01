import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin'

export default defineConfig({
	theme: {
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
			serif: ['Eczar', 'serif'],
		},
		colors: {
			black: 'black',
			white: 'white',
		}
	},
	plugins: [
		plugin(({ addUtilities }) => {
		  const newUtilities = {
			'.shadow-main': {
			  'box-shadow': '0 6px 8px rgba(52, 73, 94, 0.2), 0 1px 1px rgba(52, 73, 94, 0.1)',
			},
		  }
		  addUtilities(newUtilities)
		}),
	  ],
	shortcuts: {
		'typo-h1': 'font-serif text-37px md:text-45px !leading-[100%]',
		'typo-h2': 'font-serif text-21px md:text-24px !leading-[100%]',
		'typo-p1': 'font-sans text-16px md:text-18px !leading-[140%]',
		'typo-p2': 'font-sans text-12px md:text-14px !leading-[140%]'
	}
});
