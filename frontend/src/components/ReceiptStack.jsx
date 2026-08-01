import { useState } from "react";

const RECEIPTS = [
  {
    title: "Groceries",
    date: "Jul 24",
    lines: [
      ["Farmers market", "-18.40"],
      ["Rice & lentils", "-9.10"],
      ["Coffee beans", "-7.00"],
    ],
    total: "-34.50",
    rotate: -8,
  },
  {
    title: "Subscriptions",
    date: "Jul 21",
    lines: [
      ["Music streaming", "-10.99"],
      ["Cloud storage", "-2.99"],
    ],
    total: "-13.98",
    rotate: 3,
  },
  {
    title: "Salary — July",
    date: "Jul 01",
    lines: [["Monthly income", "+2,400.00"]],
    total: "+2,400.00",
    rotate: -2,
    income: true,
  },
];

function ReceiptCard({ data, index, active }) {
  const spread = active ? index * 46 - 46 : index * 10 - 10;
  const rotate = active ? data.rotate : data.rotate / 2.5;

  return (
    <div
      className="absolute left-1/2 top-0 w-64 origin-bottom rounded-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft transition-all duration-500 ease-out"
      style={{
        transform: `translateX(calc(-50% + ${spread}px)) rotate(${rotate}deg)`,
        zIndex: index,
      }}
    >
      <div className="border-b border-dashed border-gray-300 dark:border-gray-700 px-5 pb-3 pt-5">
        <p className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-100">
          {data.title}
        </p>
        <p className="text-[11px] text-gray-400">{data.date}</p>
      </div>
      <div className="space-y-1.5 px-5 py-3 text-[11px] text-gray-500 dark:text-gray-400">
        {data.lines.map(([label, amt]) => (
          <div key={label} className="flex justify-between gap-3">
            <span>{label}</span>
            <span className="tabular-nums">{amt}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-dashed border-gray-300 dark:border-gray-700 px-5 py-3 text-xs font-semibold">
        <span className="text-gray-600 dark:text-gray-300">Total</span>
        <span
          className={`tabular-nums ${
            data.income ? "text-primary-600" : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {data.total}
        </span>
      </div>
      {/* torn edge */}
      <div
        className="h-3 w-full bg-white dark:bg-gray-900"
        style={{
          maskImage:
            "linear-gradient(115deg, transparent 0 4px, black 4px 8px) repeat-x, linear-gradient(65deg, transparent 0 4px, black 4px 8px) repeat-x",
          maskSize: "10px 10px",
          WebkitMaskImage:
            "linear-gradient(115deg, transparent 0 4px, black 4px 8px) repeat-x, linear-gradient(65deg, transparent 0 4px, black 4px 8px) repeat-x",
          WebkitMaskSize: "10px 10px",
        }}
      />
    </div>
  );
}

export default function ReceiptStack() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative mx-auto h-80 w-full max-w-sm cursor-pointer select-none pt-4"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((a) => !a)}
      role="button"
      tabIndex={0}
      aria-label="Fan out sample receipts"
    >
      {RECEIPTS.map((r, i) => (
        <ReceiptCard key={r.title} data={r} index={i} active={active} />
      ))}
      <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400">
        {active ? "your month, itemized" : "tap or hover to fan out"}
      </p>
    </div>
  );
}