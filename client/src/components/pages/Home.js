import React from "react";
import Contacts from "../contacts/contacts";
import ContactForm from '../contacts/ContactForm';
import FilterContact from "../contacts/FilterContact";

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContact />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
