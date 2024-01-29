import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export type PreConvertImage = {
  file: File;
  src: string;
};

function Uploader(): JSX.Element {
  const [image, setImage] = useState<PreConvertImage>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImage({ src: reader.result as string, file });
        };

        reader.readAsDataURL(file);
      });
    },
    [image]
  );

  const handleRemove = () => {
    setImage(undefined);
  };

  const { getRootProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  console.log("image", image);
  return (
    <>
      {!image && (
        <div
          {...getRootProps({ className: "dropzone" })}
          className="custom-dropzone"
        >
          <p>Choose a cover picture</p>
        </div>
      )}

      {image && (
        <aside className="custom-thumbsContainer">
          <div className="custom-thumb">
            <div className="custom-thumbInner">
              <img src={image.src} className="custom-img-style" />
              <button onClick={handleRemove}>x</button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default Uploader;
