import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const openUploadWidget = (options, callback) => {
	options.cloudName = process.env.REACT_APP_CLOUD_NAME;
	options.uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
	const scOptions = Util.withSnakeCaseKeys(options);
	console.log(scOptions);
	window.cloudinary.openUploadWidget(scOptions, callback);
};
