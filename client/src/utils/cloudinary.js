import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const openUploadWidget = (options, callback) => {
	options.cloudName = process.env.REACT_APP_CLOUD_NAME;
	options.uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
	options.styles = {
		palette: {
			window: '#FFF',
			sourceBg: '#FFFFFF',
			windowBorder: '#90a0b3',
			tabIcon: '#00BA96',
			inactiveTabIcon: '#69778A',
			menuIcons: '#00BA96',
			link: '#DC758F',
			action: '#DC758F',
			inProgress: '#00BA96',
			complete: '#AD546B',
			error: '#c43737',
			textDark: '#000000',
			textLight: '#FFFFFF',
		},
		fonts: {
			"'Raleway', sans-serif": 'https://fonts.googleapis.com/css?family=Raleway',
		},
	};
	const scOptions = Util.withSnakeCaseKeys(options);
	console.log(scOptions);
	window.cloudinary.openUploadWidget(scOptions, callback);
};
