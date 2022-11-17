// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Event is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private eventIDs;

    struct EventData {
        string name;
        string location;
        string description;
        string hashImage;
        address eventManager;
        uint256 startDay;
        uint256 endDay;
        bool exist;
    }

    mapping(uint256 => EventData) private events; // Each event of event manager
    mapping(address => bool) private approvedEventManager;

    event NewEvent(
        uint256 eventID,
        string name,
        string location,
        string description,
        string hashImage,
        address eventManager,
        uint256 startDay,
        uint256 endDay
    );

    event UpdateAprroveEventManager(address eventManager, bool aprrove);

    // Modifiers
    modifier isEventManager() {
        require(
            approvedEventManager[msg.sender] == true,
            "Only Event Managers are allowed to do this action"
        );
        _;
    }

    // Function

    /**
     * @dev Allows user request to be event manager
     * @param address_ address that request to be event manager
     */
    function requestToBeEventManager(address address_) external returns (bool) {
        require(
            approvedEventManager[address_] == false,
            "You are event manager already"
        );
        emit UpdateAprroveEventManager(address_, false);
        return true;
    }

    /**
     * @dev Allows the Contract admin to approve or disable the Event Manager
     * @notice onlyOwner modifier should be invoked
     * @param address_ address that request to be event manager
     * @param status_ disable: false, approve: true
     * @return bool true/false if the approval or disable was successful of not
     */
    function approveOrDisableEventManager(address address_, bool status_)
        external
        payable
        onlyOwner
        returns (bool)
    {
        if (status_ == true) {
            require(
                approvedEventManager[address_] == false,
                "Event manager already approved before"
            );
        }

        approvedEventManager[address_] = status_;

        emit UpdateAprroveEventManager(address_, status_);

        return true;
    }

    /**
     * @dev Allows the Event Manager to create event
     * @notice isEventManager modifier should be invoked
     * @notice params is data of event struct
     * @notice emit NewEvent after create event
     * @return eventID
     */
    function createEvent(
        string memory name_,
        string memory location_,
        string memory description_,
        string memory image_,
        uint256 startDate_,
        uint256 endDate_
    ) external payable isEventManager returns (uint256) {
        uint256 currentEventID = eventIDs.current();

        events[currentEventID] = EventData(
            name_,
            location_,
            description_,
            image_,
            msg.sender,
            startDate_,
            endDate_,
            true
        );

        eventIDs.increment();

        emit NewEvent(
            currentEventID,
            name_,
            location_,
            description_,
            image_,
            msg.sender,
            startDate_,
            endDate_
        );
        console.log("Create event with id: ", currentEventID);
        return currentEventID;
    }

    function getApprovedEventManager(address address_)
        external
        view
        returns (bool)
    {
        return approvedEventManager[address_];
    }

    function isOwnerOfEvent(uint256 eventID_) external view returns (bool) {
        console.log("Origin sender: ", tx.origin);
        console.log("EventManager: ", events[eventID_].eventManager);
        if (events[eventID_].eventManager == tx.origin) {
            return true;
        }
        return false;
    }

    function isEventExist(uint256 eventID_) external view returns (bool) {
        if (events[eventID_].exist) {
            return true;
        }
        return false;
    }
}
