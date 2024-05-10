var expanded = false;

function showMarks() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
function showModels() {
  var checkboxes_2 = document.getElementById("checkboxes_2");
  if (!expanded) {
    checkboxes_2.style.display = "block";
    expanded = true;
  } else {
    checkboxes_2.style.display = "none";
    expanded = false;
  }
}

var openMenu = false;

function showRegions() {
  var checkboxes = document.getElementById("checkboxes_3");
  if (!openMenu) {
    checkboxes.style.display = "block";
    openMenu = true;
  } else {
    checkboxes.style.display = "none";
    openMenu = false;
  }
}
function showTowns() {
  var checkboxes_2 = document.getElementById("checkboxes_4");
  if (!openMenu) {
    checkboxes_2.style.display = "block";
    openMenu = true;
  } else {
    checkboxes_2.style.display = "none";
    openMenu = false;
  }
}

const URL_REGION_CARS = "./data/cars.json";

const request = (method, URL_REGION_TOWNS, body = null) => {
  return fetch(URL_REGION_CARS, {
    method: method,
    body: body,
  }).then((request) => {
    return request.json();
  });
};

request("GET", URL_REGION_CARS).then((data) => {
  var arrAllSelectedModels = new Array();
  const toggleTextInSelect = (event) => {
    var activateInput = event.target.parentElement.querySelector("input");
    var allSelectedForModels = document.getElementById("allSelected_2");
    if (activateInput.checked) {
      allSelectedForModels.innerHTML = "";
      arrAllSelectedModels.push(activateInput.value);
      allSelectedForModels.append(arrAllSelectedModels.join(", "));
    } else {
      allSelectedForModels.innerHTML = "";
      arrAllSelectedModels = arrAllSelectedModels.filter(
        (elem) => elem !== activateInput.value
      );
      allSelectedForModels.append(arrAllSelectedModels.join(", "));
      if (arrAllSelectedModels.length === 0) {
        allSelectedForModels.innerText = "Выберите модель...";
      }
    }
    let labelModel = event.target.parentElement;
    labelModel.classList.toggle("activate");
  };

  var arrAllSelectedMarks = new Array();
  const addNewSelect = (event) => {
    let selectBox = document.getElementsByClassName("selectBox_Models");
    selectBox[0].classList.remove("avoid-click");

    let labelModel = event.target.parentElement;
    labelModel.classList.toggle("activate");

    let input = event.target.parentElement.querySelector("input");
    var modelsID = input.id;
    var allSelectedForModels = document.getElementById("allSelected_2");

    let allSelected = document.getElementById("allSelected");

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === modelsID) {
        var models = data[i].models;
        if (input.checked) {
          allSelected.innerHTML = "";
          arrAllSelectedMarks.push(input.value);
          allSelected.append(arrAllSelectedMarks.join(", "));
          for (let i = 0; i < models.length; i++) {
            const checkboxes_2 = document.getElementById("checkboxes_2");
            const uniqueID = crypto.randomUUID();

            var inputModels = document.createElement("input");
            inputModels.setAttribute("type", "checkbox");
            inputModels.setAttribute("id", uniqueID);
            inputModels.setAttribute("class", "subOption_2");
            inputModels.setAttribute("value", models[i].name);
            inputModels.onclick = toggleTextInSelect;

            const labelModels = document.createElement("label");
            labelModels.setAttribute("for", uniqueID);
            labelModels.setAttribute("class", "labelOption_2");
            labelModels.append(inputModels, models[i].name);

            checkboxes_2.appendChild(labelModels);
          }
        } else {
          let deleteAllModels = data[i].models;

          for (let i = 0; i < deleteAllModels.length; i++) {
            arrAllSelectedModels = arrAllSelectedModels.filter(
              (elem) => elem !== deleteAllModels[i].name
            );
          }
          allSelectedForModels.innerHTML = "";
          allSelectedForModels.append(arrAllSelectedModels.join(", "));
          if (arrAllSelectedModels.length === 0) {
            allSelectedForModels.innerText = "Выберите модель...";
          }

          let deleteInputs = document.getElementsByClassName("subOption_2");
          let deleteLabels = document.getElementsByClassName("labelOption_2");

          for (let i = 0; i < deleteInputs.length; i++) {
            for (let j = 0; j < models.length; j++) {
              if (deleteInputs[i].value === models[j].name) {
                deleteInputs[i].remove();
                deleteLabels[i].remove();
                allSelected.innerHTML = "";
                arrAllSelectedMarks = arrAllSelectedMarks.filter(
                  (elem) => elem !== input.value
                );
                allSelected.append(arrAllSelectedMarks.join(", "));
                if (arrAllSelectedMarks.length === 0) {
                  allSelected.innerText = "Выберите марку...";

                  let selectBox =
                    document.getElementsByClassName("selectBox_Models");
                  let checkboxModels = document.querySelector("#checkboxes_2");
                  selectBox[0].classList.add("avoid-click");
                  checkboxModels.style.display = "none";
                }
              }
            }
          }
        }
      }
    }
  };

  var ID, model, name;
  for (let i = 0; i < data.length; i++) {
    ID = data[i].id;
    model = data[i].models;
    name = data[i].name;
    const container = document.getElementById("checkboxes");

    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", ID);
    inputElement.setAttribute("class", "subOption");
    inputElement.setAttribute("value", name);
    inputElement.setAttribute("name", "car_brands");
    inputElement.onclick = addNewSelect;

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", ID);
    labelElement.setAttribute("class", "subOption_label");
    labelElement.append(inputElement, name);

    container.appendChild(labelElement);
  }
});

function filterFunctionForMarks() {
  var inputSearch, filter;
  inputSearch = document.getElementById("search");
  filter = inputSearch.value.toUpperCase();
  var allLabels = document.getElementsByClassName("subOption_label");
  var allInputs = document.getElementsByClassName("subOption");
  for (i = 0; i < allInputs.length; i++) {
    txtValue = allInputs[i].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      allInputs[i].style.display = "";
      allLabels[i].style.display = "";
    } else {
      allInputs[i].style.display = "none";
      allLabels[i].style.display = "none";
    }
  }
}
function filterFunctionForModels() {
  var inputSearch, filter;
  inputSearch = document.getElementById("search_2");
  filter = inputSearch.value.toUpperCase();
  var allLabels = document.getElementsByClassName("labelOption_2");
  var allInputs = document.getElementsByClassName("subOption_2");
  for (i = 0; i < allInputs.length; i++) {
    txtValue = allInputs[i].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      allInputs[i].style.display = "";
      allLabels[i].style.display = "";
    } else {
      allInputs[i].style.display = "none";
      allLabels[i].style.display = "none";
    }
  }
}

const URL_REGION_TOWNS = "./data/RegionCites.json";

const requestCars = (method, URL_REGION_TOWNS, body = null) => {
  return fetch(URL_REGION_TOWNS, {
    method: method,
    body: body,
  }).then((request) => {
    return request.json();
  });
};
requestCars("GET", URL_REGION_TOWNS).then((data) => {
  var arrAllSelectedTowns = new Array();
  const toggleTextInSelect = (event) => {
    var activateInput = event.target.parentElement.querySelector("input");
    var allSelectedForTowns = document.getElementById("allSelected_4");
    if (activateInput.checked) {
      allSelectedForTowns.innerHTML = "";
      arrAllSelectedTowns.push(activateInput.value);
      allSelectedForTowns.append(arrAllSelectedTowns.join(", "));
    } else {
      allSelectedForTowns.innerHTML = "";
      arrAllSelectedTowns = arrAllSelectedTowns.filter(
        (elem) => elem !== activateInput.value
      );
      allSelectedForTowns.append(arrAllSelectedTowns.join(", "));
      if (arrAllSelectedTowns.length === 0) {
        allSelectedForTowns.innerText = "Выберите город...";
      }
    }
    let labelModel = event.target.parentElement;
    labelModel.classList.toggle("activate");
  };
  let arrAllSelectedRegions = new Array();

  const addNewSelect = (event) => {
    let selectBox = document.getElementsByClassName("selectBox_Towns");
    selectBox[0].classList.remove("avoid-click");

    let labelModel = event.target.parentElement;
    labelModel.classList.toggle("activate");

    let input = event.target.parentElement.querySelector("input");
    var key_super_input = input.id;
    var allTowns = allValues[key_super_input];
    var allSelectedForTowns = document.getElementById("allSelected_4");
    let allSelected = document.getElementById("allSelected_3");

    if (input.checked) {
      allSelected.innerHTML = "";
      arrAllSelectedRegions.push(input.value);
      allSelected.append(arrAllSelectedRegions.join(", "));

      for (let i = 0; i < allTowns.length; i++) {
        const checkboxes_2 = document.getElementById("checkboxes_4");
        const uniqueID = crypto.randomUUID();

        var inputTowns = document.createElement("input");
        inputTowns.setAttribute("type", "checkbox");
        inputTowns.setAttribute("id", uniqueID);
        inputTowns.setAttribute("class", "subOption_2");
        inputTowns.setAttribute("value", allTowns[i]);
        inputTowns.onclick = toggleTextInSelect;

        const labelTowns = document.createElement("label");
        labelTowns.setAttribute("for", uniqueID);
        labelTowns.setAttribute("class", "labelOption_2");
        labelTowns.append(inputTowns, allTowns[i]);

        checkboxes_2.appendChild(labelTowns);
      }
    } else {
      let deleteAllTowns = allTowns;

      for (let i = 0; i < deleteAllTowns.length; i++) {
        arrAllSelectedTowns = arrAllSelectedTowns.filter(
          (elem) => elem !== deleteAllTowns[i]
        );
      }
      allSelectedForTowns.innerHTML = "";
      allSelectedForTowns.append(arrAllSelectedTowns.join(", "));
      if (arrAllSelectedTowns.length === 0) {
        allSelectedForTowns.innerText = "Выберите город...";
      }

      let deleteInputs = document.getElementsByClassName("subOption_2");
      let deleteLabels = document.getElementsByClassName("labelOption_2");

      for (let i = 0; i < deleteInputs.length; i++) {
        for (let j = 0; j < allTowns.length; j++) {
          if (deleteInputs[i].value === allTowns[j]) {
            deleteInputs[i].remove();
            deleteLabels[i].remove();
            allSelected.innerHTML = "";
            arrAllSelectedRegions = arrAllSelectedRegions.filter(
              (elem) => elem !== input.value
            );
            allSelected.append(arrAllSelectedRegions.join(", "));
            if (arrAllSelectedRegions.length === 0) {
              allSelected.innerText = "Выберите регион...";

              let selectBox =
                document.getElementsByClassName("selectBox_Towns");
              let checkboxModels = document.querySelector("#checkboxes_4");
              selectBox[0].classList.add("avoid-click");
              checkboxModels.style.display = "none";
            }
          }
        }
      }
    }
  };

  var allKeys = Object.keys(data);
  var allValues = Object.values(data);

  for (let i = 0; i < allKeys.length; i++) {
    const container = document.getElementById("checkboxes_3");
    let labelID = i;
    let inputID = i;

    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", inputID);
    inputElement.setAttribute("class", "subOption");
    inputElement.setAttribute("value", allKeys[i]);
    inputElement.onclick = addNewSelect;

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", labelID);
    labelElement.setAttribute("class", "subOption_label");
    labelElement.append(inputElement, allKeys[i]);

    container.appendChild(labelElement);
  }
});
function filterFunctionForRegions() {
  var inputSearch, filter;
  inputSearch = document.getElementById("search_3");
  filter = inputSearch.value.toUpperCase();
  var allLabels = document.getElementsByClassName("subOption_label");
  var allInputs = document.getElementsByClassName("subOption");
  for (i = 0; i < allInputs.length; i++) {
    txtValue = allInputs[i].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      allInputs[i].style.display = "";
      allLabels[i].style.display = "";
    } else {
      allInputs[i].style.display = "none";
      allLabels[i].style.display = "none";
    }
  }
}

function filterFunctionForTowns() {
  var inputSearch, filter;
  inputSearch = document.getElementById("search_4");
  filter = inputSearch.value.toUpperCase();
  var allLabels = document.getElementsByClassName("labelOption_2");
  var allInputs = document.getElementsByClassName("subOption_2");
  for (i = 0; i < allInputs.length; i++) {
    txtValue = allInputs[i].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      allInputs[i].style.display = "";
      allLabels[i].style.display = "";
    } else {
      allInputs[i].style.display = "none";
      allLabels[i].style.display = "none";
    }
  }
}

const clearFunc = (event) => {
  let priceInputs = document.getElementsByClassName("inputElem");
  let yearInputs = document.getElementsByClassName("inputElem_2");

  for (let i = 0; i < priceInputs.length; i++) {
    priceInputs[i].value = "";
  }
  for (let i = 0; i < yearInputs.length; i++) {
    yearInputs[i].value = "";
  }

  let allSubOptions = document.getElementsByClassName("subOption");
  for (let i = 0; i < allSubOptions.length; i++) {
    if (allSubOptions[i].checked) {
      allSubOptions[i].click();
    }
  }
};
