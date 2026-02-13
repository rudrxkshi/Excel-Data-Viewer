import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f172a",
        fontFamily: "Segoe UI, sans-serif",
        color: "#f1f5f9",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>
          Excel Data Viewer
        </h1>

        <label
          style={{
            padding: "10px 22px",
            backgroundColor: "#2563eb",
            borderRadius: "8px",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Choose File
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {fileName && (
          <div style={{ marginTop: "12px", color: "#94a3b8" }}>
            {fileName}
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1e293b",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      padding: "12px",
                      backgroundColor: "#334155",
                      textAlign: "left",
                      fontWeight: "500",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "10px",
                        borderTop: "1px solid #334155",
                      }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
