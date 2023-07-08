document.getElementById('slideOutButton').addEventListener('click', function() {
    var button = this;
    let start = Date.now();

    let timer = setInterval(function() {
    let timePassed = Date.now() - start;

    button.style.left = timePassed / 5 + 'px';

    if (timePassed > 3000) {
      // Clear the animation interval
      clearInterval(timer);

      // Hide the button from the page
      button.style.display = 'none';
    }

    }, 20);
});

document.getElementById("replicateBtn").addEventListener("click", function() {
  cloneButtons(10);
});

function cloneButtons(numClones) {
  var buttonContainer = document.getElementById("buttonContainer");
  var startNumber = 0;
  if( buttonContainer.innerHTML !== "") {
    var lastElementIndex = buttonContainer.lastElementChild.dataset.index;
    startNumber = parseInt(lastElementIndex);
    numClones = parseInt(lastElementIndex) + parseInt(numClones);
  }
 
  for (var i = startNumber; i < numClones; i++) {
    var clone = document.createElement("button");
    var replicate_number = i + 1;
    clone.setAttribute("onclick", "printIndex(this)");
    clone.setAttribute("data-index", replicate_number);
    clone.textContent = "Replicate Me " + replicate_number;
    buttonContainer.appendChild(clone);
  }
}

function printIndex(element) {
  console.log(element.dataset.index);
}

document.getElementById("loadToDos").addEventListener("click", async function() {
    // Get API response
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
   
    // Storing data in form of JSON
    var data = await response.json();
    var slicedData = data.slice(0, 10);

    const toDosTable = document.getElementById('toDosTable');
    const toDosTable_header = toDosTable.querySelector('thead');
    const toDosTable_body = toDosTable.querySelector('tbody');

    toDosTable_header.innerHTML = '';
    var tr = document.createElement('tr');
    const headers_data = Object.keys(slicedData[0]);
    
    //populating table header
    headers_data.forEach((key) => {
      var th = document.createElement('th')
      th.innerHTML = key
      tr.appendChild(th);
    })
    toDosTable_header.appendChild(tr);
    toDosTable_body.innerHTML = '';
    
    //populating data into table body
    for (let i = 0; i < slicedData.length; i++){
      var tr = document.createElement('tr');
      headers_data.forEach((key) => {
        var td = document.createElement('td');
        td.innerHTML = slicedData[i][key]
        tr.appendChild(td);
      });
      toDosTable_body.appendChild(tr);
    }
});
