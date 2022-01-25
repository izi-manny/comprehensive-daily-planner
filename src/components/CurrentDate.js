import React from "react";

function CurrentDate() {
  const showDate = new Date();
  const newDate = showDate.toDateString();

  return <div className="todays-date"> {newDate}</div>;
}

export default CurrentDate;
