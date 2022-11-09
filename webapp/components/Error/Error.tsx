import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Error.module.css";
import images from "../../img";

//SMAFRT CONTRCAT IMPORT CONTEXT
import { TicketNFTContext } from "../../Context/TicketNFTContext";

export const Error = () => {
  const { error, setOpenError } = useContext(TicketNFTContext);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <Image
            alt="error"
            src={images.errorgif}
            width={200}
            height={200}
            objectFit="cover"
            className={Style.Error_box_info_img}
          />
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};
