export const LightMode = {
	main: '#f5f8fa',
	secondary: '#fff',
	accent: '#ddd',
	darkAccent: '#848383',
	link: '#848383',
	text: '#222222',
	accentText: '#878A8C',
	placeholder: '#898989',
	pink: '#dc758f',
	darkPink: '#ad546b',
	aqua: '#00ba96',
	darkAqua: '#009175',
	accentRed: '#873D48',
	get fancyBorder() {
		return `border-radius: 4px; border: 1px dashed ${this.accent}; box-shadow: 0 0 0 3px ${this
			.secondary},
		0 0 0 5px ${this.accent}, 0 0 0 10px ${this.secondary},
		0 0 2px 10px #eee;`;
	},
};
