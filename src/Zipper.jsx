export const mapSolarData = (apiData) => {
    if (!apiData || !apiData.unix_seconds || !apiData.production_types) {
        return [];
    }

    const timestamps = apiData.unix_seconds;

    const solarObject = apiData.production_types[16];
    const solarValues = solarObject?.data || [];

    const mappedList = timestamps.map((ts, index) => {
        return {
            // Datum lesbar machen
            date: new Date(ts * 1000),
            value: (solarValues[index] ?? 0)/100
        };
    });

    return mappedList;
};