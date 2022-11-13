import React, { useRef, useState } from "react";
import { Button } from "../Button/Button";
import { IConnection, IEventContext } from "../../Context";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Style from "./EventOwner.module.css";

const ListEventOwner = (props: Partial<IConnection & IEventContext>) => {
  const { approveEventManager, provider } = props;
  const modalContentRef = useRef(null);
  const [isModalOpen, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");

  const handleOnChangeInputAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(e.target.value);
  };

  const handleOnSubmit = (): void => {
    if (address == "") {
      alert("Please enter address");
      return;
    }
    if (!ethers.utils.isAddress(address)) {
      alert("Please enter valid address!");
      return;
    }
    approveEventManager!(provider!, address);
  };

  return (
    <div className={Style.eventOwner}>
      <div className={Style.eventOwner_container}>
        <div className={Style.eventOwner_container_heading}>
          <h1 className={Style.heading}>List all request event manager</h1>
          <Button
            btnName="Create"
            handleClick={() => setOpenModal(true)}
          ></Button>
        </div>
        <div className={Style.eventOwner_container_body}>Body</div>
      </div>
      {isModalOpen && (
        <div className={Style.modal}>
          <div ref={modalContentRef} className={Style.modal_content}>
            <div className={Style.modal_header}>
              <div className={Style.modal_header_title}>
                Approve Event Manager
              </div>
              <span
                className={Style.modal_header_icon}
                onClick={() => setOpenModal(false)}
              >
                X
              </span>
            </div>
            <div className={Style.modal_body}>
              <input
                className={Style.modal_body_input}
                type="text"
                placeholder="Enter address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChangeInputAddress(e)
                }
              ></input>
            </div>
            <div className={Style.modal__footer}>
              <Button
                btnName="Cancel"
                handleClick={() => setOpenModal(false)}
                classStyle={Style.btn_cancel}
              ></Button>
              <Button
                btnName="Submit"
                handleClick={() => handleOnSubmit()}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEventOwner;
