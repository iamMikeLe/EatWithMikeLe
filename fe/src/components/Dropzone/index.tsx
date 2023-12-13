import { useEffect, useRef } from "react";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

// Custom styles for the MDDropzone
import DropzoneRoot from "components/Dropzone/DropzoneRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Declaring props types for MDDropzone
interface Props {
  options: {
    [key: string | number]: any;
  };
}

function CustomDropzone({ options }: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <DropzoneRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <Box className="fallback" bgColor="transparent">
        <input name="file" type="file" multiple />
      </Box>
    </DropzoneRoot>
  );
}

export default CustomDropzone;
