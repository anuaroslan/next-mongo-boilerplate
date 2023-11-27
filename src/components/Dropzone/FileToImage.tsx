import { Avatar, Group, Text } from "@mantine/core";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Dropzone } from "@mantine/dropzone";

interface FileToImageProps {
  onImageChange: (image: string | null) => void;
  defaultImage?: string | null;
}

const FileToImage: React.FC<FileToImageProps> = ({
  onImageChange,
  defaultImage,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    const file = files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImageSrc(dataUrl);
        onImageChange(dataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        styles={{
          root: {
            cursor: "pointer",
            padding: "10px",
            border: "solid 1px #585858",
            borderRadius: "10px",
            borderWidth: "0.5px",
          },
        }}
      >
        {/* Content to display inside the dropzone if needed */}
        <Group justify="center" my={20}>
          <Text>Drop your file here or click to select a file</Text>
          {imageSrc ? (
            <>
              <Avatar src={imageSrc} alt="Converted" size={"xl"} />
            </>
          ) : (
            <>
              {defaultImage && (
                <Avatar src={defaultImage} alt="Converted" size={"xl"} />
              )}
            </>
          )}
        </Group>
      </Dropzone>
    </div>
  );
};

export default FileToImage;

const CustomDropzone = styled.input``;
