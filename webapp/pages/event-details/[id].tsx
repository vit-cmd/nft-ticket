import React, { useEffect } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { useRouter } from "next/router";
import Style from "../../styles/event-details.module.css";
import {
  ConnectionContext,
  GraphQLContext,
  IPFSContext,
  TicketTypeContext,
} from "../../Context";
import { isArray } from "@apollo/client/cache/inmemory/helpers";
import { IEvent, ITicketType } from "../../constants/interfaces";
import { Button, Error, Slider } from "../../components";
import { UploadImage } from "../../components/CreateNFT/UploadImage/UploadImage";
import { RiText } from "react-icons/ri";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";

const EventDetailsWithId = () => {
  const [event, setEvent] = React.useState<IEvent>();
  const [startDay, setStartDay] = React.useState<Date>();
  const [endDay, setEndDay] = React.useState<Date>();
  const [ticketTypes, setTicketTypes] = React.useState<ITicketType[]>();
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();
  const [amount, setAmount] = React.useState<number>();
  const [file, setFile] = React.useState<File>();
  const [isChange, setChange] = React.useState<boolean>(false);

  // use context
  const { getEventWithTicketType, getTicketTypes } =
    React.useContext(GraphQLContext);
  const { uploadImage } = React.useContext(IPFSContext);
  const { setOpenError, setError, provider, currentAccount } =
    React.useContext(ConnectionContext);
  const { createTicketType } = React.useContext(TicketTypeContext);

  const router = useRouter();
  const { id } = router.query;
  if (isArray(id)) {
    return;
  }

  useEffect(() => {
    const getData = async () => {
      const tempore = await getEventWithTicketType(parseInt(id!));
      if (!tempore) {
        return;
      }
      setStartDay(new Date(tempore.startDay * 1000));
      setEndDay(new Date(tempore.endDay * 1000));
      setEvent(tempore);

      setTicketTypes(tempore?.ticketTypes!);
    };
    getData();
  }, [id]);

  // Handle
  const handleCreateTicketType = async () => {
    if (!provider) {
      setOpenError(true);
      setError("Please connect wallet");
      return;
    }
    if (!file || !name || !description || !price || !amount) {
      setOpenError(true);
      setError("Please enter all fields");
      <Error />;
      return;
    }
    if (price < 0 || amount < 0) {
      alert("Number can not be negative.");
      return;
    }
    const hash = await uploadImage(file!);
    const result = await createTicketType(
      provider,
      event?.id!,
      name,
      description,
      hash,
      price * 1000,
      amount
    );
    const newTicketType: ITicketType = {
      currentMintTickets: 0,
      description,
      eventID: parseInt(id!),
      exist: true,
      hashImage: hash,
      maxTicketCount: amount,
      name,
      priceFactor: price,
      id: result,
    };
    setTicketTypes([...ticketTypes!, newTicketType]);
    alert("Create ticket type successfully.");
  };

  if (!event || isArray(id)) {
    return (
      <div className={Style.event_details_box}>
        <h1>Not found event</h1>
      </div>
    );
  } else
    return (
      <div>
        <div className={Style.container_image_event}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${event.hashImage}`}
            width={500}
            height={500}
            objectFit="cover"
            alt={"Avatar"}
          />
        </div>
        <div className={Style.event_details_box}>
          <div className={Style.event_details_headher}>
            <h1>
              {event.name}.{" "}
              <span>
                <MdVerified />
              </span>
            </h1>
            <div className={Style.event_details_group_btn}>
              {currentAccount.toLowerCase() === event.eventManager && (
                <>
                  <Button
                    btnName="Create Ticket Type"
                    handleClick={() => {
                      setOpenMenu(true);
                    }}
                    classStyle={Style.btn_create_ticket_type}
                  />
                  <Button
                    btnName="Update event"
                    handleClick={() => {}}
                    classStyle={Style.btn_create_ticket_type}
                  />
                </>
              )}
            </div>
          </div>
          <span>
            By: <b>{event.eventManager}</b>
          </span>
          <div className={Style.info_event}>
            <span>
              Start day:{" "}
              <b>{`${startDay!.getMonth()}/${startDay!.getDate()}/${startDay!.getFullYear()}`}</b>
            </span>
            <span>
              End day:{" "}
              <b>{`${endDay!.getMonth()}/${endDay!.getDate()}/${endDay!.getFullYear()}`}</b>
            </span>
            <span>
              Chain: <b>Ethereum</b>
            </span>
          </div>
          <h2>
            <BiDetail /> Description
          </h2>
          <p>{event.description}</p>
        </div>
        {ticketTypes && (
          <Slider
            id={parseInt(id!)}
            cards={ticketTypes!}
            widthScroll={ticketTypes!.length * 400}
            owner={event.eventManager}
          />
        )}

        {isOpenMenu && (
          <div className={Style.modal}>
            <div className={Style.modal_content}>
              <div className={Style.modal_header}>
                <div className={Style.modal_header_title}>
                  Create Ticket Type
                </div>
              </div>
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
                      <input
                        type="text"
                        placeholder="Ticket type"
                        onChange={(e) => setName(e.target.value)}
                      />
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
                          required
                          onChange={(e) => {
                            setAmount(parseInt(e.target.value));
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
                          required
                          onChange={(e) => {
                            setPrice(
                              parseFloat(Number(e.target.value).toFixed(3))
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Style.upload_box_btn}>
                  <Button
                    btnName="Cancel"
                    handleClick={async () => {
                      setOpenMenu(false);
                    }}
                    classStyle={Style.upload_box_btn_style}
                  />

                  <Button
                    btnName="Create Ticket Type"
                    handleClick={async () => {
                      await handleCreateTicketType();
                    }}
                    classStyle={Style.upload_box_btn_style}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default EventDetailsWithId;
