import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {CircularProgress} from "@mui/material";

const timeFormatter = (date) => {
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const mwFormatter = (value) => `${(value).toFixed(2)} W`;

export default function SolarChart({ chartData }) {

    if (!chartData || chartData.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
                <p style={{ marginLeft: 10 }}>Warte auf Daten...</p>
            </div>
        );
    }

    return (
        <LineChart
            dataset={chartData}

            xAxis={[
                {
                    dataKey: 'date',
                    scaleType: 'time',
                    valueFormatter: timeFormatter,
                    tickNumber: 8,
                },
            ]}

            series={[
                {
                    dataKey: 'value',
                    label: 'Solar Produktion',
                    showMark: false,
                    valueFormatter: mwFormatter,
                    color: '#fdb813',
                    area: true,
                },
            ]}

            height={300}
            grid={{ vertical: true, horizontal: true }}
        />
    );
}