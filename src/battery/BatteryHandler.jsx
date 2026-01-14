class BatteryHandler {
    constructor(initialCapacity = 0, threshold = 80) {
        this.capacity = initialCapacity; // Aktuelle Ladung in %
        this.threshold = threshold;     // Der eingestellte Schwellenwert
    }

    /**
     * Berechnet den neuen Batteriestand basierend auf Input und Output.
     * @param {number} input  - Eingehende Energie (z.B. PV-Anlage)
     * @param {number} output - Verbrauchte Energie (Hauslast)
     */
    updateCapacity(input, output) {
        if (input > output) {
            this.capacity = Math.min(100, this.capacity + 1);
        }

       if (input < output && this.capacity > this.threshold) {
            this.capacity --;
        }

    }

    setThreshold(newThreshold) {
        this.threshold = newThreshold;
    }

    getStats() {
        return {
            currentCapacity: this.capacity,
            threshold: this.threshold
        };
    }

    getCurrentCapacity(){
        return this.capacity
    }
}

export default BatteryHandler;