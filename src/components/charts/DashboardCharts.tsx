import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { demoBranches } from "../../data/dashboardData";
import { Panel } from "../ui/DemoUI";
const trend = [
  900, 1100, 1300, 1470, 1580, 1770, 1940, 2250, 2420, 2490, 2640, 2847,
].map((value, i) => ({
  month: [
    "Jan",
    "Feb",
    "Mac",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ogo",
    "Sep",
    "Okt",
    "Nov",
    "Dis",
  ][i],
  value,
}));
const tooltipStyle = {
  background: "#111719",
  border: "1px solid #414747",
  fontSize: 11,
  color: "#fff",
};
export function DashboardCharts() {
  const [period, setPeriod] = useState("12"),
    [branch, setBranch] = useState("all"),
    [mapBranch, setMapBranch] = useState("Semua Cawangan");
  const branches =
    branch === "all"
      ? demoBranches
      : demoBranches.filter((b) => b.name === branch);
  return (
    <div className="analytics-grid">
      <Panel
        title="Trend Keahlian"
        className="trend-panel"
        action={
          <select
            aria-label="Tempoh trend keahlian"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="12">12 Bulan Terkini</option>
            <option value="6">6 Bulan Terkini</option>
          </select>
        }
      >
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trend.slice(-Number(period))}
              margin={{ left: -15, right: 12, top: 15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f5cf22" stopOpacity={0.38} />
                  <stop offset="1" stopColor="#f5cf22" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff0c" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#adb3b6", fontSize: 10 }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 4000]}
                tick={{ fill: "#adb3b6", fontSize: 10 }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#fff" }}
              />
              <Area
                isAnimationActive={false}
                type="linear"
                dataKey="value"
                name="Ahli demo"
                stroke="#f5cf22"
                strokeWidth={2}
                fill="url(#goldArea)"
                dot={{ r: 2, fill: "#f5cf22" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel
        title="Agihan Ahli Mengikut Cawangan"
        className="distribution-panel"
        action={
          <select
            aria-label="Tapis agihan cawangan"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="all">Semua Cawangan</option>
            {demoBranches.map((b) => (
              <option key={b.name}>{b.name}</option>
            ))}
          </select>
        }
      >
        <div className="distribution-content">
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  isAnimationActive={false}
                  data={branches}
                  dataKey="members"
                  nameKey="name"
                  innerRadius="63%"
                  outerRadius="95%"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {branches.map((b) => (
                    <Cell key={b.name} fill={b.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-label">
              <b>
                {branches
                  .reduce((s, b) => s + b.members, 0)
                  .toLocaleString("en")}
              </b>
              <small>Ahli Aktif</small>
            </div>
          </div>
          <div className="chart-legend">
            {branches.map((b) => (
              <div key={b.name}>
                <i style={{ background: b.color }} />
                <span>{b.name}</span>
                <b>{b.members}</b>
                <small>{Math.round((b.members / 2847) * 100)}%</small>
              </div>
            ))}
          </div>
        </div>
      </Panel>
      <Panel
        title="Taburan Cawangan Negeri Perak"
        className="map-panel"
        action={
          <select
            aria-label="Tapis peta cawangan"
            value={mapBranch}
            onChange={(e) => setMapBranch(e.target.value)}
          >
            <option>Semua Cawangan</option>
            {demoBranches.slice(0, 6).map((b) => (
              <option key={b.name}>{b.name}</option>
            ))}
          </select>
        }
      >
        <div className="map-content">
          <div className="map-labels">
            <span>
              Larut, Matang
              <br />& Selama
            </span>
            <span>Manjung</span>
            <span>Kerian</span>
          </div>
          <img
            src="/images/reference/perak-map-demo.png"
            alt="Peta ilustrasi Perak diekstrak daripada reference; bukan peta geospatial"
          />
          <div className="map-labels">
            <span>Hulu Perak</span>
            <span>Kinta</span>
            <span>Batang Padang</span>
            <span>Hilir Perak</span>
          </div>
          <div className="map-stats">
            <b>{mapBranch === "Semua Cawangan" ? "24" : "1"}</b>
            <small>Cawangan Berdaftar</small>
            <b>
              {mapBranch === "Semua Cawangan"
                ? "38"
                : demoBranches.find((b) => b.name === mapBranch)?.venues}
            </b>
            <small>Gelanggang Aktif</small>
            <b>
              {mapBranch === "Semua Cawangan"
                ? "2,847"
                : demoBranches.find((b) => b.name === mapBranch)?.members}
            </b>
            <small>Ahli Aktif</small>
          </div>
        </div>
      </Panel>
    </div>
  );
}
