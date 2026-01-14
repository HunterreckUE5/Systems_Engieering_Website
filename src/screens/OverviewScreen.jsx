import React, { useEffect, useState, useRef } from 'react';
import './OverviewScreen.css';
import DashboardCard from "../components/DashboardCard.jsx";
import { CiBatteryCharging } from "react-icons/ci";
import { MdInput, MdOutlineOutput, MdPriorityHigh } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import DashBoardSliderCard from "../components/DashBoardSliderCard.jsx";
import { getTotalSolar } from "../api/AxiosHandler.jsx";
import { mapSolarData } from "../Zipper.jsx";
import SolarChart from "../components/LineChart.jsx";
import BatteryHandler from "../battery/BatteryHandler.jsx";

const USE_STUB = false;

// Initialisierung außerhalb, damit die Instanz über Renders hinweg bestehen bleibt
const batteryManager = new BatteryHandler(78, 80);

const generateStubData = () => ({
    data: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - (9 - i) * 60000).toISOString(),
        input: parseFloat((Math.random() * 5 + 1).toFixed(2)),
        output: parseFloat((Math.random() * 5 + 1).toFixed(2))
    }))
});

const OverviewScreen = () => {
    const [data, setData] = useState(null);
    const [threshold, setThreshold] = useState(80);
    const [liveInput, setLiveInput] = useState(0);
    const [liveOutput, setLiveOutput] = useState(0);
    const [liveBattery, setLiveBattery] = useState(78);

    // Diese Ref speichert den aktuellen Threshold, ohne den Effekt neu zu triggern
    const thresholdRef = useRef(80);

    const isChargingMode = liveBattery < threshold;
    const systemMode = isChargingMode ? "Batterie laden" : "Hoher Eigenverbrauch";

    const handleSliderChange = (event, newValue) => {
        setThreshold(newValue);
        // Wir aktualisieren die Ref und den Manager sofort
        thresholdRef.current = newValue;
        batteryManager.setThreshold(newValue);
    };

    useEffect(() => {
        const updateData = async () => {
            console.log("Daten-Update Zyklus gefeuert...");
            try {
                let response;
                let currentIn;
                let currentOut;

                if (USE_STUB) {
                    response = generateStubData();
                    const latest = response.data[response.data.length - 1];
                    currentIn = latest.input;
                    currentOut = latest.output;
                } else {
                    response = await getTotalSolar();
                    const latest = response.data[response.data.length - 1];
                    currentIn = latest.value;
                    currentOut = 4.0;
                }

                // UI States setzen
                setData(mapSolarData(response.data));
                setLiveInput(currentIn);
                setLiveOutput(currentOut);

                // Die Logik nutzt den batteryManager, der bereits
                // über handleSliderChange den aktuellen Threshold kennt.
                batteryManager.updateCapacity(currentIn, currentOut);
                setLiveBattery(batteryManager.getCurrentCapacity());

            } catch (error) {
                console.error("Fehler beim Laden:", error);
            }
        };

        // Initialer Aufruf beim Start
        updateData();

        // Das Intervall hat nun ein leeres Dependency-Array.
        // Es wird einmal gestartet und läuft alle 5s, egal was am Slider passiert.
        const interval = setInterval(updateData, 5000);

        return () => clearInterval(interval);
    }, []); // LEERES ARRAY: Verhindert Neustart bei Slider-Bewegung

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>System Status</h2>
                <p>Aktualisierung alle 5 Sekunden {USE_STUB && "(Simulationsmodus)"}</p>
            </div>

            <div className="stats-grid">
                <DashboardCard
                    textValue={`${liveInput.toFixed(2)} kWh`}
                    title={"Eingang (PV)"}
                    iconPic={<MdInput size={50}/>}
                />
                <DashboardCard
                    textValue={`${liveBattery}%`}
                    title={"Batterie"}
                    iconPic={<CiBatteryCharging size={50}/>}
                />
                <DashboardCard
                    textValue={`${liveOutput.toFixed(2)} kWh`}
                    title={"Ausgang (Last)"}
                    iconPic={<MdOutlineOutput size={50}/>}
                />

                <DashboardCard
                    textValue={systemMode}
                    title={"Modus"}
                    iconPic={isChargingMode ? <CiBatteryCharging size={50}/> : <MdPriorityHigh size={50}/>}
                />
                <DashboardCard textValue={`1000 kWh`} title={"Gesamt Erzeugt"} iconPic={<HiHomeModern size={50}/>}/>
                <DashboardCard textValue={`500 kWh`} title={"Gesamt Verbrauch"} iconPic={<HiHomeModern size={50}/>}/>
            </div>

            <div className="slider">
                <DashBoardSliderCard
                    title={`Batterie Limit: ${threshold}%`}
                    value={threshold}
                    onChange={handleSliderChange}
                />
            </div>

            <div className="slider">
                <SolarChart chartData={data}/>
            </div>
        </div>
    );
};

export default OverviewScreen;