const copyURL = (url, growl) => {
	navigator.clipboard.writeText(url).then(() => {
		growl.current.show({ severity: 'info', summary: 'Link Copied!' });
	});
};

export default copyURL;
