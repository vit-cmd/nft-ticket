import {Props} from 'next/script';
import React, {useState} from 'react';
import {create as ipfsHttpClient} from 'ipfs-http-client';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString('base64')}`;

const subdomain = process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN;

const client = ipfsHttpClient({
  host: 'infura-ipfs.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

interface IIPFSContext {
  uploadImage(e: File): Promise<string>
}

export const IPFSContext = React.createContext({} as IIPFSContext);

export const IPFSProvider: React.FC<Props> = ({children}) => {
  //---UseState
  const [error, setError] = useState<string>();
  const [openError, setOpenError] = useState<boolean>(false);

  //---UPLOAD TO IPFS FUNCTION
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const added = await client.add({content: file});
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError('Error Uploading to IPFS');
      setOpenError(true);
      throw error;
    }
  };

  return <IPFSContext.Provider value={{
    uploadImage
  }}>{children}</IPFSContext.Provider>;
};
