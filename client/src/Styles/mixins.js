export const mixins = {
	flex: (dir = 'row', jc = 'flex-start', ai = 'stretch') => `
    display: flex;
    flex-direction: ${dir};
    justify-content: ${jc};
    align-items: ${ai};
  `,
	square: size => `
    height: ${size}px;
    width: ${size}px;
  `,
	center: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
	backgroundBorder: color => `
    background-color: ${color};
    border-color: ${color};
  `,
};
