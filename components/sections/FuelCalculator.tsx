"use client";

import { useState } from "react";
import { Fuel, Gauge, Route, Calendar, Users, RefreshCw, Pencil, type LucideIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { FuelType } from "@/lib/services/fuel-price-service";
import { useFuelPrice } from "@/hooks/useFuelPrice";
import { calculateFuelCosts } from "@/lib/fuel-calculation-engine";

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric (EV)" },
];

const currencyFormatter = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
const preciseFormatter = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 2 });

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function NumberField({
  label,
  icon: Icon,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 flex items-center gap-2">
        <Icon size={14} />
        {label}
      </label>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(suffix && "pr-14")}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-steel-grey-light">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/** Value re-mounts (via `key`) on every change, restarting the CSS fade/rise — the same animation pattern the Hero's stage title already uses, so a new dependency isn't needed for "animated calculation." */
function StatCard({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <Card className={cn("flex flex-col gap-2", emphasis && "border-gold-500/40 shadow-gold")}>
      <span className="eyebrow">{label}</span>
      <span
        key={value}
        className={cn(
          "stage-title-enter font-display text-3xl lg:text-4xl",
          emphasis ? "text-gradient-gold" : "text-white"
        )}
      >
        {value}
      </span>
    </Card>
  );
}

function PriceSourceBadge({
  source,
  asOf,
  isRefreshing,
  isManualOverride,
  onRefresh,
  onClearOverride,
  onEdit,
}: {
  source: string;
  asOf: string | null;
  isRefreshing: boolean;
  isManualOverride: boolean;
  onRefresh: () => void;
  onClearOverride: () => void;
  onEdit: () => void;
}) {
  const labels: Record<string, string> = {
    live: "Live price",
    cached: "Cached price",
    reference: "Reference price",
    manual: "Manual entry",
    loading: "Loading…",
    unavailable: "Enter manually",
  };
  const dotColor: Record<string, string> = {
    live: "bg-success",
    cached: "bg-gold-500",
    reference: "bg-cyan-500",
    manual: "bg-cyan-500",
    loading: "bg-steel-grey",
    unavailable: "bg-danger",
  };

  return (
    <div className="mt-2 flex items-center justify-between gap-2 text-xs">
      <span className="flex items-center gap-1.5 text-steel-grey-light">
        <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[source])} aria-hidden="true" />
        {labels[source]}
        {asOf && <span className="text-steel-grey-light/70">· {timeAgo(asOf)}</span>}
      </span>
      <span className="flex items-center gap-3">
        {isManualOverride ? (
          <button
            type="button"
            onClick={onClearOverride}
            className="flex items-center gap-1 text-steel-grey-light transition-colors hover:text-gold-500"
            aria-label="Use live or cached price instead"
          >
            <RefreshCw size={12} aria-hidden="true" />
            Use Live Price
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 text-steel-grey-light transition-colors hover:text-gold-500"
              aria-label="Enter price manually"
            >
              <Pencil size={12} aria-hidden="true" />
              Edit
            </button>
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 text-steel-grey-light transition-colors hover:text-gold-500 disabled:opacity-50"
              aria-label="Refresh price"
            >
              <RefreshCw size={12} className={cn(isRefreshing && "animate-spin")} aria-hidden="true" />
              Refresh
            </button>
          </>
        )}
      </span>
    </div>
  );
}

export default function FuelCalculator() {
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const priceState = useFuelPrice(fuelType);
  const [efficiency, setEfficiency] = useState("");
  const [distancePerTrip, setDistancePerTrip] = useState("");
  const [tripsPerMonth, setTripsPerMonth] = useState("");
  const [passengers, setPassengers] = useState("");

  const isElectric = fuelType === "electric";
  const unitLabel = isElectric ? "kWh" : "L";

  const result = calculateFuelCosts({
    pricePerUnit: parseFloat(priceState.price) || 0,
    efficiency: parseFloat(efficiency) || 0,
    distancePerTrip: parseFloat(distancePerTrip) || 0,
    tripsPerMonth: parseFloat(tripsPerMonth) || 0,
    passengers: parseFloat(passengers) || 0,
  });

  const fmt = (n: number) => (result.isValid ? `Rs ${currencyFormatter.format(n)}` : "—");

  const chartData = result.isValid
    ? [
        { name: "Trip", cost: Math.round(result.tripCost) },
        { name: "Round Trip", cost: Math.round(result.roundTripCost) },
        { name: "Monthly", cost: Math.round(result.monthlyCost) },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2 flex flex-col gap-6">
        <div>
          <span className="eyebrow mb-2 block">Fuel Type</span>
          <div className="flex gap-2">
            {FUEL_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFuelType(value)}
                className={cn(
                  "flex-1 rounded-md border px-3 py-3 text-xs tracking-wide transition-colors",
                  fuelType === value
                    ? "border-gold-500 bg-gold-500/10 text-gold-500"
                    : "border-white/15 text-steel-grey-light hover:border-white/30 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <NumberField
            label={isElectric ? "Price per kWh" : `${FUEL_TYPES.find((f) => f.value === fuelType)?.label} Price per Litre`}
            icon={Fuel}
            value={priceState.price}
            onChange={priceState.setManualPrice}
            suffix="PKR"
            placeholder={isElectric ? "Enter local tariff" : "Enter current price"}
          />
          <PriceSourceBadge
            source={priceState.source}
            asOf={priceState.asOf}
            isRefreshing={priceState.isRefreshing}
            isManualOverride={priceState.isManualOverride}
            onRefresh={priceState.refresh}
            onClearOverride={priceState.clearManualOverride}
            onEdit={() => priceState.setManualPrice(priceState.price)}
          />
        </div>

        <NumberField
          label={isElectric ? "Vehicle Efficiency" : "Vehicle Mileage"}
          icon={Gauge}
          value={efficiency}
          onChange={setEfficiency}
          suffix={`km/${unitLabel}`}
          placeholder={isElectric ? "e.g. 6" : "e.g. 12"}
        />
        <NumberField
          label="Distance per Trip (one-way)"
          icon={Route}
          value={distancePerTrip}
          onChange={setDistancePerTrip}
          suffix="km"
          placeholder="e.g. 40"
        />
        <NumberField
          label="Trips per Month"
          icon={Calendar}
          value={tripsPerMonth}
          onChange={setTripsPerMonth}
          placeholder="e.g. 22"
        />
        <NumberField
          label="Passengers"
          icon={Users}
          value={passengers}
          onChange={setPassengers}
          placeholder="e.g. 4"
        />
      </Card>

      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard label="Cost per KM" value={result.isValid ? `Rs ${preciseFormatter.format(result.costPerKm)}` : "—"} />
          <StatCard label="Estimated Trip Cost" value={fmt(result.tripCost)} />
          <StatCard label="Round Trip Cost" value={fmt(result.roundTripCost)} />
          <StatCard
            label="Cost Per Passenger"
            value={parseFloat(passengers) > 0 ? fmt(result.costPerPassenger) : "—"}
          />
          <StatCard label="Estimated Monthly Cost" value={fmt(result.monthlyCost)} emphasis />
          <StatCard label="Estimated Annual Cost" value={fmt(result.annualCost)} />
        </div>

        <Card className="flex-1">
          <span className="eyebrow mb-4 block">Cost Breakdown</span>
          {result.isValid ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#8B8F94" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8B8F94" fontSize={12} tickLine={false} axisLine={false} width={70} />
                  <Tooltip
                    formatter={(value: number) => [`Rs ${currencyFormatter.format(value)}`, "Cost"]}
                    contentStyle={{
                      background: "#16171A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#F6F6F4",
                    }}
                  />
                  <Bar dataKey="cost" fill="#C9A24B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="flex h-64 items-center justify-center text-sm text-steel-grey-light">
              Enter all fields to see the cost breakdown.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
