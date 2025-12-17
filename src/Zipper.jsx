export const mapSolarData = (apiData) => {
    // 1. Check: Sind Daten da?
    if (!apiData || !apiData.unix_seconds || !apiData.production_types) {
        return [];
    }

    // A) Die Zeiten (60 Stück)
    const timestamps = apiData.unix_seconds;

    // B) Dein Solar-Objekt holen (Index 16, wie du herausgefunden hast)
    const solarObject = apiData.production_types[16];

    // WICHTIG: Hier greifen wir auf das "data"-Array IN deinem Objekt zu
    // Das ist das Array mit den [0, 0, 0, ...]
    const solarValues = solarObject?.data || [];

    const mappedList = timestamps.map((ts, index) => {
        return {
            // Datum lesbar machen
            date: new Date(ts * 1000),

            // Hier passiert die Magie:
            // Nimm aus dem Array 'solarValues' den Wert an der gleichen Stelle 'index'
            value: (solarValues[index] ?? 0)/100
        };
    });

    return mappedList;
};