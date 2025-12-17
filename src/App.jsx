import './App.css'
import OverviewScreen from "./screens/OverviewScreen.jsx";

function App() {
    // Example: Fetch these from your API later
    const data = {
        solar: 5.6,
        house: 2.3,
        battery: 85
    };

    return (
        <div className="App">
            <OverviewScreen
                solarOutput={data.solar}
                houseConsumption={data.house}
                batteryLevel={data.battery}
            />
        </div>
    );
}

export default App
