import React from 'react';
import {FaCalendarDay, FaSortAmountUpAlt} from 'react-icons/fa';
import {RiText} from 'react-icons/ri';
import {ImPriceTags} from 'react-icons/im';
//INTERNAL IMPORT
import Style from './PopUp.module.css';
import {Button, Error} from '../../components';
import {UploadImage} from '../CreateNFT/UploadImage/UploadImage';
import moment from 'moment';
import {ConnectionContext, EventContext, IPFSContext} from '../../Context';

export const PopUp = () => {
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [file, setFile] = React.useState<File>();

  const {uploadImage} = React.useContext(IPFSContext);
  const {setOpenError, setError, provider} = React.useContext(ConnectionContext);
  const {createEvent} = React.useContext(EventContext);

  return (
    <div className={Style.upload}>
      {/* Image  */}
      <UploadImage setFile={setFile} />

      <div className={Style.upload_box}>
        <div className={Style.Form_box_input}>
          <label htmlFor="website">Ticket Type</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <RiText />
            </div>
            <input type="text" placeholder="Ticket type" onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            cols={30}
            rows={4}
            placeholder="something about your event in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={Style.Form_box_input_social}>
          <div className={Style.Form_box_input}>
            <label htmlFor="size">Ticket count</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaSortAmountUpAlt />
              </div>
              <input
                type="number"
                onChange={(e) => {
                  const _startDay = moment(e.target.value).unix();
                  // setStartDay(_startDay);
                }}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="Propertie">Price unit</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <ImPriceTags />
              </div>
              <input
                type="number"
                onChange={(e) => {
                  const _startDay = moment(e.target.value).unix();
                  // setEndDay(_startDay);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Style.upload_box_btn}>
        <Button btnName="Create Ticket Type" handleClick={async () => {}} classStyle={Style.upload_box_btn_style} />
      </div>
    </div>
  );
};
