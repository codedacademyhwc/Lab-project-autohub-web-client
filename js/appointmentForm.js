const mapInitialData = () => {
  document.getElementById("auto-service-name").textContent =
    localStorage.getItem("autoServiceName");
  document.getElementById("address-text").textContent =
    localStorage.getItem("autoServiceAddress");
};

const setUpDatePicker = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const formattedFutureDate = currentDate.toISOString().split("T")[0];
  document.getElementById("date-input").min = formattedFutureDate;
}

const initial = () => {
  setUpDatePicker();
  mapInitialData();
};

initial();
