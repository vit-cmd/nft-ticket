// import {
//   assert,
//   describe,
//   test,
//   clearStore,
//   beforeAll,
//   afterAll
// } from "matchstick-as/assembly/index"
// import { BigInt } from "@graphprotocol/graph-ts"
// import { NewTicketType } from "../generated/schema"
// import { NewTicketType as NewTicketTypeEvent } from "../generated/TicketType/TicketType"
// import { handleNewTicketType } from "../src/ticket-type"
// import { createNewTicketTypeEvent } from "./ticket-type-utils"

// // Tests structure (matchstick-as >=0.5.0)
// // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// describe("Describe entity assertions", () => {
//   beforeAll(() => {
//     let eventId = BigInt.fromI32(234)
//     let name = "Example string value"
//     let description = "Example string value"
//     let hashImage = "Example string value"
//     let currentMintTickets = BigInt.fromI32(234)
//     let maxTicketCount = BigInt.fromI32(234)
//     let priceFactor = BigInt.fromI32(234)
//     let newNewTicketTypeEvent = createNewTicketTypeEvent(
//       eventId,
//       name,
//       description,
//       hashImage,
//       currentMintTickets,
//       maxTicketCount,
//       priceFactor
//     )
//     handleNewTicketType(newNewTicketTypeEvent)
//   })

//   afterAll(() => {
//     clearStore()
//   })

//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

//   test("NewTicketType created and stored", () => {
//     assert.entityCount("NewTicketType", 1)

//     // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "eventId",
//       "234"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "name",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "description",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "hashImage",
//       "Example string value"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "currentMintTickets",
//       "234"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "maxTicketCount",
//       "234"
//     )
//     assert.fieldEquals(
//       "NewTicketType",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "priceFactor",
//       "234"
//     )

//     // More assert options:
//     // https://thegraph.com/docs/en/developer/matchstick/#asserts
//   })
// })
