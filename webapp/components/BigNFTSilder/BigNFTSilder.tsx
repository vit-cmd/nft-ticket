import React, {useState, useCallback, useContext} from 'react';
import Image from 'next/image';
import {AiFillFire, AiFillHeart} from 'react-icons/ai';
import {BiDetail} from 'react-icons/bi';
import {MdVerified, MdTimer} from 'react-icons/md';
import {TbArrowBigLeftLines, TbArrowBigRightLine} from 'react-icons/tb';

//INTERNAL IMPORT
import Style from './BigNFTSilder.module.css';
import images from '../../img';
import {Button, LoadingSpinner} from '../../components';
import {GraphQLContext} from '../../Context';
import {IEvent} from '../../constants/interfaces';
import {now} from 'moment';

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export const BigNFTSilder = () => {
  const [idNumber, setIdNumber] = useState(0);
  const [data, setData] = useState<IEvent[]>();
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const {getEvents} = useContext(GraphQLContext);

  React.useEffect(() => {
    const getData = async () => {
      const tempore = await getEvents();
      setData(tempore);
    };
    getData();
  }, [getEvents]);

  //-------INC
  const inc = useCallback(() => {
    if (!data) return;
    if (idNumber + 1 < data.length) {
      setIdNumber(idNumber + 1);
    }
  }, [data, idNumber]);

  React.useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        const _countDown = data[idNumber].endDay * 1000 - now();
        setDay(Math.floor(_countDown / (1000 * 60 * 60 * 24)));
        setHour(Math.floor((_countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinute(Math.floor((_countDown % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((_countDown % (1000 * 60)) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  if (!data || data.length === 0) return <div></div>;
  else {
    return (
      <div className={Style.bigNFTSlider}>
        <div className={Style.bigNFTSlider_box}>
          <div className={Style.bigNFTSlider_box_left}>
            <h2>{data[idNumber].name}</h2>
            <div className={Style.bigNFTSlider_box_left_creator}>
              <div className={Style.bigNFTSlider_box_left_creator_profile}>
                <Image
                  className={Style.bigNFTSlider_box_left_creator_profile_img}
                  src={images.nft_1}
                  alt="profile image"
                  width={50}
                  height={50}
                />
                <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                  <p>Creator</p>
                  <h4>
                    {data[idNumber].eventManager}{' '}
                    <span>
                      <MdVerified />
                    </span>
                  </h4>
                </div>
              </div>

              <div className={Style.bigNFTSlider_box_left_creator_collection}>
                <span className={Style.bigNFTSlider_box_left_creator_collection_icon}>
                  <AiFillFire />
                </span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_bidding}>
              <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                <span className={Style.bigNFTSlider_box_left_bidding_box_icon}>
                  <MdTimer />
                </span>
                <span>Event end time</span>
              </p>

              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p>{day}</p>
                  <span>Days</span>
                </div>

                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p>{hour}</p>
                  <span>Hours</span>
                </div>

                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p>{minute}</p>
                  <span>mins</span>
                </div>

                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p>{seconds}</p>
                  <span>secs</span>
                </div>
              </div>

              <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                <span className={Style.bigNFTSlider_box_left_bidding_box_icon}>
                  <BiDetail />
                </span>
                <span>Description</span>
              </p>
              <p>{data[idNumber].description}</p>

              <div className={Style.bigNFTSlider_box_left_button}>
                <Button btnName="Place" handleClick={() => {}} />
                <Button btnName="View" handleClick={() => {}} />
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_sliderBtn}>
              <span className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={() => dec()}>
                <TbArrowBigLeftLines />
              </span>
              <span className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={() => inc()}>
                <TbArrowBigRightLine />
              </span>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_right}>
            <div className={Style.bigNFTSlider_box_right_box}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${data[idNumber].hashImage}`}
                alt="Event IMAGE"
                width={860}
                height={860}
                className={Style.bigNFTSlider_box_right_box_img}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
