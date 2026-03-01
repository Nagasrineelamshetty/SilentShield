import serial
import pandas as pd
import time
import joblib

# =============================
# USER SETTINGS
# =============================
SERIAL_PORT = "COM3"       # Change if needed (e.g., COM4)
BAUD_RATE = 115200
ANOMALY_TIME_LIMIT = 12    # seconds

# =============================
# LOAD TRAINED MODEL
# =============================
model = joblib.load("isolation_forest_model.pkl")

# =============================
# SERIAL CONNECTION
# =============================
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
time.sleep(5)

print("🚀 Real-time monitoring started...")
print("Waiting for sensor data...\n")

# =============================
# ANOMALY TIMER
# =============================
anomaly_start_time = None

# =============================
# MAIN LOOP
# =============================
while True:
    try:
        line = ser.readline().decode("utf-8", errors="ignore").strip()
        if not line:
            continue

        print("RAW LINE:", line, flush=True)

        values = line.split(",")
        if len(values) < 5:
            print("Skipping line, not enough values:", values, flush=True)
            continue

        # Ignore first column (timestamp)
        ax, ay, az, sound = map(float, values[1:5])

        df = pd.DataFrame([[ax, ay, az, sound]], columns=["ax", "ay", "az", "sound"])

        try:
            prediction = model.predict(df)[0]
            score = model.decision_function(df)[0]
        except Exception as e:
            print("Model error:", e, flush=True)
            continue

        current_time = time.time()
        if prediction == -1:
            print(f"🚨 ANOMALY | score={score:.3f}", flush=True)
            if anomaly_start_time is None:
                anomaly_start_time = current_time
            if current_time - anomaly_start_time >= ANOMALY_TIME_LIMIT:
                print("\n🛑 STOP THE MOTOR! Persistent anomaly detected.\n", flush=True)
                break
        else:
            print(f"✅ NORMAL | score={score:.3f}", flush=True)
            anomaly_start_time = None

    except KeyboardInterrupt:
        print("\nMonitoring stopped by user.", flush=True)
        break
    except Exception as e:
        print("Skipping error:", e, flush=True)
