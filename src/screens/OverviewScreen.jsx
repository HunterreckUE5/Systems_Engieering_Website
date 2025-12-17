import React, {useEffect, useState} from 'react';
import './OverviewScreen.css';
import DashboardCard from "../components/DashboardCard.jsx";
import {CiBatteryCharging} from "react-icons/ci";
import { MdInput } from "react-icons/md";
import { MdOutlineOutput } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import DashBoardSliderCard from "../components/DashBoardSliderCard.jsx";
import {getAllPosts} from "../AxiosHandler.jsx";

const OverviewScreen = ({
                             input = 4.2,   // kW
                             output = 2.1, // kW
                             batteryLevel = 78       // Percentage
                         }) => {



    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPosts();
                setData(response.data);
            } catch (error) {
                console.error("Fehler beim Laden:", error);
            }

            console.log("Daten wurden gepackt")
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>System Status</h2>
                <p>Real-time energy flow overview</p>
            </div>

            <div className="stats-grid">

                <DashboardCard textValue = {`${input} kWh`} title = {"Input"} iconPic= { <MdInput size = {50}/>}/>
                <DashboardCard textValue = {`${batteryLevel}%`} title = {"Battery"} iconPic= { <CiBatteryCharging size = {50}/>}/>
                <DashboardCard textValue = {`${output} kWh`} title = {"Output"} iconPic= { <MdOutlineOutput size = {50}/>}/>
                <DashboardCard textValue = {`Normal`} title = {"Mode"} iconPic= { <HiHomeModern  size = {50}/>}/>
                <DashboardCard textValue = {`${1000} kWh`} title = {"Total Produced"} iconPic= { <HiHomeModern  size = {50}/>}/>
                <DashboardCard textValue = {`${1500} kWh`} title = {"Total Consumed"} iconPic= { <HiHomeModern  size = {50}/>}/>

            </div>
            <div className="slider">
                <DashBoardSliderCard title={"Configuration"}/>
            </div>
        </div>
    );
};

export default OverviewScreen;