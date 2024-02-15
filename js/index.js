const listLov = async () => {

  try {

    const apiEndpoint = 'http://localhost:8080/api/autohub/web-service/lov/province';

    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((httpResponse) => httpResponse.json());

    let provinces = [];

    for (let i = 0; i < response.data.length; i++) {
      let province = {
        'id': response.data[i].id,
        'provinceTh': response.data[i].provinceTh
      }

      provinces.push(province);
    }

    addOptionToDropdown(provinces);
  }
  catch {
    console.error('Error fetching data:', error.message);
  }
}

const addTableRow = (records) => {
  // records = list of record object

  // example of record

  // record = {
  //     "id" : 1
  //     "name" : "ศูนย์บริหารซ่อมสี และช่วงล่าง",
  //     "address" : "78/2 ถ.วิภาวดี แขวงจันทเกษม เขตจตุจักร กรุงเทพ 10900",
  //     "province" : "กรุงเทพมหานคร",
  //     "tel": "02-1111111"
  // }

  if (records == null || records.length == 0) {
    return false;
  }

  for (let i = 0; i < records.length; i++) {
    var table = document.getElementById("search-result");
    var newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = i + 1;
    newRow.appendChild(cell1);

    var cell2 = document.createElement("td");
    cell2.textContent = records[i] ? records[i].name : "";
    newRow.appendChild(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = records[i] ? records[i].address : "";
    newRow.appendChild(cell3);

    var cell4 = document.createElement("td");
    cell4.textContent = records[i] ? records[i].province : "";
    newRow.appendChild(cell4);

    var cell5 = document.createElement("td");
    cell5.textContent = records[i] ? records[i].tel : "";
    newRow.appendChild(cell5);

    var cell6 = document.createElement("td");
    cell6.id = "button-column";

    var buttonDiv = document.createElement("button");
    buttonDiv.className = "select-service-button";
    buttonDiv.onclick = function () {
      selectAutoService(records[i] ? records[i].id : 0,
        records[i] ? records[i].name : "",
        records[i] ? records[i].address : "");
    };

    var buttonText = document.createElement("p");
    buttonText.id = "select-service-button-text";
    buttonText.textContent = "เลือก";

    buttonDiv.appendChild(buttonText);
    cell6.appendChild(buttonDiv);
    newRow.appendChild(cell6);

    // Append the new row to the table
    table.appendChild(newRow);
  }

  return true;
}

const addOptionToDropdown = (provinces) => {
  try {

    if (provinces.length == 0) return;

    let dropdown = document.getElementById("select-province");

    for (let i = 0; i < provinces.length; i++) {

      let option = document.createElement("option");
      option.value = provinces[i].id;
      option.text = provinces[i].provinceTh;
      dropdown.appendChild(option)
    }
  }
  catch {
    console.error('Error fetching data:', error.message);
  }
}

const selectAutoService = (id, name, address) => {
  localStorage.setItem("autoServiceId", id);
  localStorage.setItem("autoServiceName", name);
  localStorage.setItem("autoServiceAddress", address);
  window.location.href = 'page/appointmentForm.html'
}

const initial = async () => {
  await listLov();
  document.getElementById('result-main-container').style.display = 'none';
}

initial();
