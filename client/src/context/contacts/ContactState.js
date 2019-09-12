import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import uuid from "uuid";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Ronaldo",
        email: "ronaldo@gmail.com",
        phone: "355684289524",
        password: "123456",
        type: "professional"
      },
      {
        id: 2,
        name: "bisha",
        email: "bisha@gmail.com",
        phone: "355684289524",
        password: "123456",
        type: "personal"
      },
      {
        id: 3,
        name: "leme",
        email: "leme@gmail.com",
        phone: "355684289524",
        password: "123456",
        type: "personal"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ADD NEW CONTACT
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  //DELETE CONTACT
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  //UPDATE CONTACT
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  //FILTER CONTACT
  const filterContact = text => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text
    });
  };

  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  //SET CURRENT CONTACT
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  //CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered : state.filtered,
        addContact,
        deleteContact,
        clearCurrent,
        setCurrent,
        updateContact,
        filterContact,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
