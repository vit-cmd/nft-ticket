import React, { useState } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ITicketWithRelation } from '../../../constants/interfaces';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './NFTDetailsImg.module.css';
import images from '../../../img';

const NFTDetailsImg = (props: any) => {
  const nft: ITicketWithRelation = props.nft;
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const openDescription = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <span className={Style.NFTDetailsImg_box_NFT_like_icon}>
              <BsImages />
            </span>
            <p onClick={() => likeNFT()}>
              {like ? (
                <span className={Style.NFTDetailsImg_box_NFT_like_icon}>
                  <AiOutlineHeart />
                </span>
              ) : (
                <span className={Style.NFTDetailsImg_box_NFT_like_icon}>
                  <AiFillHeart />
                </span>
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={'/../../image/nft_1.png'}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.ticketType.description}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              <small>Contract Address: </small>
              {process.env.NEXT_PUBLIC_TICKET_CONTRACT}
            </p>
            <p>
              <small>Token ID: </small>
              {nft.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
