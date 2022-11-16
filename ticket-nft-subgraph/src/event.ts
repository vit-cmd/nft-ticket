import {
  NewEvent,
  OwnershipTransferred,
  UpdateAprroveEventManager,
} from "../generated/Event/Event";
import { Event, EventManager } from "../generated/schema";

export function handleNewEvent(event: NewEvent): void {
  let entity = new Event(event.params.eventId.toString());

  // Entity fields can be set based on event parameters
  entity.name = event.params.name;
  entity.eventManager = event.params.eventManager;
  entity.location = event.params.location;
  entity.description = event.params.description;
  entity.hashImage = event.params.hashImage;
  entity.startDay = event.params.startDay;
  entity.endDay = event.params.endDay;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.approveOrDisableEventManager(...)
  // - contract.createEvent(...)
  // - contract.getApprovedEventManager(...)
  // - contract.owner(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlerUpdateAprroveEventManager(
  event: UpdateAprroveEventManager
): void {
  let entity = EventManager.load(event.params.eventManager.toHex());
  if (!entity) {
    entity = new EventManager(event.params.eventManager.toHex());
  }
  entity.approve = event.params.aprrove;
  entity.save();
}
