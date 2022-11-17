import React, {useEffect, useRef, useState} from 'react';
import {Button} from '../Button/Button';
import {IConnection, IEventContext} from '../../Context';
import {ethers} from 'ethers';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {AiFillLike, AiFillDislike} from 'react-icons/ai';
//INTERNAL IMPORT
import Style from './EventOwner.module.css';
import {IconContext} from 'react-icons';

interface IEventManagerData {
  id: string;
  approve: boolean;
}

const ListEventOwner = (props: Partial<IConnection & IEventContext>) => {
  const {approveOrDisableEventManager, provider, setEventManager, currentAccount} = props;
  const modalContentRef = useRef(null);
  const [isModalOpen, setOpenModal] = useState(false);
  const [address, setAddress] = useState('');
  const [data, setData] = useState<IEventManagerData[]>([]);
  const [reRenderUI, setRerenderUI] = useState(false);

  const query = `
  query {
    eventManagers {
      id
      approve
    }
  }
`;

  const APIURL = process.env.NEXT_PUBLIC_SUBGRAPH_API_URL;

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache()
  });

  useEffect(() => {
    client
      .query({
        query: gql(query)
      })
      .then((data: any) => {
        console.log('Subgraph data: ', data);
        setData(data.data.eventManagers);
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderUI]);

  const handleOnChangeInputAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleOnSubmit = async (): Promise<void> => {
    if (address == '') {
      alert('Please enter address');
      return;
    }
    if (!ethers.utils.isAddress(address)) {
      alert('Please enter valid address!');
      return;
    }
    await approveOrDisableEventManager!(provider!, address, true);
    setAddress('');
    setRerenderUI(!reRenderUI);
    reRenderNavBar(address, true);
  };

  const handleOnClickIcon = async (address: string, value: boolean): Promise<void> => {
    await approveOrDisableEventManager!(provider!, address, value);
    setRerenderUI(!reRenderUI);
    reRenderNavBar(address, value);
  };

  const reRenderNavBar = (address: string, value: boolean) => {
    if (currentAccount?.toLowerCase() == address.toLowerCase()) setEventManager!(value);
  };

  return (
    <div className={Style.eventOwner}>
      <div className={Style.eventOwner_container}>
        <div className={Style.eventOwner_container_heading}>
          <h1 className={Style.heading}>List all request event manager</h1>
          <Button btnName="Create" handleClick={() => setOpenModal(true)}></Button>
        </div>
        <div className={Style.eventOwner_container_body}>
          <table id={Style.eventmanagers}>
            <tr>
              <th>Address</th>
              <th>Aprrove</th>
              <th>Action</th>
            </tr>
            {data &&
              data.length > 0 &&
              data.map((value: IEventManagerData) => (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td className={value.approve ? Style.approved : Style.not_approve}>
                    {String(value.approve.valueOf())}
                  </td>
                  <td>
                    <IconContext.Provider value={{size: '2rem'}}>
                      <span style={{cursor: 'pointer'}} onClick={() => handleOnClickIcon(value.id, !value.approve)}>
                        {value.approve ? <AiFillDislike /> : <AiFillLike />}
                      </span>
                    </IconContext.Provider>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className={Style.modal}>
          <div ref={modalContentRef} className={Style.modal_content}>
            <div className={Style.modal_header}>
              <div className={Style.modal_header_title}>Approve Event Manager</div>
              <span
                className={Style.modal_header_icon}
                onClick={() => {
                  setOpenModal(false);
                  setAddress('');
                }}
              >
                X
              </span>
            </div>
            <div className={Style.modal_body}>
              <input
                className={Style.modal_body_input}
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangeInputAddress(e)}
              ></input>
            </div>
            <div className={Style.modal__footer}>
              <Button
                btnName="Cancel"
                handleClick={() => {
                  setOpenModal(false);
                  setAddress('');
                }}
                classStyle={Style.btn_cancel}
              ></Button>
              <Button btnName="Submit" handleClick={() => handleOnSubmit()}></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEventOwner;
