import LocalStorageHelper from '../LocalStorageHelper';

class BatteryHandler {
    constructor(initialCapacity = 0, threshold = 80) {
        if (initialCapacity < 0 || initialCapacity > 100) {
            throw new Error("initialCapacity must be between 0 and 100 (percentage)");
        }

        if (threshold < 0 || threshold > 100) {
            throw new Error("threshold must be between 0 and 100 (percentage)");
        }

        this.capacity = initialCapacity; // Aktuelle Ladung in %
        this.threshold = threshold;     // Der eingestellte Schwellenwert
    }

    /**
     * Berechnet den neuen Batteriestand basierend auf Input und Output.
     * @param {number} input  - Eingehende Energie (z.B. PV-Anlage)
     * @param {number} output - Verbrauchte Energie (Hauslast)
     */
    updateCapacity(input, output) {
        if (typeof input !== "number" || isNaN(input) || input < 0) {
            throw new Error("input must be a non-negative number");
        }

        if (typeof output !== "number" || isNaN(output) || output < 0) {
            throw new Error("output must be a non-negative number");
        }

        if (input > output) {
            this.capacity = Math.min(100, this.capacity + 1);
        }

        if (input < output && this.capacity > this.threshold) {
            this.capacity--;
        }

    }

    setThreshold(newThreshold) {
        if (typeof newThreshold !== "number" || isNaN(newThreshold) || newThreshold < 0 || newThreshold > 100) {
            throw new Error("threshold must be a number between 0 and 100");
        }

        this.threshold = newThreshold;
        LocalStorageHelper.set(this.localstorageTresholdKey, newThreshold);
    }

    getStats() {
        return {
            currentCapacity: this.capacity,
            threshold: this.threshold
        };
    }

    getCurrentCapacity() {
        return this.capacity
    }
}

export default BatteryHandler;
