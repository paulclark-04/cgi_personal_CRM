"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntelItem, Contact } from "@/lib/types";

const INTEL_TYPE_LABELS: Record<string, string> = {
  news: "Actualités",
  "job-change": "Changement de poste",
  funding: "Levée de fonds",
  partnership: "Partenariat",
  "product-launch": "Lancement produit",
};

const INTEL_TYPE_COLORS: Record<string, string> = {
  news: "#6366f1",
  "job-change": "#f59e0b",
  funding: "#10b981",
  partnership: "#3b82f6",
  "product-launch": "#ef4444",
};

const SECTOR_COLORS = [
  "#6366f1",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

interface VeilleChartsProps {
  items: IntelItem[];
  contacts: Contact[];
}

export function VeilleCharts({ items, contacts }: VeilleChartsProps) {
  // 1. Répartition par type d'intel
  const typeCounts = items.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const typeData = Object.entries(typeCounts)
    .map(([type, count]) => ({
      name: INTEL_TYPE_LABELS[type] || type,
      value: count,
      color: INTEL_TYPE_COLORS[type] || "#94a3b8",
    }))
    .sort((a, b) => b.value - a.value);

  // 2. Volume par secteur (via les contacts liés)
  const sectorCounts = items.reduce(
    (acc, item) => {
      const contact = contacts.find((c) => c.id === item.contactId);
      const sector = contact?.sector || "Autre";
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sectorData = Object.entries(sectorCounts)
    .map(([sector, count]) => ({
      name: sector,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // 3. Timeline d'activité par semaine
  const timelineMap = new Map<string, number>();
  items.forEach((item) => {
    const date = new Date(item.date);
    // Group by week: find the Monday of the week
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);
    const key = monday.toISOString().split("T")[0];
    timelineMap.set(key, (timelineMap.get(key) || 0) + 1);
  });

  const timelineData = Array.from(timelineMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => {
      const d = new Date(date);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      return { date: label, articles: count };
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomLabel = (props: any) => {
    const cx = props.cx as number;
    const cy = props.cy as number;
    const midAngle = props.midAngle as number;
    const innerRadius = props.innerRadius as number;
    const outerRadius = props.outerRadius as number;
    const percent = props.percent as number;
    if (!percent || percent < 0.08) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Chart 1: Donut par type */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Par type d&apos;information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    `${value} article${Number(value) > 1 ? "s" : ""}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 justify-center">
            {typeData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart 2: Barres horizontales par secteur */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Volume par secteur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sectorData}
                layout="vertical"
                margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    `${value} article${Number(value) > 1 ? "s" : ""}`,
                    "Volume",
                  ]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={24}>
                  {sectorData.map((_entry, index) => (
                    <Cell
                      key={index}
                      fill={SECTOR_COLORS[index % SECTOR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart 3: Timeline area chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Activité dans le temps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timelineData}
                margin={{ top: 5, right: 12, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    `${value} article${Number(value) > 1 ? "s" : ""}`,
                    "Volume",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="articles"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#areaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
