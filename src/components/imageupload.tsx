import React, {useState} from "react";


const ImageUpload = () => {
    const [Images, setImages] = useState<File[]>([]);
    
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray);
        }
    }

    return (
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
            <label className="text-lg font-medium" >
                Upload Images 
            </label>
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageInput}
                className="block w-full" 
            />
        </div>
    )
}


export default ImageUpload