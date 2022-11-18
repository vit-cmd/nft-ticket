import React from 'react';

//INTERNAL IMPORT
import Style from './Collection.module.css';
import DaysComponent from './DaysComponents/DaysComponents';
import {Button} from '../Button/Button';
import {ImPriceTags} from 'react-icons/im';
import {UploadImage} from '../CreateNFT/UploadImage/UploadImage';
import {RiText} from 'react-icons/ri';
import {FaSortAmountUpAlt} from 'react-icons/fa';
import {ConnectionContext, GraphQLContext, IPFSContext, TicketTypeContext} from '../../Context';
import {Error} from '../Error/Error';
import {ITicketType} from '../../constants/interfaces';

export const Collection = (props: {id: number; cards: any[]; owner: string}) => {
  const [ticketTypes, setTicketTypes] = React.useState<ITicketType[]>(props.cards);
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();
  const [amount, setAmount] = React.useState<number>();
  const [file, setFile] = React.useState<File>();

  const {uploadImage} = React.useContext(IPFSContext);
  const {setOpenError, setError, provider, currentAccount} = React.useContext(ConnectionContext);
  const {createTicketType} = React.useContext(TicketTypeContext);
  const {getTicketTypes} = React.useContext(GraphQLContext);

  const handleCreateTicketType = async () => {
    if (!provider) {
      setOpenError(true);
      setError('Please connect wallet');
      return;
    }

    if (!file || !name || !description || !price || !amount) {
      setOpenError(true);
      setError('Please enter all fields');
      <Error />;
      return;
    }

    const hash = await uploadImage(file!);
    await createTicketType(provider, props.id, name, description, hash, price, amount);

    const tempore = await getTicketTypes();
    setTicketTypes(tempore);
  };

  React.useEffect(() => {
    console.log('List ticket type: ', ticketTypes);
  }, [ticketTypes]);

  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>List Ticket Type</h2>
        {currentAccount.toLowerCase() === props.owner && (
          <Button
            btnName="Create Ticket Type"
            handleClick={() => {
              setOpenMenu(true);
            }}
            classStyle={Style.btn_create_ticket_type}
          />
        )}

        <div className={Style.collection_box}>
          {ticketTypes.map((el, i) => (
            <DaysComponent key={i + 1} ticketType={el} index={i} />
          ))}
        </div>
      </div>
      {isOpenMenu && (
        <div className={Style.modal}>
          <div className={Style.modal_content}>
            <div className={Style.modal_header}>
              <div className={Style.modal_header_title}>Create Ticket Type</div>
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
                          setPrice(parseInt(e.target.value));
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
