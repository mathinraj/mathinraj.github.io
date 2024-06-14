document.getElementById('upload-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('file-input');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    
    generateTable(data);
};

function generateTable(data) {
    const tableContainer = document.getElementById('table-container');
    let tableHtml = '<table border="1"><tr><th>Department</th><th>Count</th><th>Failures</th></tr>';
    
    for (const [dept, details] of Object.entries(data)) {
        let failures = '';
        for (const [failure, count] of Object.entries(details.failures)) {
            failures += `${failure} - ${count}<br>`;
        }
        tableHtml += `<tr><td>${dept}</td><td>${details.count}</td><td>${failures}</td></tr>`;
    }

    tableHtml += '</table>';
    tableContainer.innerHTML = tableHtml;
}
