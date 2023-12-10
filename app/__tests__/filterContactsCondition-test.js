import * as React from 'react';
import assert from "assert";
import {filterContactsCondition} from "../filterContactsCondition";

test('filtering contacts condition working correctly. case 1', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "b")

  //then
  assert(result === true)
});

test('filtering contacts condition working correctly. case 2', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "BUILD")

  //then
  assert(result === true)
});

test('filtering contacts condition working correctly. case 3', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "+44")

  //then
  assert(result === true)
});

test('filtering contacts condition working correctly. case 4', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "0951555555")

  //then
  assert(result === true)
});

test('filtering contacts condition working correctly. case 5', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "063")

  //then
  assert(result === false)
});

test('filtering contacts condition working correctly. case 6', () => {
  //given
  const contact = {
    firstName: "Bob",
    lastName: "Builder",
    phoneNumbers: [
      {
        number: "0951555555"
      },
      {
        number: "+44062666666"
      }
    ]
  }

  //when
  const result = filterContactsCondition(contact, "boe")

  //then
  assert(result === false)
});
