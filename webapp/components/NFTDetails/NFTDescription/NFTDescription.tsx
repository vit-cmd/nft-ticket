import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ethers } from 'ethers';
import { Modal } from '../../Modal/Modal';
import {
  MdVerified,
  MdCloudUpload,
  MdReportProblem,
  MdSell,
  MdCancelScheduleSend,
} from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaWallet, FaPercentage } from 'react-icons/fa';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti';
import { BiTransferAlt, BiDollar } from 'react-icons/bi';
import { AiFillWarning } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';

//INTERNAL IMPORT
import Style from './NFTDescription.module.css';
import images from '../../../img';
import { Button } from '../../../components/Button/Button';
import { NFTTabs } from '..';

//IMPORT SMART CONTRACT
import { ConnectionContext } from '../../../Context';
import { ITicketWithRelation } from '../../../constants/interfaces';
import { TicketContext } from '../../../Context/TicketContext';

const NFTDescription = (props: any) => {
  const nft: ITicketWithRelation = props.nft;
  const [ticket, setTicket] = useState(nft);
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [currentETHPrice, setCurrentETHPrice] = useState(0);
  const [changePrice, setChangePrice] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [sell, setSell] = useState(false);
  const [buyNFT, setBuyNFT] = useState(false);
  const [offer, setOffer] = useState(false);
  const [showListing, setShowListing] = useState(false);
  const [owner, setOwner] = useState('');
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openListing, setOpenListing] = useState(false);
  const [openChangePrice, setOpenChangePrice] = useState(false);
  const [openBuyNFT, setOpenBuyNFT] = useState(false);

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == 'Listing') {
      setShowListing(true);
    }
  };

  //SMART CONTRACT DATA
  const { currentAccount } = useContext(ConnectionContext);
  const {
    transferTicket,
    listingTicketForSale,
    cancelListingTicket,
    updateTicketPrice,
    buyTicketNFT,
  } = useContext(TicketContext);
  // Cancel listing Button
  const handleCancelListing = async () => {
    if (
      confirm(
        `Are you sure you wanna cancel listing ticket ${ticket.ticketType.name.toUpperCase()} #${
          ticket.id
        }`
      )
    ) {
      await cancelListingTicket(ticket.id);
      setTicket({
        ...ticket,
        forSale: false,
      });
    } else {
      return;
    }
  };

  const handleChangeStateBasedOnOwnerOrNormalView = () => {
    console.log('ticket', ticket);

    // Ticket Owner View
    if (currentAccount.toLowerCase() === ticket.owner.toLowerCase()) {
      setOwner('you');
      // Hidden buy nft, offer and buy NFT button and show sell button if item not for sale
      // Alway show transfer button
      setTransfer(true);
      setSell(true);
      setChangePrice(false);
      setBuyNFT(false);
      setOffer(false);
      // Show change price, hidden sell when ticket is listing
      if (ticket.forSale) {
        setSell(false);
        setChangePrice(true);
      }
    }
    // Other View
    else {
      setOwner(ticket.owner.substring(2, 7).toUpperCase());
      // Hidden sell, change price, transfer button
      // Alway show offer button
      setSell(false);
      setChangePrice(false);
      setTransfer(false);
      setOffer(true);
      // Show buy NFT button if item for sale
      if (ticket.forSale) setBuyNFT(true);
    }
  };

  // Component Transfer
  const Transfer = () => {
    const [address, setAddress] = useState('');
    const [emptyInput, setRequiredInput] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);

    const handleOnTransfer = async (): Promise<void> => {
      if (address == '') {
        setInvalidAddress(false);
        setRequiredInput(true);
        return;
      }
      if (!ethers.utils.isAddress(address)) {
        setRequiredInput(false);
        setInvalidAddress(true);
        return;
      }
      await transferTicket(currentAccount, address, ticket.id);
      setAddress('');
      setOpenTransfer(false);
      // render ui after transfer ticket
      setTicket({
        ...ticket,
        owner: address,
        forSale: false,
      });
      // update transfer ui
    };

    const hanldeOnCancelTransfer = () => {
      setOpenTransfer(false);
      setAddress('');
      setInvalidAddress(false);
      setRequiredInput(false);
    };

    const handleOnChangeInputAddress = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setAddress(e.target.value);
      if (e.target.value == '') {
        setInvalidAddress(false);
        setRequiredInput(true);
        return;
      }
      if (!ethers.utils.isAddress(e.target.value)) {
        setRequiredInput(false);
        setInvalidAddress(true);
        return;
      }
      setRequiredInput(false);
      setInvalidAddress(false);
    };

    return (
      <>
        {/* Image  */}
        <div className={Style.container_box_image_common}>
          <div className={Style.box_image_common}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${ticket.ticketType.hashImage}`}
              className={Style.modal_image_common}
              alt="NFT image"
              width={280}
              height={300}
              objectFit="cover"
            />
          </div>
        </div>
        <div className={Style.modal_bottom}>
          <div className={Style.Form_box_input}>
            <label htmlFor="address">Address</label>
            <input
              className={
                emptyInput
                  ? Style.error_required_input
                  : invalidAddress
                  ? Style.error_invalid_address
                  : ''
              }
              placeholder="Enter address"
              value={address}
              onChange={handleOnChangeInputAddress}
            />
            {emptyInput && (
              <div className={Style.error_text}>This field is required</div>
            )}
            {invalidAddress && (
              <div className={Style.error_text}>Invalid address</div>
            )}
          </div>
          <div className={Style.Form_box_desc}>
            "{ticket.ticketType.name} #{ticket.id}" will be transferred to
            {!invalidAddress && !emptyInput && address ? (
              <>
                <br></br>
                {address}
                <span className={Style.warning}>
                  <AiFillWarning /> Items sent to the wrong address cannot be
                  recovered
                </span>
              </>
            ) : (
              ' ... '
            )}
          </div>
        </div>
        <div className={Style.modal_bottom_container_btn}>
          <Button
            btnName="Cancel"
            handleClick={hanldeOnCancelTransfer}
            classStyle={Style.modal_bottom_btn_style}
          />

          <Button
            btnName="Transfer"
            handleClick={handleOnTransfer}
            classStyle={Style.modal_bottom_btn_style}
          />
        </div>
      </>
    );
  };

  // Listing Component
  const Listing = () => {
    const [price, setPrice] = useState('');
    const [emptyInputPrice, setEmptyInputPrice] = useState(false);

    const handleOnListing = async (): Promise<void> => {
      if (price == '') {
        setEmptyInputPrice(true);
        return;
      }
      let priceAfterRouding = parseFloat(Number(price).toFixed(3));

      await listingTicketForSale(ticket.id, priceAfterRouding * 1000);

      setPrice('');
      setOpenListing(false);
      // render ui after listing ticket
      // update ticket price and forSale
      setTicket({
        ...ticket,
        forSale: true,
        price: priceAfterRouding,
      });
      // add listing object to array listing
    };

    const hanldeOnCancelListing = () => {
      setOpenListing(false);
      setPrice('');
    };

    const handleOnChangeInputPrice = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setPrice(e.target.value);
      if (e.target.value == '') {
        setEmptyInputPrice(true);
        return;
      }
      setEmptyInputPrice(false);
    };

    return (
      <>
        {/* Image  */}
        <div className={Style.container_box_image_common}>
          <div className={Style.box_image_common}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${ticket.ticketType.hashImage}`}
              className={Style.modal_image_common}
              alt="NFT image"
              width={280}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className={Style.box_image_desc}>
            <div>
              {ticket.ticketType.event.name} <MdVerified />
            </div>
            <div>
              {ticket.ticketType.name} #{ticket.id}
            </div>
          </div>
        </div>
        <div className={Style.modal_bottom}>
          <div className={Style.Form_box_input}>
            <label htmlFor="price">Price (ETH)</label>
            <input
              className={emptyInputPrice ? Style.error_required_input : ''}
              placeholder="Enter price"
              value={price}
              onChange={handleOnChangeInputPrice}
            />
            {emptyInputPrice && (
              <div className={Style.error_text}>This field is required</div>
            )}
          </div>
        </div>
        <div className={Style.modal_bottom_container_btn}>
          <Button
            btnName="Cancel"
            handleClick={hanldeOnCancelListing}
            classStyle={Style.modal_bottom_btn_style}
          />

          <Button
            btnName="Listing"
            handleClick={handleOnListing}
            classStyle={Style.modal_bottom_btn_style}
          />
        </div>
      </>
    );
  };

  // Change Price Component
  const ChangePrice = () => {
    const [price, setPrice] = useState('');
    const [emptyInputPrice, setEmptyInputPrice] = useState(false);

    const handleOnChangePrice = async (): Promise<void> => {
      if (price == '') {
        setEmptyInputPrice(true);
        return;
      }
      let priceAfterRouding = parseFloat(Number(price).toFixed(3));

      await updateTicketPrice(ticket.id, priceAfterRouding * 1000);

      setPrice('');
      setOpenChangePrice(false);
      // render ui after listing ticket
      // update ticket price and forSale
      setTicket({
        ...ticket,
        price: priceAfterRouding,
      });
    };

    const hanldeOnCancelChangePrice = () => {
      setOpenChangePrice(false);
      setPrice('');
    };

    const handleOnChangeInputPrice = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setPrice(e.target.value);
      if (e.target.value == '') {
        setEmptyInputPrice(true);
        return;
      }
      setEmptyInputPrice(false);
    };

    return (
      <>
        {/* Image  */}
        <div className={Style.container_box_image_common}>
          <div className={Style.box_image_common}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${ticket.ticketType.hashImage}`}
              className={Style.modal_image_common}
              alt="NFT image"
              width={280}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className={Style.box_image_desc}>
            <div>
              {ticket.ticketType.event.name} <MdVerified />
            </div>
            <div>
              {ticket.ticketType.name} #{ticket.id}
            </div>
          </div>
        </div>
        <div className={Style.modal_bottom}>
          <div className={Style.Form_box_input}>
            <label htmlFor="price">Old Price (ETH)</label>
            <input
              disabled
              placeholder="Enter price"
              value={ticket.price}
              className={Style.input_disable_price}
            />
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="price">New Price (ETH)</label>
            <input
              className={emptyInputPrice ? Style.error_required_input : ''}
              placeholder="Enter price"
              value={price}
              onChange={handleOnChangeInputPrice}
            />
            {emptyInputPrice && (
              <div className={Style.error_text}>This field is required</div>
            )}
          </div>
        </div>
        <div className={Style.modal_bottom_container_btn}>
          <Button
            btnName="Cancel"
            handleClick={hanldeOnCancelChangePrice}
            classStyle={Style.modal_bottom_btn_style}
          />

          <Button
            btnName="Update"
            handleClick={handleOnChangePrice}
            classStyle={Style.modal_bottom_btn_style}
          />
        </div>
      </>
    );
  };

  // Buy NFT Component
  const BuyNFT = () => {
    const handleOnBuyNFT = async (): Promise<void> => {
      if (!currentAccount) {
        alert('Please login first');
        return;
      }
      await buyTicketNFT(ticket.id, ticket.price);
      setOpenBuyNFT(false);
      // render ui after buy ticket
      // update ticket owner and forSale
      setTicket({
        ...ticket,
        forSale: false,
        owner: currentAccount,
      });
    };

    const hanldeOnCancelBuyNFT = () => {
      setOpenBuyNFT(false);
    };

    return (
      <>
        {/* Image  */}
        <div className={Style.container_box_image_common}>
          <div className={Style.box_image_common}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${ticket.ticketType.hashImage}`}
              className={Style.modal_image_common}
              alt="NFT image"
              width={280}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className={Style.box_image_desc}>
            <div>
              {ticket.ticketType.event.name} <MdVerified />
            </div>
            <div>
              {ticket.ticketType.name} #{ticket.id}
            </div>
          </div>
        </div>
        <div className={Style.modal_bottom}>
          <div className={Style.Form_box_description}>
            <span className={Style.Form_box_description_total}>Total: </span>
            <SiEthereum />
            <span>{ticket.price} ETH</span>
          </div>
        </div>
        <div className={Style.modal_bottom_container_btn}>
          <Button
            btnName="Cancel"
            handleClick={hanldeOnCancelBuyNFT}
            classStyle={Style.modal_bottom_btn_style}
          />

          <Button
            btnName="Purchase NFT"
            handleClick={handleOnBuyNFT}
            classStyle={Style.modal_bottom_btn_style}
          />
        </div>
      </>
    );
  };

  const getCurrentETHPrice = () => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum')
      .then((response) => response.json())
      .then((data) => setCurrentETHPrice(data.market_data.current_price.usd));
  };

  useEffect(() => {
    getCurrentETHPrice();
    // call when change account or change ticket data like owner or forSale
    handleChangeStateBasedOnOwnerOrNormalView();
  }, [currentAccount, ticket]);

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <span
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            >
              <MdCloudUpload />
            </span>

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}
            <span
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            >
              <BsThreeDots />
            </span>

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                {sell && (
                  <span onClick={() => setOpenListing(true)}>
                    <MdSell /> Sell
                  </span>
                )}
                {changePrice && (
                  <span onClick={() => setOpenChangePrice(true)}>
                    <BiDollar /> Change price
                  </span>
                )}
                {transfer && (
                  <span onClick={() => setOpenTransfer(true)}>
                    <BiTransferAlt /> Transfer
                  </span>
                )}
                <span>
                  <MdReportProblem /> Report abouse
                </span>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {ticket.ticketType.name} #{ticket.id}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Owned by</small> <br />
                <Link href={{ pathname: '/', query: `${ticket.owner}` }}>
                  <span>
                    {owner} <MdVerified />
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Event</small> <br />
                <span>
                  {ticket.ticketType.event?.name} <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            {ticket.forSale && (
              <div
                className={Style.NFTDescription_box_profile_biding_box_price}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_price_bid
                  }
                >
                  <small>Current Price</small>
                  <p>
                    {ticket.price} ETH{' '}
                    <span>
                      ( ≈ ${parseInt(`${ticket.price * currentETHPrice}`)})
                    </span>
                  </p>
                </div>
              </div>
            )}
            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {sell && (
                <Button
                  icon={<MdSell />}
                  btnName="Sell"
                  handleClick={() => setOpenListing(true)}
                  classStyle={Style.button}
                />
              )}
              {changePrice && (
                <Button
                  icon={<MdCancelScheduleSend />}
                  btnName="Cancel listing"
                  handleClick={() => handleCancelListing()}
                  classStyle={Style.button}
                />
              )}
              {buyNFT && (
                <Button
                  icon={<FaWallet />}
                  btnName="Buy NFT"
                  handleClick={() => setOpenBuyNFT(true)}
                  classStyle={Style.button}
                />
              )}
              {offer && (
                <Button
                  icon={<FaPercentage />}
                  btnName="Make offer"
                  handleClick={() => {}}
                  classStyle={Style.button}
                />
              )}
            </div>
            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Listing</button>
            </div>
            {showListing && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                {ticket.activities.length > 0 ? (
                  <NFTTabs dataTab={ticket.activities} icon={undefined} />
                ) : (
                  'Nothing'
                )}
              </div>
            )}
          </div>
        </div>
        {openTransfer && (
          <Modal title={'Transfer'}>
            <Transfer></Transfer>
          </Modal>
        )}
        {openListing && (
          <Modal title={'Listing Ticket for Sale'}>
            <Listing></Listing>
          </Modal>
        )}
        {openChangePrice && (
          <Modal title={'Change Price'}>
            <ChangePrice></ChangePrice>
          </Modal>
        )}
        {openBuyNFT && (
          <Modal title={'Checkout'}>
            <BuyNFT></BuyNFT>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NFTDescription;
