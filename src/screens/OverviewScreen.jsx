import React, { useEffect, useState, useRef } from 'react';
import './OverviewScreen.css';
import DashboardCard from "../components/DashboardCard.jsx";
import { CiBatteryCharging } from "react-icons/ci";
import { MdInput, MdOutlineOutput} from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import DashBoardSliderCard from "../components/DashBoardSliderCard.jsx";
import { getTotalSolar } from "../api/AxiosHandler.jsx";
import { mapSolarData } from "../Zipper.jsx";
import SolarChart from "../components/LineChart.jsx";
import BatteryHandler from "../battery/BatteryHandler.jsx";
import DataHistory from "../historiedata/DataHistory.jsx";
import { GiElectric } from "react-icons/gi";
import localStorageHelper from "../LocalStorageHelper.jsx"

const USE_STUB = false;
const BATTERY_TRESHOLD_LOCALSTORAGE_KEY = "batteryThreshold";

// Initialisierung außerhalb, damit die Instanz über Renders hinweg bestehen bleibt
const batteryManager = new BatteryHandler(78, 80);
const dataHistory = new DataHistory(0,0)

const generateStubData = () => ({
    data: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - (9 - i) * 60000).toISOString(),
        input: parseFloat((Math.random() * 5 + 1).toFixed(2)),
        output: parseFloat((Math.random() * 5 + 1).toFixed(2))
    }))
});

const OverviewScreen = () => {

    let lsBatteryThreshold = localStorageHelper.get(BATTERY_TRESHOLD_LOCALSTORAGE_KEY);

    if (lsBatteryThreshold < 0) {
        lsBatteryThreshold = 50;
    }

    const [data, setData] = useState(null);
    const [threshold, setThreshold] = useState(lsBatteryThreshold);
    const [liveInput, setLiveInput] = useState(0);
    const [liveOutput, setLiveOutput] = useState(0);
    const [liveBattery, setLiveBattery] = useState(78);
    const thresholdRef = useRef(lsBatteryThreshold);

    const isChargingMode = liveBattery < threshold;
    const systemMode = isChargingMode ? "Batterie laden" : "Solar Energie";

    const handleSliderChange = (event, newValue) => {
        setThreshold(newValue);
        thresholdRef.current = newValue;
        batteryManager.setThreshold(newValue);
    };

    useEffect(() => {
        const updateData = async () => {
            console.log("Daten-Update Zyklus gefeuert...");
            try {
                let response; // Diese Variable muss gefüllt werden
                let currentIn = 0;
                let currentOut = 4.0; // Standardwert für den Real-Modus

                if (USE_STUB) {
                    response = generateStubData();
                    const latest = response.data[response.data.length - 1];
                    currentIn = latest.input;
                    currentOut = latest.output;

                } else {
                    // ECHTER API MODUS
                    response = await getTotalSolar(); // Nur EINMAL aufrufen

                    if (response && response.data && response.data.length > 0) {
                        const mapped = mapSolarData(response.data);
                        // Den aktuellsten Wert aus den gemappten Daten nehmen
                        const latest = mapped[mapped.length - 1];
                        currentIn = latest.value;
                        currentOut = 4.0; // Hier dein gewünschter Real-Verbrauch
                    }
                }

                if (response && response.data) {
                    const meineDaten = mapSolarData(response.data);
                    setData(meineDaten);

                    setLiveInput(currentIn);
                    setLiveOutput(currentOut);

                    batteryManager.updateCapacity(currentIn, currentOut);
                    setLiveBattery(batteryManager.getCurrentCapacity());
                    dataHistory.updateAmountOfProducedElectricity(currentIn)
                    dataHistory.updateAmountOfConsumedElectricity(currentOut)
                }

            } catch (error) {
                console.error("Fehler beim Laden oder Verarbeiten:", error);
            }
        };

        updateData();
        const interval = setInterval(updateData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>System Status</h2>
            </div>

            <div className="stats-grid">
                <DashboardCard
                    textValue={`${liveInput.toFixed(2)} kWh`}
                    title={"Eingang (PV)"}
                    iconPic={<MdInput size={50} />}
                />
                <DashboardCard
                    textValue={`${liveBattery}%`}
                    title={"Batterie"}
                    iconPic={<CiBatteryCharging size={50} />}
                />
                <DashboardCard
                    textValue={`${liveOutput.toFixed(2)} kWh`}
                    title={"Ausgang (Last)"}
                    iconPic={<MdOutlineOutput size={50} />}
                />

                <DashboardCard
                    textValue={systemMode}
                    title={"Modus"}
                    iconPic={isChargingMode ? <CiBatteryCharging size={50} /> : <GiElectric size={50} />}
                />
                <DashboardCard textValue={`${dataHistory.getAmountOfProducedElectircity()} kWh`} title={"Gesamt Erzeugt"} iconPic={<HiHomeModern size={50} />} />
                <DashboardCard textValue={`${dataHistory.getAmountOfConsumedElectricity()} kWh`} title={"Gesamt Verbrauch"} iconPic={<HiHomeModern size={50} />} />
            </div>

            <div className="slider">
                <DashBoardSliderCard
                    title={`Batterie Limit: ${threshold}%`}
                    value={threshold}
                    onChange={handleSliderChange}
                />
            </div>

            <div className="slider">
                <SolarChart chartData={data} />
            </div>
        </div>
    );
};

export default OverviewScreen;