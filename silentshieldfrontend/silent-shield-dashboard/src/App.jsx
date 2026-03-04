import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const machineRef = ref(db, "machine_data");

    onValue(machineRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const arr = Object.values(val);
        setData(arr);
      }
    });
  }, []);

  const recentData = data.slice(-50);
  const latest = recentData.length > 0 ? recentData[recentData.length - 1] : null;

  const labels = recentData.map((d) =>
    new Date(d.timestamp * 1000).toLocaleTimeString()
  );

  const createChart = (label, values, color) => ({
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: color,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2
      }
    ]
  });

  const axChart = createChart("AX Vibration", recentData.map(d => d.ax), "cyan");
  const ayChart = createChart("AY Vibration", recentData.map(d => d.ay), "orange");
  const azChart = createChart("AZ Vibration", recentData.map(d => d.az), "lime");
  const soundChart = createChart("Sound Level", recentData.map(d => d.sound), "magenta");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* CENTER SECTION */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Silent Shield Dashboard
        </h1>

        {latest && (
          <div
            style={{
              padding: "25px",
              background: "#1b1b1b",
              borderRadius: "10px",
              textAlign: "center",
              marginBottom: "50px"
            }}
          >
            <h2>Latest Sensor Reading</h2>

            <p><b>AX:</b> {latest.ax}</p>
            <p><b>AY:</b> {latest.ay}</p>
            <p><b>AZ:</b> {latest.az}</p>
            <p><b>Sound:</b> {latest.sound}</p>
            <p><b>Score:</b> {latest.score}</p>

            <h3>
              Status: {latest.prediction === -1 ? "⚠️ Anomaly Detected" : "✅ Normal"}
            </h3>
          </div>
        )}
      </div>

      {/* FULL WIDTH GRAPH SECTION */}
      <div
        style={{
          width: "95%",
          margin: "0 auto",
          paddingBottom: "60px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px"
          }}
        >

          {/* AX */}
          <div
            style={{
              background: "#1b1b1b",
              padding: "25px",
              borderRadius: "10px",
              height: "420px"
            }}
          >
            <h2 style={{ textAlign: "center" }}>Vibration X Axis</h2>
            <Line data={axChart} options={chartOptions} />
          </div>

          {/* AY */}
          <div
            style={{
              background: "#1b1b1b",
              padding: "25px",
              borderRadius: "10px",
              height: "420px"
            }}
          >
            <h2 style={{ textAlign: "center" }}>Vibration Y Axis</h2>
            <Line data={ayChart} options={chartOptions} />
          </div>

          {/* AZ */}
          <div
            style={{
              background: "#1b1b1b",
              padding: "25px",
              borderRadius: "10px",
              height: "420px"
            }}
          >
            <h2 style={{ textAlign: "center" }}>Vibration Z Axis</h2>
            <Line data={azChart} options={chartOptions} />
          </div>

          {/* SOUND */}
          <div
            style={{
              background: "#1b1b1b",
              padding: "25px",
              borderRadius: "10px",
              height: "420px"
            }}
          >
            <h2 style={{ textAlign: "center" }}>Sound Level</h2>
            <Line data={soundChart} options={chartOptions} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;