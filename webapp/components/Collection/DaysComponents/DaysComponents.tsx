import React from 'react';
import Image from 'next/image';
import image from '../../../img';
import {MdVerified} from 'react-icons/md';

//INTERNAL IMPORT
import Style from './DaysComponents.module.css';
import {ITicketType} from '../../../constants/interfaces';
import {Button} from '../../Button/Button';

const DaysComponents = (props: {ticketType: ITicketType; index: number}) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${props.ticketType.hashImage}`}
            className={Style.daysComponent_box_img_img}
            alt="profile background"
            width={500}
            height={300}
            objectFit="covers"
          />
        </div>

        <div className={Style.daysComponent_box_title}>
          <h2>{props.ticketType.name}</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Button btnName="Buy" handleClick={() => {}} />
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{props.ticketType.priceFactor} ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
