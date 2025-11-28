$(document).ready(function () {

    //Checks Max and Min column to see if the min column is greater than the max and tells the user that the min column cannot be greater than the max column
    $.validator.addMethod("greaterThanColumn", function(value, element ) {
        const minColumn = parseInt($("#minColumn").val());
        const maxColumn = parseInt($("#maxColumn").val());
        return minColumn <= maxColumn;
    }, "Minimum column value cannot be greater than maximum column value");

    //Checks Max and Min row to see if the min row is greater than the max and tells the user that the min row cannot be greater than the max row
    $.validator.addMethod("greaterThanRow", function(value, element ) {
        const minRow = parseInt($("#minRow").val());
        const maxRow = parseInt($("#maxRow").val());
        return minRow <= maxRow;
    }, "Minimum Row value cannot be greater than maximum Row value");    

    // full validation to make sure the user iputs a number, makes sure the min isnt greater than the max, and the range is between -50,50
    $("#form").validate({
            rules: {
                minColumn: {
                    required: true,
                    number: true,
                    min: -50,
                    max: 50,
                },
                maxColumn: {
                    required: true,
                    number: true,
                    min: -50,
                    max: 50,
                    greaterThanColumn: true
                },
                minRow: {
                    required: true,
                    number: true,
                    min: -50,
                    max: 50,
                },
                maxRow: {
                    required: true,
                    number: true,
                    min: -50,
                    max: 50,
                    greaterThanRow: true
                }
            },
            //prints out messages for any user errors and informs them on the error and how to fix it
            messages: {
                minColumn: {
                    required: "Please enter a minimum column value.",
                    number: "Value must be a valid number.",
                    min: "Value must be at least -50.",
                    max: "Value must be at most 50.",
                    greaterThanColumn: "Minimum column must be ≤ maximum column."
                },
                maxColumn: {
                    required: "Please enter a maximum column value.",
                    number: "Value must be a valid number.",
                    min: "Value must be at least -50.",
                    max: "Value must be at most 50.",
                    greaterThanColumn: "Maximum column must be ≥ minimum column."
                },
                minRow: {
                    required: "Please enter a minimum row value.",
                    number: "Value must be a valid number.",
                    min: "Value must be at least -50.",
                    max: "Value must be at most 50.",
                    greaterThanRow: "Minimum row must be ≤ maximum row."
                },
                maxRow: {
                    required: "Please enter a maximum row value.",
                    number: "Value must be a valid number.",
                    min: "Value must be at least -50.",
                    max: "Value must be at most 50.",
                    greaterThanRow: "Maximum row must be ≥ minimum row."
                }
            },

            errorPlacement: function (error, element) {
                error.appendTo(element.next(".errorMessage"));
            },

            submitHandler: function () {
                createNewTableTab();
            }
        });

});

function generateTable(event) {
    event.preventDefault(); 
    // Gets input values
    let minColumn = parseInt(document.getElementById("minColumn").value);
    let maxColumn = parseInt(document.getElementById("maxColumn").value);
    let minRow = parseInt(document.getElementById("minRow").value);
    let maxRow = parseInt(document.getElementById("maxRow").value);

    let errorMessage = document.getElementById("errorMessage");
    let table = document.getElementById("multiplicationTable");

    errorMessage.textContent = "";
    table.innerHTML = "";
    // Tests for input errors
    if (isNaN(minColumn) || isNaN(maxColumn) || isNaN(minRow) || isNaN(maxRow)) {
        errorMessage.textContent = "All inputs must be valid integers.";
        return;
    }
    if (minColumn > maxColumn) {
        errorMessage.textContent = "Minimum column value cannot be greater than maximum column value.";
        return;
    }
    if (minRow > maxRow) {
        errorMessage.textContent = "Minimum row value cannot be greater than maximum row value.";
        return;
    }

    // Builds multiplication table
    let headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th")); 

    for (let j = minColumn; j <= maxColumn; j++) {
        let th = document.createElement("th");
        th.textContent = j;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let i = minRow; i <= maxRow; i++) {
        let row = document.createElement("tr");

        let th = document.createElement("th");
        th.textContent = i;
        row.appendChild(th);

        for (let j = minColumn; j <= maxColumn; j++) {
            let cell = document.createElement("td");
            cell.textContent = i * j;
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
    document.querySelector(".tableDiv").style.display = "block";

}
