import React from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './SliderCard.module.css';
import {Button} from '../../Button/Button';

const SliderCard = (props: {el: any; i: number}) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${props.el.hashImage}`}
            className={Style.sliderCard_box_img_img}
            alt="slider profile"
            width={500}
            height={300}
            objectFit="cover"
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>{props.el.name}</p>
          <div className={Style.sliderCard_box_title_like}>
            {/* <LikeProfile /> */}
            <small>
              {props.el.currentMintTickets} 0f {props.el.maxTicketCount}
            </small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current price</small>
            <p>{props.el.priceFactor} ETH</p>
          </div>
          <div className={Style.sliderCard_box_price_time}>
            <Button btnName="Buy" handleClick={() => {}} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;
