function Greeting() {
  const hour = new Date().getHours();

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
        Good {timeOfDay}, <br /> {localStorage.getItem("firstName")}
      </h1>
    </div>
  );
}

export default Greeting;
