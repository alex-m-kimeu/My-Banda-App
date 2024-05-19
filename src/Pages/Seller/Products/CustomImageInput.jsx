import React from 'react';

const CustomImageInput = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
        required
      />
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {images.map((image, index) => (
            <img key={index} src={image.url} alt="Preview" className="w-full h-64 object-cover" 
            style={{ height: '50px', width: '50px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomImageInput;
