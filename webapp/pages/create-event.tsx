import {Props} from 'next/script';
import React from 'react';
//INTERNAL IMPORT
import Style from '../styles/create-event.module.css';
import {CreateEvent as CreateEventNFT} from '../components';
import { ConnectionContext } from '../Context';

const CreateEvent: React.FC<Props> = () => {
  const {eventManager} = React.useContext(ConnectionContext);

  if (!eventManager) {
    return (
      <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>You do not have permission to access this page</h1>
        </div>
      </div>
    </div>
    );
  } 

  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New Event</h1>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <CreateEventNFT />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
