export function flex(dir = 'row', jc = 'flex-start', ai = 'stretch') {
	return `
    display: flex;
    flex-direction: ${dir};
    justify-content: ${jc};
    align-items: ${ai};
  `;
}
