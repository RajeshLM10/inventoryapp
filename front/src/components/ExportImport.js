import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import axios from 'axios';

const ExportImport = () => {
  const [data, setData] = useState([]);
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setData(result.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  const handleExportData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setExportData(response.data);

      // Trigger CSV download using CSVLink
      document.getElementById('csv-link').click();
    } catch (error) {
      console.error('Error fetching data for export:', error);
    }
  };

  return (
    <div>
      <h2>Export and Import Data</h2>

      {/* Export button */}
      <button onClick={handleExportData}>Export Data</button>
      {/* Hidden CSVLink for triggering download */}
      <CSVLink data={exportData} headers={exportData.length > 0 ? Object.keys(exportData[0]) : []} filename={'inventory.csv'} id="csv-link" style={{ display: 'none' }}>
        Export Data
      </CSVLink>

      {/* Import button */}
      <input type="file" accept=".csv" onChange={handleImport} />
    </div>
  );
};

export default ExportImport;
