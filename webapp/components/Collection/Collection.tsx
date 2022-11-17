import React from 'react';

//INTERNAL IMPORT
import Style from './Collection.module.css';
import DaysComponent from './DaysComponents/DaysComponents';
import images from '../../img';
import {Button} from '../Button/Button';
import {PopUp} from '../PopUp/PopUp';

export const Collection = () => {
  const [popular, setPopular] = React.useState(true);
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);

  const CardArray = [
    {
      background: images.creatorbackground1,
      user: images.user1
    },
    {
      background: images.creatorbackground2,
      user: images.user2
    },
    {
      background: images.creatorbackground3,
      user: images.user3
    },
    {
      background: images.creatorbackground4,
      user: images.user4
    },
    {
      background: images.creatorbackground4,
      user: images.user4
    }
  ];
  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>List Ticket Type</h2>
        <Button
          btnName="Create Ticket Type"
          handleClick={() => {
            setOpenMenu(true);
          }}
          classStyle={Style.btn_create_ticket_type}
        />
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {CardArray.map((el, i) => (
            <DaysComponent key={i + 1} />
          ))}
        </div>
      )}
      {isOpenMenu && <p>Hello</p>}

      {isOpenMenu && (
        <div className={Style.modal}>
          <div className={Style.modal_content}>
            <div className={Style.modal_header}>
              <div className={Style.modal_header_title}>Create Ticket Type</div>
              <span
                className={Style.modal_header_icon}
                onClick={() => {
                  setOpenMenu(false);
                  // setAddress('');
                }}
              >
                X
              </span>
            </div>
            <PopUp />
          </div>
        </div>
      )}
    </div>
  );
};
