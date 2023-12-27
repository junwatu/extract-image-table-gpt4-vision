import { useState } from 'react';

const ImageUploader = () => {
	const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    const isValidFileType = (file) => {
        return ['image/jpeg', 'image/png'].includes(file.type);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidFileType(file)) {
            setFileName(file.name); 
            setSelectedFile(file); 
        } else {
            alert('Please select a valid image file (JPG or PNG).');
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile); 

            try {
                const response = await fetch('/process-image', {
                    method: 'POST',
                    body: formData, 
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle the successful response here
				console.log(response)
            } catch (error) {
                console.error('Error posting image:', error);
            }
        } else {
            alert('Please select an image first.');
        }
    };

	return (
		<div className="flex flex-col items-center justify-center p-4 space-y-4">
			<label className="w-64 flex flex-col items-center px-4 py-2 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-500">
				<svg className="w-8 h-8 hover:opacity-50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					{/* Insert your SVG icon path here */}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
					</svg>

				</svg>
				<span className="mt-2 text-base leading-normal overflow-hidden text-ellipsis whitespace-nowrap">{fileName}</span>

				<input type='file' className="hidden" accept="image/jpeg, image/png" onChange={handleFileChange} name="image"/>
			</label>
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
