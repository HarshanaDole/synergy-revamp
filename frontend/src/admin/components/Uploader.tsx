import { useEffect, useRef, useState } from "react";
import "../css/uploader.css";
import { RiImageAddFill } from "react-icons/ri";
import { FaFileImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { API_BASE_URL } from "../../network/config";

interface UploaderProps {
  onImageChange: (file: File | null) => void;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  image: File | null;
  setDefaultImage: React.Dispatch<React.SetStateAction<string | null>>;
  defaultImage?: string | null;
  showError: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
  onImageChange,
  setImage,
  image,
  defaultImage,
  setDefaultImage,
  showError,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFileName(file.name);
      setImage(file);
      onImageChange(file);
    }
  };

  const removeImage = () => {
    setFileName("No image selected");
    setImage(null);
    setDefaultImage(null);
    onImageChange(null);
  };

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  const getImageFileName = (imageUrl: string): string => {
    const startIndex = imageUrl.lastIndexOf("\\");
    return imageUrl.substring(startIndex + 1);
  };

  useEffect(() => {
    if (image) {
      setFileName(image.name);
    } else if (defaultImage) {
      setFileName(getImageFileName(defaultImage));
    } else {
      setFileName("No image selected");
    }
  }, [image, defaultImage]);

  return (
    <div className="uploader-container">
      <button
        type="button"
        className={`uploader ${showError ? "uploader-error" : ""}`}
        onClick={handleFileClick}
      >
        <input
          type="file"
          accept="image/*"
          name="imageUrl"
          className="input-image"
          ref={inputFileRef}
          hidden
          onChange={handleFileChange}
        />
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt={fileName}
            className="uploaded-image"
          />
        ) : defaultImage ? (
          <img
            src={formatImageUrl(defaultImage)}
            alt={fileName}
            className="uploaded-image"
          />
        ) : (
          <>
            <RiImageAddFill className="image-icon" />
            <p>
              Upload an image <span className="required">*</span>
            </p>
          </>
        )}
      </button>
      <div className="uploaded-row">
        <div className="uploaded-content">
          <FaFileImage />
          <div className="uploaded-filename">{fileName}</div>
        </div>
        {(image || defaultImage) && (
          <MdDelete className="delete-icon" onClick={removeImage} />
        )}
        {showError && <p className="image-error-message">Image is Required</p>}
      </div>
    </div>
  );
};

export default Uploader;
