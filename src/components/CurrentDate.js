import React from "react";

function CurrentDate() {
  const showDate = new Date();
  const newDate = showDate.toDateString();

  return <div>{newDate}</div>;
}

export default CurrentDate;
