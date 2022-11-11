import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../Button/Button";

//INTERNAL IMPORT
import Style from "./EventOwner.module.css";

const ListEventOwner = () => {
  const router = useRouter();
  const modalContentRef = useRef(null);
  const [isModalOpen, setOpenModal] = useState(false);

  useEffect(() => {
    // const hanldeCloseModal = (e) => {
    //   console.log(modalContentRef.current);
    //   if (
    //     modalContentRef.current &&
    //     !modalContentRef.current.contains(e.target)
    //   ) {
    //     console.log("a");
    //     setOpenModal(false);
    //   }
    // };
    // // Bind the event listener
    // document.addEventListener("click", hanldeCloseModal);
    // console.log("effect");
    // return () => {
    //   // Unbind the event listener on clean up
    //   document.removeEventListener("click", hanldeCloseModal);
    // };
  }, [isModalOpen]);

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
                handleClick={() => console.log("OKE")}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEventOwner;
