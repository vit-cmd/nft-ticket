import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ListEventOwner from '../components/EventOwner/EventOwner';
import { ConnectionContext, EventContext } from '../Context';

const EvtOwner = () => {
  // Use Context
  const { currentAccount, provider, admin, setEventManager } =
    useContext(ConnectionContext);
  const { approveOrDisableEventManager } = useContext(EventContext);

  return (
    <>
      {currentAccount && admin ? (
        <ListEventOwner
          provider={provider}
          currentAccount={currentAccount}
          setEventManager={setEventManager}
          approveOrDisableEventManager={approveOrDisableEventManager}
        />
      ) : (
        <p style={{}}>You don't have permission to access this page</p>
      )}
    </>
  );
};

export default EvtOwner;
