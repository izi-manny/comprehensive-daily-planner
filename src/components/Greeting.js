import axios from "axios";
import React, { useState, useEffect } from "react";

function Greeting() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/api/login").then((res) => {
      setUser(res.data);
    });
  }, []);

  console.log(user);

  const hour = new Date().getHours();

  const [name, setName] = useState("");

  let timeOfDay;

  if (hour < 12) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  return (
    <div>
      <h1>
        Good {timeOfDay}
        {/* {req.session.user.firstName} */}
      </h1>
    </div>
  );
}

export default Greeting;
