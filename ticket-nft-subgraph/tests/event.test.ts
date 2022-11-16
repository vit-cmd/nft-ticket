// import {
//   assert,
//   describe,
//   test,
//   clearStore,
//   beforeAll,
//   afterAll
// } from "matchstick-as/assembly/index"
// import { BigInt, Address } from "@graphprotocol/graph-ts"
// import { ExampleEntity } from "../generated/schema"
// import { NewEvent } from "../generated/Event/Event"
// import { handleNewEvent } from "../src/event"
// import { createNewEventEvent } from "./event-utils"

// // Tests structure (matchstick-as >=0.5.0)
// // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// describe("Describe entity assertions", () => {
//   beforeAll(() => {
//     let eventId = BigInt.fromI32(234)
//     let name = "Example string value"
//     let location = "Example string value"
//     let description = "Example string value"
//     let image = "Example string value"
//     let eventManager = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     )
//     let priceUnit = BigInt.fromI32(234)
//     let startDay = BigInt.fromI32(234)
//     let endDay = BigInt.fromI32(234)
//     let newNewEventEvent = createNewEventEvent(
//       eventId,
//       name,
//       location,
//       description,
//       image,
//       eventManager,
//       priceUnit,
//       startDay,
//       endDay
//     )
//     handleNewEvent(newNewEventEvent)
//   })

//   afterAll(() => {
//     clearStore()
//   })

//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

//   test("ExampleEntity created and stored", () => {
//     assert.entityCount("ExampleEntity", 1)

//     // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "eventId",
//       "234"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "name",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "location",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "description",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "image",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "eventManager",
//       "0x0000000000000000000000000000000000000001"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "priceUnit",
//       "234"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "startDay",
//       "234"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "endDay",
//       "234"
//     )

//     // More assert options:
//     // https://thegraph.com/docs/en/developer/matchstick/#asserts
//   })
// })
