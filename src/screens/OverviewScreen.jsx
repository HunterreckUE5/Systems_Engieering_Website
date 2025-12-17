import React from 'react';
import './OverviewScreen.css';
import DashboardCard from "../components/DashboardCard.jsx";
import {CiBatteryCharging} from "react-icons/ci";

const OverviewScreen = ({
                             solarOutput = 4.2,   // kW
                             houseConsumption = 2.1, // kW
                             batteryLevel = 78       // Percentage
                         }) => {

    // Helper to determine battery color based on charge
 /*   const getBatteryColor = (level) => {
        if (level > 50) return 'var(--battery-high)';
        if (level > 20) return 'var(--battery-color)';
        return 'var(--battery-low)';
    };*/

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>System Status</h2>
                <p>Real-time energy flow overview</p>
            </div>

            <div className="stats-grid">

                <DashboardCard textValue = {"100%"} title = {"Battery"} iconPic= { <CiBatteryCharging  size = {100}/>}/>
                <DashboardCard textValue = {"100%"} title = {"Battery"} iconPic= { <CiBatteryCharging  size = {100}/>}/>
                <DashboardCard textValue = {"100%"} title = {"Battery"} iconPic= { <CiBatteryCharging  size = {100}/>}/>
            </div>
        </div>
    );
};

export default OverviewScreen;