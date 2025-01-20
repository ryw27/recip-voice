import React, {useState} from "react";
import Image from 'next/image';

const ImageUpload = () => {
    const [images, setImages] = useState<File[]>([]);
    
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
            {images.length > 0 && (
                <div className="mt-4">
                    <div className="text-sm font-medium">
                        Selected images:
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-2">
                        {images.map((image,index) => (
                            <div key={index} className="w-24 h-24 rounded-md">
                                <Image 
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


export default ImageUpload