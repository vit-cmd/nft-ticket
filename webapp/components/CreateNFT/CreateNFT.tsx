import React from 'react';
import {MdPriceChange} from 'react-icons/md';
import {FaCalendarDay} from 'react-icons/fa';
import {GoLocation} from 'react-icons/go';
import {RiText} from 'react-icons/ri';
//INTERNAL IMPORT
import Style from './CreateNFT.module.css';
import {Button, Error} from '../../components';
import {UploadImage} from './UploadImage/UploadImage';
import moment from 'moment';
import {ConnectionContext, EventContext, IPFSContext} from '../../Context';

export const CreateEvent = () => {
  const [eventName, setEventName] = React.useState<string>();
  const [location, setLocation] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [startDay, setStartDay] = React.useState<number>();
  const [endDay, setEndDay] = React.useState<number>();
  const [file, setFile] = React.useState<File>();

  const {uploadImage} = React.useContext(IPFSContext);
  const {setOpenError, setError, provider} = React.useContext(ConnectionContext);
  const {createEvent} = React.useContext(EventContext);

  const handleCreateEvent = async () => {
    if (!provider) {
      setOpenError(true);
      setError('Please connect wallet');
      return;
    }

    if (!file || !eventName || !location || !description || !startDay || !endDay) {
      setOpenError(true);
      setError('Please enter all fields');
      <Error />;
      return;
    }

    if (endDay < startDay) {
      alert('The end date is not less than the start date.');
      return;
    }

    const hash = await uploadImage(file!);
    await createEvent(provider, eventName, location, description, hash, startDay, endDay);
  };

  return (
    <div className={Style.upload}>
      {/* Image  */}
      <UploadImage setFile={setFile} />

      <div className={Style.upload_box}>
        <div className={Style.Form_box_input}>
          <label htmlFor="website">Event Name</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <RiText />
            </div>
            <input type="text" placeholder="event name" onChange={(e) => setEventName(e.target.value)} />
          </div>
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="location">Location</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <GoLocation />
            </div>
            <input type="text" placeholder="location" onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            cols={30}
            rows={6}
            placeholder="something about your event in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={Style.Form_box_input_social}>
          <div className={Style.Form_box_input}>
            <label htmlFor="size">Start Day</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaCalendarDay />
              </div>
              <input
                type="date"
                onChange={(e) => {
                  const _startDay = moment(e.target.value).unix();
                  setStartDay(_startDay);
                }}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="Propertie">End Day</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaCalendarDay />
              </div>
              <input
                type="date"
                onChange={(e) => {
                  const _startDay = moment(e.target.value).unix();
                  setEndDay(_startDay);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Style.upload_box_btn}>
        <Button
          btnName="Create Event"
          handleClick={async () => {
            await handleCreateEvent();
          }}
          classStyle={Style.upload_box_btn_style}
        />
      </div>
    </div>
  );
};
