import React from 'react';
import Image from 'next/image';
import image from '../../img';
import {useRouter} from 'next/router';
import Style from '../../styles/event-details.module.css';

interface IEventDetail {
  children: React.ReactNode;
  eventId: number;
}

const EventDetailsWithId = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div>
      <div className={Style.container_image_event}>
        <Image src={image.creatorbackground1} alt={'Avatar'} />
      </div>
    </div>
  );
};

export default EventDetailsWithId;
