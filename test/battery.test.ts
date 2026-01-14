import { describe, it, expect, vi, beforeEach } from "vitest";
import BatteryHandler from "../src/battery/BatteryHandler";
import LocalStorageHelper from "../src/LocalStorageHelper";

// Mock LocalStorageHelper
vi.mock("../src/LocalStorageHelper", () => ({
  default: {
    set: vi.fn()
  }
}));

describe("BatteryHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -----------------------------
  // Constructor Tests
  // -----------------------------
  describe("constructor", () => {
    it("initializes with valid values", () => {
      const handler = new BatteryHandler(50, 70);
      expect(handler.capacity).toBe(50);
      expect(handler.threshold).toBe(70);
    });

    it("throws if initialCapacity is out of range", () => {
      expect(() => new BatteryHandler(-1)).toThrow();
      expect(() => new BatteryHandler(101)).toThrow();
    });

    it("throws if threshold is out of range", () => {
      expect(() => new BatteryHandler(50, -1)).toThrow();
      expect(() => new BatteryHandler(50, 101)).toThrow();
    });
  });

  // -----------------------------
  // updateCapacity Tests
  // -----------------------------
  describe("updateCapacity", () => {
    it("throws if input is invalid", () => {
      const handler = new BatteryHandler();
      expect(() => handler.updateCapacity(-1, 10)).toThrow();
      expect(() => handler.updateCapacity("a", 10)).toThrow();
    });

    it("throws if output is invalid", () => {
      const handler = new BatteryHandler();
      expect(() => handler.updateCapacity(10, -1)).toThrow();
      expect(() => handler.updateCapacity(10, "b")).toThrow();
    });

    it("increases capacity by 1 when input > output", () => {
      const handler = new BatteryHandler(50, 80);
      handler.updateCapacity(10, 5);
      expect(handler.capacity).toBe(51);
    });

    it("does not exceed 100% capacity", () => {
      const handler = new BatteryHandler(100, 80);
      handler.updateCapacity(10, 5);
      expect(handler.capacity).toBe(100);
    });

    it("decreases capacity by 1 when input < output AND capacity > threshold", () => {
      const handler = new BatteryHandler(90, 80);
      handler.updateCapacity(5, 10);
      expect(handler.capacity).toBe(89);
    });

    it("does NOT decrease capacity when input < output but capacity <= threshold", () => {
      const handler = new BatteryHandler(80, 80);
      handler.updateCapacity(5, 10);
      expect(handler.capacity).toBe(80);
    });

    it("does nothing when input == output", () => {
      const handler = new BatteryHandler(50, 80);
      handler.updateCapacity(10, 10);
      expect(handler.capacity).toBe(50);
    });
  });

  // -----------------------------
  // setThreshold Tests
  // -----------------------------
  describe("setThreshold", () => {
    it("sets a valid threshold and stores it", () => {
      const handler = new BatteryHandler(50, 80);
      handler.localstorageTresholdKey = "battery_threshold"; // ensure key exists

      handler.setThreshold(60);

      expect(handler.threshold).toBe(60);
      expect(LocalStorageHelper.set).toHaveBeenCalledWith("battery_threshold", 60);
    });

    it("throws on invalid threshold", () => {
      const handler = new BatteryHandler();
      expect(() => handler.setThreshold(-1)).toThrow();
      expect(() => handler.setThreshold(101)).toThrow();
      expect(() => handler.setThreshold("abc")).toThrow();
    });
  });

  // -----------------------------
  // Getter Tests
  // -----------------------------
  describe("getStats", () => {
    it("returns correct stats", () => {
      const handler = new BatteryHandler(55, 75);
      expect(handler.getStats()).toEqual({
        currentCapacity: 55,
        threshold: 75
      });
    });
  });

  describe("getCurrentCapacity", () => {
    it("returns current capacity", () => {
      const handler = new BatteryHandler(42);
      expect(handler.getCurrentCapacity()).toBe(42);
    });
  });
});
