export const DarkMode = {
	main: '#10171e',
	secondary: '#182430',
	accent: '#848484',
	darkAccent: '#E1E0E0',
	link: '#E1E0E0',
	text: '#d7dadc',
	accentText: '#878A8C',
	placeholder: '#898989',
	pink: '#dc758f',
	darkPink: '#ad546b',
	aqua: '#00ba96',
	darkAqua: '#009175',
	accentRed: '#D2909A',
	get fancyBorder() {
		return `border: 1px dashed ${this.accent}; box-shadow: 0 0 0 3px ${this.secondary},
		0 0 0 5px ${this.accent}, 0 0 0 10px ${this.secondary},
		0 0 2px 10px #eee;`;
	},
};
