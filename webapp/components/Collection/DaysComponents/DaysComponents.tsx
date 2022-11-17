import React from 'react';
import Image from 'next/image';
import image from '../../../img';
import {MdVerified} from 'react-icons/md';

//INTERNAL IMPORT
import Style from './DaysComponents.module.css';
import images from '../../../img';

const DaysComponents = ({}) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={image.creatorbackground3}
            className={Style.daysComponent_box_img_img}
            alt="profile background"
            width={500}
            height={300}
            objectFit="covers"
          />
        </div>

        <div className={Style.daysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <p>
                Creator
                <span>
                  Shoaib Bhai
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{1 + 4}.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
