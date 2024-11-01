import React, { useState, useEffect } from 'react';
import { getAgendaItems, getMarkedDates } from '../agendaItems';

const Calendar = () => {
  const [agendaItems, setAgendaItems] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const items = await getAgendaItems();
      const marked = await getMarkedDates();
      setAgendaItems(items);
      setMarkedDates(marked);
    };

    fetchData();
  }, []);

  
};

export default Calendar;
