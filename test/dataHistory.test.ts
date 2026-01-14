import { describe, it, expect } from "vitest";
import DataHistory from "../src/historiedata/DataHistory";

describe("DataHistory", () => {

  it("initializes with default values", () => {
    const history = new DataHistory();
    expect(history.produced).toBe(0);
    expect(history.consumed).toBe(0);
  });

  it("initializes with provided values", () => {
    const history = new DataHistory(5.5, 3.2);
    expect(history.produced).toBe(5.5);
    expect(history.consumed).toBe(3.2);
  });

  it("updates produced electricity correctly", () => {
    const history = new DataHistory(10, 0);
    history.updateAmountOfProducedElectricity(2.345);
    expect(history.produced).toBe(12.35); // rounded to 2 decimals
  });

  it("updates consumed electricity correctly", () => {
    const history = new DataHistory(0, 5);
    history.updateAmountOfConsumedElectricity(1.789);
    expect(history.consumed).toBe(6.79); // rounded to 2 decimals
  });

  it("handles multiple updates correctly", () => {
    const history = new DataHistory(1.11, 2.22);

    history.updateAmountOfProducedElectricity(1.115);
    history.updateAmountOfProducedElectricity(0.335);

    history.updateAmountOfConsumedElectricity(0.555);
    history.updateAmountOfConsumedElectricity(1.444);

    expect(history.produced).toBe(2.57);
    expect(history.consumed).toBe(4.22);
  });

  it("returns produced electricity via getter", () => {
    const history = new DataHistory(7.77, 0);
    expect(history.getAmountOfProducedElectircity()).toBe(7.77);
  });

  it("returns consumed electricity via getter", () => {
    const history = new DataHistory(0, 9.99);
    expect(history.getAmountOfConsumedElectricity()).toBe(9.99);
  });

});
