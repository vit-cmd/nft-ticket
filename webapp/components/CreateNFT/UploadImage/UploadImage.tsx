import React, {useState, useCallback, Component, useContext} from 'react';
import Image from 'next/image';
import {useDropzone} from 'react-dropzone';

//INTRNAL IMPORT
import Style from './UploadImage.module.css';
import images from '../../../img';

interface IUploadImage {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const UploadImage: React.FC<IUploadImage> = (props) => {
  const [url, setUrl] = useState<string>();

  const onDrop = useCallback(
    async (files: File[]) => {
      setUrl(URL.createObjectURL(files[0]));
      props.setFile(files[0]);
    },
    [props]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxSize: 5000000,
    accept: {'image/*': ['.jpeg', '.jpg', '.png']}
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          {/* <p>{title}</p> */}
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              className={Style.DropZone_box_input_img_img}
            />
          </div>
        </div>
      </div>

      {url && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={url} alt="nft image" width={200} height={200} />
          </div>
        </aside>
      )}
    </div>
  );
};
