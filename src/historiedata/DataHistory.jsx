class DataHistory {
    constructor(produced = 0.0, consumed = 0.0) {
        this.produced = produced;
        this.consumed = consumed;
    }

    /**
     * @param {produced} input  - Eingehende Energie (z.B. PV-Anlage)
     * @param {consumed} output - Verbrauchte Energie (Hauslast)
     */

    updateAmountOfProducedElectricity(input) {
        this.produced = Math.round((this.produced + input)*100)/100;
    }

    updateAmountOfConsumedElectricity(output) {
        this.consumed = Math.round((this.consumed + output)*100)/100;

    }

    getAmountOfProducedElectircity() {
        return this.produced;
    }

    getAmountOfConsumedElectricity() {
        return this.consumed
    }
}

export default DataHistory;