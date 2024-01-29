import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUploadedImage, setMealForm } from "../addMealSlice";

function Uploader(): JSX.Element {
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectUploadedImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          dispatch(
            setMealForm({
              key: "image",
              value: {
                src: reader.result as string,
                fileInfo: {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                },
              },
            })
          );
        };

        reader.readAsDataURL(file);
      });
    },
    [image]
  );

  const handleRemove = () => {
    dispatch(setMealForm({ key: "image", value: undefined }));
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
