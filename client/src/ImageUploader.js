import React, { useState } from 'react';

const ImageUploader = () => {
	const [base64Image, setBase64Image] = useState('');

	const isValidFileType = (file) => {
		return ['image/jpeg', 'image/png'].includes(file.type);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && isValidFileType(file)) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBase64Image(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			alert('Please select a valid image file (JPG or PNG).');
		}
	};

	const handleUpload = () => {
		if (base64Image) {
			// Logic to send the base64Image to the server
			console.log('Base64 Image:', base64Image);
			// postBase64Image(base64Image); // Example function call
		} else {
			alert('Please select an image first.');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center p-4">
			<input
				type="file"
				accept="image/jpeg, image/png"
				className="mb-2"
				onChange={handleFileChange}
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleUpload}
			>
				Upload
			</button>
		</div>
	);
};

export default ImageUploader;
