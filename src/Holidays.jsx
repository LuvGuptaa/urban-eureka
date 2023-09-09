import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import GlobalContext from "./context/GlobalContext";

export default function Holidays() {
  const {setHolidays} = useContext(GlobalContext)
  const API_KEY = "7ULwTvN0nMFRG9zPXxEYXZsq1hRCudEt";
  const COUNTRY_CODE = "IN";
  const YEAR = 2023;

  useEffect(() => {
    const API_ENDPOINT = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY_CODE}&year=${YEAR}`;

    axios
      .get(API_ENDPOINT)
      .then((response) => {
        const holidaysData = response.data.response.holidays;

        const formattedHolidays = holidaysData.map((evt) => ({
          title: evt.name,
          description: evt.description,
          label: "holidays",
          day: evt.date.iso,
          id: evt.date.iso,
        }));
        setHolidays(formattedHolidays);
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
      });
  }, []);

  return null;
}
