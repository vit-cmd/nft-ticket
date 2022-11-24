import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './NFTTabs.module.css';
import { IActivity } from '../../../constants/interfaces/ITicketActivity';

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((item: IActivity, i: number) => (
        <div className={Style.NFTTabs_box} key={i + 1}>
          <div className={Style.NFTTabs_box_info}>
            <span>Activity name: {item.activityType}</span>
            <br></br>
            <span>Price: {item.price} ETH</span>
            <br></br>
            <span>Date: {item.date}</span>
            <br></br>
            <span>From: {item.from}</span>
            <br></br>
            <span>To: {item.to}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
