import React, {useState, useEffect, useContext, useRef} from 'react';
import Image from 'next/image';
import {DiJqueryLogo} from 'react-icons/di';
//----IMPORT ICON
import {MdNotifications} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {CgMenuRight} from 'react-icons/cg';
import {useRouter} from 'next/router';

//INTERNAL IMPORT
import Style from './NavBar.module.css';
// import { Button, Error } from "../componentsindex";
import images from '../../img';
import {Button, Profile, Discover, HelpCenter, Notification, SideBar, Error} from '../../components';

//IMPORT FROM SMART CONTRACT
import {ConnectionContext} from '../../Context';

export const NavBar = () => {
  //SMART CONTRACT SECTION - Get some variable and func of TicketNFTContext object
  const {currentAccount, openError, accountBalance, eventManager, admin, connectWallet} = useContext(ConnectionContext);

  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const mouseEvent = e.target as HTMLElement;
    const btnText = mouseEvent.innerText;

    if (btnText == 'Discover') {
      setDiscover(!discover);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == 'Help Center') {
      setDiscover(false);
      setHelp(!help);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <span onClick={() => router.push('/')}>
              <DiJqueryLogo />
            </span>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <span onClick={() => {}} className={Style.search_icon}>
                <BsSearch />
              </span>
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <span className={Style.notify} onClick={() => openNotification()}>
              <MdNotifications />
            </span>
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          {currentAccount == '' && (
            <div className={Style.navbar_container_right_button}>
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            </div>
          )}
          {currentAccount !== '' && eventManager && (
            <div className={Style.navbar_container_right_button}>
              <Button btnName="Create" handleClick={() => router.push('/uploadNFT')} />
            </div>
          )}
          {currentAccount !== '' && admin && (
            <div className={Style.navbar_container_right_button}>
              <Button btnName="Manage Event Owner" handleClick={() => router.push('/event-owner')} />
              <Button btnName="Create" handleClick={() => router.push('/create-event')} />
            </div>
          )}

          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} accountBalance={accountBalance} />}
            </div>
          </div>

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <span className={Style.menuIcon} onClick={() => openSideBar()}>
              <CgMenuRight />
            </span>
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} currentAccount={currentAccount} connectWallet={connectWallet} />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};
