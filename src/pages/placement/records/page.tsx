import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { placementService } from '../../../services/placementService';
import type { PlacementRecord } from '../../../types/placement';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────
interface StudentRow {
  sno: number;
  regd_no: string;
  name: string;
  branch: string;
  company: string;
}

interface YearData {
  record: PlacementRecord;
  students: StudentRow[];
  fileName?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// FIX: All color classes must be complete strings — dynamic `text-${color}-500`
// is purged by Tailwind at build time. Use a lookup map instead.
const PIE_COLORS = ['#0d9488', '#94a3b8', '#14b8a6', '#f59e0b'];

const BRANCH_COLORS: Record<string, string> = {
  CSE: '#0d9488',
  ECE: '#3b82f6',
  EEE: '#f59e0b',
  MECH: '#ef4444',
  CIVIL: '#8b5cf6',
  IT: '#14b8a6',
};

// FIX: Static icon-color map replaces dynamic `text-${color}-500` class
const ICON_COLOR_MAP: Record<string, string> = {
  teal: 'text-teal-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  cyan: 'text-cyan-500',
};


async function loadXlsxModule() {
  const moduleName = 'xlsx';
  const importAtRuntime = new Function('m', 'return import(m);') as (m: string) => Promise<any>;
  return importAtRuntime(moduleName);
}

// ─── Helper: parse Excel rows into StudentRow[] ───────────────────────────────
function parseStudentRows(rows: unknown[][]): StudentRow[] {
  if (!rows || rows.length < 2) return [];

  const header = rows[0].map((h) => String(h ?? '').toLowerCase().trim());

  // FIX: Guard against findIndex returning -1 by falling back to positional defaults
  const findCol = (tests: ((h: string) => boolean)[], fallback: number): number => {
    const idx = header.findIndex((h) => tests.some((t) => t(h)));
    return idx !== -1 ? idx : fallback;
  };

  const colIdx = {
    sno: findCol([(h) => h === 's.no' || h === 'sno' || h === 's no'], 0),
    regd: findCol([(h) => h.includes('regd') || h.includes('reg no')], 1),
    name: findCol([(h) => h.includes('name')], 2),
    branch: findCol([(h) => h.includes('branch') || h.includes('dept')], 3),
    company: findCol([(h) => h.includes('company') || h.includes('firm')], 4),
  };

  return rows
    .slice(1)
    .filter((r) => Array.isArray(r) && r.some((c) => c !== '' && c !== null && c !== undefined))
    .map((r, i) => ({
      sno: Number((r as unknown[])[colIdx.sno]) || i + 1,
      regd_no: String((r as unknown[])[colIdx.regd] ?? ''),
      name: String((r as unknown[])[colIdx.name] ?? ''),
      branch: String((r as unknown[])[colIdx.branch] ?? '').toUpperCase().trim(),
      company: String((r as unknown[])[colIdx.company] ?? ''),
    }));
}

// ─── Branch breakdown ─────────────────────────────────────────────────────────
function getBranchBreakdown(students: StudentRow[]) {
  const map: Record<string, number> = {};
  students.forEach((s) => {
    if (s.branch) map[s.branch] = (map[s.branch] || 0) + 1;
  });
  return Object.entries(map).map(([branch, count]) => ({ branch, count }));
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PlacementRecordsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearDataMap, setYearDataMap] = useState<Record<string, YearData>>({});
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [uploadingYear, setUploadingYear] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Wrap in useCallback so ESLint exhaustive-deps is satisfied
  const loadRecords = useCallback(async () => {
    try {
      const data = await placementService.getPlacementRecords();
      setRecords(data);
      if (data.length > 0) {
        const initial: Record<string, YearData> = {};
        data.forEach((r) => {
          initial[r.academic_year] = { record: r, students: [] };
        });
        setYearDataMap(initial);
        setActiveYear(data[0].academic_year);
      }
    } catch (error) {
      console.error('Error loading placement records:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  // ── Excel upload ──────────────────────────────────────────────────────────
  const handleFileUpload = (year: string, file: File) => {
    setUploadingYear(year);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer) throw new Error('Failed to read file');
        const data = new Uint8Array(arrayBuffer as ArrayBuffer);
        const XLSX = await loadXlsxModule();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // FIX: Use unknown[][] so parseStudentRows can do its own safe casting
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];
        const students = parseStudentRows(rows);
        setYearDataMap((prev) => ({
          ...prev,
          [year]: { ...prev[year], students, fileName: file.name },
        }));
      } catch (err) {
        console.error('Error parsing Excel:', err);
      } finally {
        setUploadingYear(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // ── Chart data ────────────────────────────────────────────────────────────
  const allChartData = records.map((r) => ({
    year: r.academic_year,
    total: r.total_students,
    placed: r.placed_students,
    highest: r.highest_package,
    average: r.average_package,
    companies: r.companies_visited,
    percentage: +((r.placed_students / r.total_students) * 100).toFixed(1),
  }));

  const activeYD = activeYear ? yearDataMap[activeYear] : null;
  const activeRecord = activeYD?.record ?? null;
  const activePlacePct = activeRecord
    ? +((activeRecord.placed_students / activeRecord.total_students) * 100).toFixed(1)
    : 0;
  const activePie = activeRecord
    ? [
        { name: 'Placed', value: activeRecord.placed_students },
        { name: 'Not Placed', value: activeRecord.total_students - activeRecord.placed_students },
      ]
    : [];
  const activeBranch = activeYD ? getBranchBreakdown(activeYD.students) : [];

  // FIX: Typed as string | number — avoids implicit any on value
  const statCards: {
    label: string;
    value: string | number;
    sub: string;
    icon: string;
    colorKey: string;
  }[] = activeRecord
    ? [
        { label: 'Placement Rate', value: `${activePlacePct}%`, sub: activeRecord.academic_year, icon: 'ri-percent-line', colorKey: 'teal' },
        { label: 'Students Placed', value: activeRecord.placed_students, sub: `out of ${activeRecord.total_students}`, icon: 'ri-user-star-line', colorKey: 'emerald' },
        { label: 'Highest Package', value: `₹${activeRecord.highest_package}L`, sub: 'per annum', icon: 'ri-trophy-line', colorKey: 'amber' },
        { label: 'Companies Visited', value: activeRecord.companies_visited, sub: activeRecord.academic_year, icon: 'ri-building-2-line', colorKey: 'cyan' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-teal-600 transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400" />
            <Link to="/placement/cell" className="text-gray-500 hover:text-teal-600 transition-colors">Placement Cell</Link>
            <i className="ri-arrow-right-s-line text-gray-400" />
            <span className="text-gray-900 font-semibold">Placement Records</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-14">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Placement Records</h1>
          <p className="text-lg text-teal-100">Year-wise placement statistics, trends &amp; student details</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading placement records…</p>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <i className="ri-bar-chart-box-line text-6xl text-gray-300 mb-4 block" />
            No placement records available.
          </div>
        ) : (
          <>
            {/* ══════════════════════════════════════════════
                SECTION 1 — OVERALL TRENDS
            ══════════════════════════════════════════════ */}
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-line-chart-line text-teal-600" /> Overall Placement Trends
              </h2>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Bar: total vs placed */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Students Placed — All Years</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={allChartData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      {/* FIX: radius cast as tuple to satisfy Recharts prop type */}
                      <Bar dataKey="total" fill="#94a3b8" name="Total Students" radius={[6, 6, 0, 0] as [number, number, number, number]} />
                      <Bar dataKey="placed" fill="#0d9488" name="Placed Students" radius={[6, 6, 0, 0] as [number, number, number, number]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Line: packages */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Trend — All Years</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={allChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="highest" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="Highest (LPA)" />
                      <Line type="monotone" dataKey="average" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4 }} name="Average (LPA)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Placement % bar */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Percentage — All Years</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={allChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} tick={{ fontSize: 11 }} />
                    {/* FIX: Recharts v2 Tooltip formatter signature: (value, name) => [label, name] */}
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Placement %']}
                      contentStyle={{ borderRadius: 8, fontSize: 12 }}
                    />
                    <Bar dataKey="percentage" fill="#14b8a6" name="Placement %" radius={[6, 6, 0, 0] as [number, number, number, number]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 2 — YEAR-WISE SUMMARY TABLE
            ══════════════════════════════════════════════ */}
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-table-line text-teal-600" /> Year-wise Summary
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-teal-600 text-white">
                      <tr>
                        {['Academic Year', 'Total Students', 'Placed', 'Placement %', 'Highest Pkg', 'Avg Pkg', 'Companies'].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-sm font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {records.map((r) => {
                        const pct = ((r.placed_students / r.total_students) * 100).toFixed(1);
                        return (
                          <tr key={r.id} className="hover:bg-teal-50 transition-colors">
                            <td className="px-5 py-3 text-sm font-semibold text-teal-700">{r.academic_year}</td>
                            <td className="px-5 py-3 text-sm text-gray-700">{r.total_students}</td>
                            <td className="px-5 py-3 text-sm text-gray-700">{r.placed_students}</td>
                            <td className="px-5 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                                {pct}%
                              </span>
                            </td>
                            <td className="px-5 py-3 text-sm text-gray-700">₹{r.highest_package}L</td>
                            <td className="px-5 py-3 text-sm text-gray-700">₹{r.average_package}L</td>
                            <td className="px-5 py-3 text-sm text-gray-700">{r.companies_visited}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 3 — YEAR-WISE DETAIL TABS
            ══════════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-teal-600" /> Year-wise Detail &amp; Student Data
              </h2>

              {/* Tab bar */}
              <div className="flex flex-wrap gap-2 mb-6">
                {records.map((r) => (
                  <button
                    key={r.academic_year}
                    onClick={() => setActiveYear(r.academic_year)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      activeYear === r.academic_year
                        ? 'bg-teal-600 text-white border-teal-600 shadow'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:text-teal-600'
                    }`}
                  >
                    {r.academic_year}
                    {/* FIX: Use nullish coalescing to avoid optional chaining crash */}
                    {(yearDataMap[r.academic_year]?.students.length ?? 0) > 0 && (
                      <span className="ml-1.5 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {yearDataMap[r.academic_year].students.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* FIX: Guard both activeRecord AND activeYD before rendering */}
              {activeRecord && activeYD && (
                <div className="space-y-6">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map(({ label, value, sub, icon, colorKey }) => (
                      <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-gray-500 font-medium">{label}</p>
                          {/* FIX: Static lookup — dynamic Tailwind classes are tree-shaken */}
                          <i className={`${icon} text-xl ${ICON_COLOR_MAP[colorKey] ?? 'text-gray-500'}`} />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Pie */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Placement Distribution — {activeRecord.academic_year}
                      </h4>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={activePie}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            dataKey="value"
                            label={({ name, percent }: { name: string; percent: number }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {activePie.map((_, i) => (
                              <Cell key={`pie-cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Branch breakdown — only after Excel upload */}
                    {activeBranch.length > 0 ? (
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">
                          Branch-wise Placements — {activeRecord.academic_year}
                        </h4>
                        <ResponsiveContainer width="100%" height={240}>
                          <BarChart data={activeBranch}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                            <Bar dataKey="count" name="Placed" radius={[6, 6, 0, 0] as [number, number, number, number]}>
                              {activeBranch.map((entry, i) => (
                                <Cell
                                  key={`branch-cell-${i}`}
                                  fill={BRANCH_COLORS[entry.branch] ?? PIE_COLORS[i % PIE_COLORS.length]}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center shadow-sm">
                        <i className="ri-file-chart-line text-4xl text-gray-300 mb-2" />
                        <p className="text-gray-500 text-sm">
                          Upload the Excel sheet for <br />
                          <strong>{activeRecord.academic_year}</strong> to see branch-wise chart
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Excel Upload + Student Table */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          {activeRecord.academic_year} — Student Placement Data
                        </h4>
                        {activeYD.fileName && (
                          <p className="text-xs text-teal-600 mt-0.5 flex items-center gap-1">
                            <i className="ri-file-excel-2-line" /> {activeYD.fileName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {/* FIX: ref callback typed as HTMLInputElement | null (React 18 compatible) */}
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          className="hidden"
                          ref={(el: HTMLInputElement | null) => {
                            if (activeYear) fileInputRefs.current[activeYear] = el;
                          }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && activeYear) handleFileUpload(activeYear, file);
                            e.target.value = '';
                          }}
                        />
                        <button
                          onClick={() => {
                            if (activeYear) fileInputRefs.current[activeYear]?.click();
                          }}
                          disabled={uploadingYear === activeYear}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-60 transition-colors shadow-sm"
                        >
                          {uploadingYear === activeYear ? (
                            <><i className="ri-loader-4-line animate-spin" /> Processing…</>
                          ) : (
                            <><i className="ri-file-excel-2-line" /> Upload Excel</>
                          )}
                        </button>
                        {activeYD.students.length > 0 && (
                          <span className="text-sm text-gray-500">{activeYD.students.length} students</span>
                        )}
                      </div>
                    </div>

                    {/* Student Table */}
                    {activeYD.students.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-blue-600 text-white">
                              {['S.No', 'Regd. No', 'Name of the Student', 'Branch', 'Company Name'].map((h) => (
                                <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {activeYD.students.map((s, i) => (
                              <tr key={`student-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 text-gray-600">{s.sno}</td>
                                <td className="px-4 py-3 font-mono text-gray-700">{s.regd_no}</td>
                                <td className="px-4 py-3 font-semibold text-gray-900">{s.name}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className="px-2 py-0.5 rounded text-xs font-bold text-white"
                                    style={{ backgroundColor: BRANCH_COLORS[s.branch] ?? '#64748b' }}
                                  >
                                    {s.branch}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{s.company}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 flex flex-col items-center text-center">
                        <i className="ri-upload-cloud-2-line text-4xl text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">No student data uploaded yet</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Upload an Excel file with columns: S.No, Regd. No, Name, Branch, Company
                        </p>
                        <button
                          onClick={() => {
                            if (activeYear) fileInputRefs.current[activeYear]?.click();
                          }}
                          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 text-sm font-semibold rounded-lg hover:bg-teal-100 transition-colors border border-teal-200"
                        >
                          <i className="ri-file-excel-2-line" /> Choose Excel File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
