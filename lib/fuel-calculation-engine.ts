/**
 * Fuel cost calculation engine — pure functions only. No React, no DOM,
 * no service/cache imports. Deliberately separated so the math can be
 * tested (and trusted) independently of how prices are sourced or how
 * the UI renders them.
 */

export interface FuelCalculationInputs {
  /** Price per unit — PKR per litre (petrol/diesel) or PKR per kWh (electric). */
  pricePerUnit: number;
  /** Vehicle efficiency — km per litre, or km per kWh for electric. */
  efficiency: number;
  /** One-way distance per trip, km. */
  distancePerTrip: number;
  /** Trips per month. */
  tripsPerMonth: number;
  /** Passenger count for this trip (0 disables the per-passenger figure). */
  passengers: number;
}

export interface FuelCalculationResult {
  /** Units (litres or kWh) consumed for one one-way trip. */
  unitsPerTrip: number;
  /** Cost per kilometer traveled. */
  costPerKm: number;
  tripCost: number;
  roundTripCost: number;
  /** Cost per passenger for one one-way trip; 0 when passengers is 0. */
  costPerPassenger: number;
  monthlyCost: number;
  annualCost: number;
  /** True once every input is a usable positive number — callers should treat a false result as "nothing to display yet," not as a calculation of zero. */
  isValid: boolean;
}

const EMPTY_RESULT: FuelCalculationResult = {
  unitsPerTrip: 0,
  costPerKm: 0,
  tripCost: 0,
  roundTripCost: 0,
  costPerPassenger: 0,
  monthlyCost: 0,
  annualCost: 0,
  isValid: false,
};

/**
 * Runs the full calculation. Returns a zeroed, `isValid: false` result if
 * price, efficiency, distance, or trips are missing/non-positive — the
 * caller decides how to render that (e.g. "enter all fields"), this
 * function never guesses or divides by zero.
 */
export function calculateFuelCosts(inputs: FuelCalculationInputs): FuelCalculationResult {
  const { pricePerUnit, efficiency, distancePerTrip, tripsPerMonth, passengers } = inputs;

  if (
    !(pricePerUnit > 0) ||
    !(efficiency > 0) ||
    !(distancePerTrip > 0) ||
    !(tripsPerMonth > 0)
  ) {
    return EMPTY_RESULT;
  }

  const unitsPerTrip = distancePerTrip / efficiency;
  const tripCost = unitsPerTrip * pricePerUnit;
  const costPerKm = tripCost / distancePerTrip;
  const roundTripCost = tripCost * 2;
  const monthlyCost = tripCost * tripsPerMonth;
  const annualCost = monthlyCost * 12;
  const costPerPassenger = passengers > 0 ? tripCost / passengers : 0;

  return {
    unitsPerTrip,
    costPerKm,
    tripCost,
    roundTripCost,
    costPerPassenger,
    monthlyCost,
    annualCost,
    isValid: true,
  };
}
