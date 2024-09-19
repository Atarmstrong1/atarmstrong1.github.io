function calculate() {
    const resultsTable = document.getElementById('resultsTable');
    const validResults = []; // Array to store valid results

    while (true) {
        let x = prompt("Enter the first number (x):");
        if (x === null) break; // Exit if Cancel is clicked

        let y = prompt("Enter the second number (y):");
        if (y === null) break; // Exit if Cancel is clicked

        let operator = prompt("Enter an arithmetic operator (+, -, *, /, %):");
        if (operator === null) break; // Exit if Cancel is clicked

        let result;
        x = parseFloat(x);
        y = parseFloat(y);

        if (isNaN(x) || isNaN(y)) {
            result = "Error: Non-numeric input";
        } else {
            switch (operator) {
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = y !== 0 ? x / y : "Error: Division by zero";
                    break;
                case '%':
                    result = y !== 0 ? x % y : "Error: Division by zero";
                    break;
                default:
                    result = "Error: Invalid operator";
            }
        }

        // Append the result to the table
        const newRow = resultsTable.insertRow();
        newRow.insertCell(0).textContent = x;
        newRow.insertCell(1).textContent = operator;
        newRow.insertCell(2).textContent = y;
        newRow.insertCell(3).textContent = result;

        // Store valid results
        if (typeof result === 'number') {
            validResults.push(result);
        }
    }

    // Construct summary table
    constructSummaryTable(validResults);
}

function constructSummaryTable(results) {
    const summaryTable = document.createElement('table');
    summaryTable.style.width = '100%';
    summaryTable.style.borderCollapse = 'collapse';
    summaryTable.style.marginTop = '20px';

    const tbody = document.createElement('tbody');
    const headers = ['Metric', 'Value'];
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ccc';
        th.style.padding = '10px';
        th.style.backgroundColor = '#f4f4f4';
        headerRow.appendChild(th);
    });

    tbody.appendChild(headerRow);

    if (results.length === 0) {
        const errorRow = document.createElement('tr');
        const errorCell = document.createElement('td');
        errorCell.colSpan = 2;
        errorCell.textContent = "No valid results to display.";
        errorRow.appendChild(errorCell);
        tbody.appendChild(errorRow);
    } else {
        const total = results.reduce((acc, val) => acc + val, 0);
        const min = Math.min(...results);
        const max = Math.max(...results);
        const avg = total / results.length;

        const summaryData = [
            { label: 'Total', value: total },
            { label: 'Minimum', value: min },
            { label: 'Maximum', value: max },
            { label: 'Average', value: avg.toFixed(2) }
        ];

        summaryData.forEach(item => {
            const row = document.createElement('tr');
            const cellLabel = document.createElement('td');
            const cellValue = document.createElement('td');

            cellLabel.textContent = item.label;
            cellValue.textContent = item.value;

            cellLabel.style.border = '1px solid #ccc';
            cellLabel.style.padding = '10px';
            cellValue.style.border = '1px solid #ccc';
            cellValue.style.padding = '10px';

            row.appendChild(cellLabel);
            row.appendChild(cellValue);
            tbody.appendChild(row);
        });
    }

    summaryTable.appendChild(tbody);
    document.body.appendChild(summaryTable);
}

// Start the calculation process
calculate();