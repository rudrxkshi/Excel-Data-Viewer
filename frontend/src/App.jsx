import { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Excel Data Viewer</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />

      <br /><br />

      {data.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
