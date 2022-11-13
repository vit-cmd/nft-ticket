import { useRouter } from "next/router";
import React, { useContext } from "react";
import ListEventOwner from "../components/EventOwner/EventOwner";
import { ConnectionContext, EventContext } from "../Context";

const EvtOwner = () => {
  // Use History
  const router = useRouter();
  // Use Context
  const { currentAccount, provider, admin } = useContext(ConnectionContext);
  const { approveEventManager } = useContext(EventContext);

  return (
    <>
      {currentAccount && admin ? (
        <ListEventOwner
          provider={provider}
          approveEventManager={approveEventManager}
        />
      ) : (
        <p style={{}}>You don't have permission to access this page</p>
      )}
    </>
  );
};

export default EvtOwner;
