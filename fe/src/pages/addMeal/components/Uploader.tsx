import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export type PreConvertImage = {
  file: File;
  src: string;
};

function Uploader(): JSX.Element {
  const [images, setImages] = useState<PreConvertImage[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImages((prevImages) => [
            ...prevImages,
            { src: reader.result as string, file },
          ]);
        };

        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.src));
  }, [images]);

  const { getRootProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  console.log("images", images);
  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="custom-dropzone"
      >
        <p>Drag 'n' drop, or click to select.</p>
      </div>
      <aside className="custom-thumbsContainer">
        {images.map((image, i) => (
          <div key={i} className="custom-thumb">
            <div className="custom-thumbInner">
              <img src={image.src} className="custom-img-style" />
              <button onClick={() => handleRemove(i)}>x</button>
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}

export default Uploader;
