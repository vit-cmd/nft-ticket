import React from 'react';

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from '.';
import Style from './NFTDetails.module.css';

const NFTDetails = (props: any) => {
  const { nft } = props;
  return (
    <div className={Style.TicketDetails}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetails;
