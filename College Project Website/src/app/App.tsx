import { useState, useRef, useEffect, KeyboardEvent } from "react";
import {
  GraduationCap, Map, Calendar, Users, Settings, MessageSquare,
  LogOut, Bell, Search, Mic, Send, MicOff, X, ChevronRight,
  BookOpen, Clock, User, Building, Phone, Mail, Menu, AlertCircle,
  TrendingUp, Award, FileText, CheckCircle, Volume2, Loader,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "login" | "map" | "faculty-timetable" | "class-timetable" | "admin" | "chatbot";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["9:00–10:00", "10:00–11:00", "11:00–12:00", "12:00–1:00", "1:00–2:00", "2:00–3:00", "3:00–4:00"];

const FACULTY_LIST = [
  { id: 1, name: "Dr. Ananya Sharma", dept: "Computer Science", email: "ananya.s@iare.ac.in", phone: "+91-98001-11001" },
  { id: 2, name: "Prof. Rajesh Kumar", dept: "Computer Science", email: "rajesh.k@iare.ac.in", phone: "+91-98001-11002" },
  { id: 3, name: "Dr. Priya Nair", dept: "Electronics", email: "priya.n@iare.ac.in", phone: "+91-98001-11003" },
  { id: 4, name: "Dr. Vikram Mehta", dept: "Mechanical", email: "vikram.m@iare.ac.in", phone: "+91-98001-11004" },
  { id: 5, name: "Prof. Sunita Rao", dept: "Mathematics", email: "sunita.r@iare.ac.in", phone: "+91-98001-11005" },
  { id: 6, name: "Dr. Arun Patel", dept: "Physics", email: "arun.p@iare.ac.in", phone: "+91-98001-11006" },
];

const FACULTY_TIMETABLE: Record<number, Record<string, Record<string, string>>> = {
  1: {
    Mon: { "9:00–10:00": "Machine Learning (CS301)", "11:00–12:00": "Lab: ML (CS301L)", "2:00–3:00": "Research Seminar" },
    Tue: { "10:00–11:00": "Deep Learning (CS401)", "3:00–4:00": "Office Hours" },
    Wed: { "9:00–10:00": "Machine Learning (CS301)", "11:00–12:00": "Lab: ML (CS301L)" },
    Thu: { "10:00–11:00": "Deep Learning (CS401)", "2:00–3:00": "Thesis Review" },
    Fri: { "9:00–10:00": "Machine Learning (CS301)", "1:00–2:00": "Department Meeting" },
    Sat: { "10:00–11:00": "Extra Class – ML" },
  },
  2: {
    Mon: { "10:00–11:00": "Data Structures (CS201)", "2:00–3:00": "Algorithms (CS202)" },
    Tue: { "9:00–10:00": "Data Structures (CS201)", "11:00–12:00": "Lab: DSA (CS201L)" },
    Wed: { "10:00–11:00": "Algorithms (CS202)", "3:00–4:00": "Office Hours" },
    Thu: { "9:00–10:00": "Data Structures (CS201)", "2:00–3:00": "Project Review" },
    Fri: { "11:00–12:00": "Algorithms (CS202)", "1:00–2:00": "Dept. Meeting" },
    Sat: {},
  },
  3: {
    Mon: { "9:00–10:00": "Digital Circuits (EC201)", "11:00–12:00": "VLSI Design (EC401)" },
    Tue: { "10:00–11:00": "Lab: DC (EC201L)", "2:00–3:00": "Microcontrollers (EC301)" },
    Wed: { "9:00–10:00": "VLSI Design (EC401)", "3:00–4:00": "Office Hours" },
    Thu: { "11:00–12:00": "Digital Circuits (EC201)", "1:00–2:00": "Microcontrollers (EC301)" },
    Fri: { "10:00–11:00": "Lab: VLSI (EC401L)" },
    Sat: { "9:00–10:00": "Seminar: IoT" },
  },
  4: {
    Mon: { "10:00–11:00": "Thermodynamics (ME201)", "2:00–3:00": "Fluid Mechanics (ME301)" },
    Tue: { "9:00–10:00": "Machine Design (ME401)", "11:00–12:00": "Lab: ME (ME301L)" },
    Wed: { "10:00–11:00": "Thermodynamics (ME201)", "3:00–4:00": "Office Hours" },
    Thu: { "9:00–10:00": "Fluid Mechanics (ME301)", "2:00–3:00": "Research" },
    Fri: { "11:00–12:00": "Machine Design (ME401)" },
    Sat: {},
  },
  5: {
    Mon: { "9:00–10:00": "Calculus (MA101)", "11:00–12:00": "Linear Algebra (MA201)" },
    Tue: { "10:00–11:00": "Probability (MA301)", "2:00–3:00": "Calculus (MA101)" },
    Wed: { "9:00–10:00": "Linear Algebra (MA201)", "3:00–4:00": "Office Hours" },
    Thu: { "10:00–11:00": "Probability (MA301)", "1:00–2:00": "Tutorial Session" },
    Fri: { "9:00–10:00": "Calculus (MA101)", "11:00–12:00": "Linear Algebra (MA201)" },
    Sat: { "10:00–11:00": "Extra Tutorial" },
  },
  6: {
    Mon: { "10:00–11:00": "Engineering Physics (PH101)", "2:00–3:00": "Quantum Mechanics (PH301)" },
    Tue: { "9:00–10:00": "Lab: Physics (PH101L)", "3:00–4:00": "Office Hours" },
    Wed: { "11:00–12:00": "Engineering Physics (PH101)", "1:00–2:00": "Quantum Mechanics (PH301)" },
    Thu: { "10:00–11:00": "Lab: Physics (PH101L)" },
    Fri: { "9:00–10:00": "Quantum Mechanics (PH301)" },
    Sat: {},
  },
};

const CLASSES = ["CS-A (3rd Year)", "CS-B (3rd Year)", "EC-A (2nd Year)", "ME-A (4th Year)"];

const CLASS_TIMETABLES: Record<string, Record<string, Record<string, { subject: string; faculty: string }>>> = {
  "CS-A (3rd Year)": {
    Mon: {
      "9:00–10:00": { subject: "Machine Learning", faculty: "Dr. Ananya Sharma" },
      "10:00–11:00": { subject: "Data Structures", faculty: "Prof. Rajesh Kumar" },
      "11:00–12:00": { subject: "Lab: ML", faculty: "Dr. Ananya Sharma" },
      "1:00–2:00": { subject: "Probability", faculty: "Prof. Sunita Rao" },
      "2:00–3:00": { subject: "Engineering Physics", faculty: "Dr. Arun Patel" },
    },
    Tue: {
      "9:00–10:00": { subject: "Data Structures", faculty: "Prof. Rajesh Kumar" },
      "10:00–11:00": { subject: "Deep Learning", faculty: "Dr. Ananya Sharma" },
      "11:00–12:00": { subject: "Lab: DSA", faculty: "Prof. Rajesh Kumar" },
      "2:00–3:00": { subject: "Linear Algebra", faculty: "Prof. Sunita Rao" },
    },
    Wed: {
      "9:00–10:00": { subject: "Machine Learning", faculty: "Dr. Ananya Sharma" },
      "10:00–11:00": { subject: "Algorithms", faculty: "Prof. Rajesh Kumar" },
      "2:00–3:00": { subject: "Probability", faculty: "Prof. Sunita Rao" },
      "3:00–4:00": { subject: "Seminar", faculty: "Dept. Faculty" },
    },
    Thu: {
      "9:00–10:00": { subject: "Data Structures", faculty: "Prof. Rajesh Kumar" },
      "10:00–11:00": { subject: "Deep Learning", faculty: "Dr. Ananya Sharma" },
      "1:00–2:00": { subject: "Engineering Physics", faculty: "Dr. Arun Patel" },
      "2:00–3:00": { subject: "Thesis Review", faculty: "Guide" },
    },
    Fri: {
      "9:00–10:00": { subject: "Machine Learning", faculty: "Dr. Ananya Sharma" },
      "11:00–12:00": { subject: "Algorithms", faculty: "Prof. Rajesh Kumar" },
      "1:00–2:00": { subject: "Linear Algebra", faculty: "Prof. Sunita Rao" },
    },
    Sat: {
      "10:00–11:00": { subject: "Extra Class – ML", faculty: "Dr. Ananya Sharma" },
    },
  },
  "CS-B (3rd Year)": {
    Mon: {
      "10:00–11:00": { subject: "Algorithms", faculty: "Prof. Rajesh Kumar" },
      "11:00–12:00": { subject: "Digital Circuits", faculty: "Dr. Priya Nair" },
      "2:00–3:00": { subject: "Calculus", faculty: "Prof. Sunita Rao" },
    },
    Tue: {
      "9:00–10:00": { subject: "Algorithms", faculty: "Prof. Rajesh Kumar" },
      "10:00–11:00": { subject: "Lab: DSA", faculty: "Prof. Rajesh Kumar" },
      "2:00–3:00": { subject: "Machine Learning", faculty: "Dr. Ananya Sharma" },
    },
    Wed: {
      "9:00–10:00": { subject: "Deep Learning", faculty: "Dr. Ananya Sharma" },
      "11:00–12:00": { subject: "Calculus", faculty: "Prof. Sunita Rao" },
      "2:00–3:00": { subject: "Lab: ML", faculty: "Dr. Ananya Sharma" },
    },
    Thu: {
      "10:00–11:00": { subject: "Algorithms", faculty: "Prof. Rajesh Kumar" },
      "1:00–2:00": { subject: "Probability", faculty: "Prof. Sunita Rao" },
    },
    Fri: {
      "9:00–10:00": { subject: "Deep Learning", faculty: "Dr. Ananya Sharma" },
      "11:00–12:00": { subject: "Digital Circuits", faculty: "Dr. Priya Nair" },
    },
    Sat: {},
  },
  "EC-A (2nd Year)": {
    Mon: {
      "9:00–10:00": { subject: "Digital Circuits", faculty: "Dr. Priya Nair" },
      "10:00–11:00": { subject: "Thermodynamics", faculty: "Dr. Vikram Mehta" },
      "2:00–3:00": { subject: "Calculus", faculty: "Prof. Sunita Rao" },
    },
    Tue: {
      "10:00–11:00": { subject: "Lab: DC", faculty: "Dr. Priya Nair" },
      "11:00–12:00": { subject: "Engineering Physics", faculty: "Dr. Arun Patel" },
      "2:00–3:00": { subject: "Microcontrollers", faculty: "Dr. Priya Nair" },
    },
    Wed: {
      "9:00–10:00": { subject: "VLSI Design", faculty: "Dr. Priya Nair" },
      "11:00–12:00": { subject: "Calculus", faculty: "Prof. Sunita Rao" },
    },
    Thu: {
      "11:00–12:00": { subject: "Digital Circuits", faculty: "Dr. Priya Nair" },
      "1:00–2:00": { subject: "Microcontrollers", faculty: "Dr. Priya Nair" },
      "2:00–3:00": { subject: "Engineering Physics", faculty: "Dr. Arun Patel" },
    },
    Fri: {
      "10:00–11:00": { subject: "Lab: VLSI", faculty: "Dr. Priya Nair" },
      "2:00–3:00": { subject: "Linear Algebra", faculty: "Prof. Sunita Rao" },
    },
    Sat: {
      "9:00–10:00": { subject: "Seminar: IoT", faculty: "Dr. Priya Nair" },
    },
  },
  "ME-A (4th Year)": {
    Mon: {
      "10:00–11:00": { subject: "Thermodynamics", faculty: "Dr. Vikram Mehta" },
      "11:00–12:00": { subject: "Quantum Mechanics", faculty: "Dr. Arun Patel" },
      "2:00–3:00": { subject: "Fluid Mechanics", faculty: "Dr. Vikram Mehta" },
    },
    Tue: {
      "9:00–10:00": { subject: "Machine Design", faculty: "Dr. Vikram Mehta" },
      "11:00–12:00": { subject: "Lab: ME", faculty: "Dr. Vikram Mehta" },
      "3:00–4:00": { subject: "Probability", faculty: "Prof. Sunita Rao" },
    },
    Wed: {
      "10:00–11:00": { subject: "Thermodynamics", faculty: "Dr. Vikram Mehta" },
      "1:00–2:00": { subject: "Quantum Mechanics", faculty: "Dr. Arun Patel" },
    },
    Thu: {
      "9:00–10:00": { subject: "Fluid Mechanics", faculty: "Dr. Vikram Mehta" },
      "11:00–12:00": { subject: "Machine Design", faculty: "Dr. Vikram Mehta" },
    },
    Fri: {
      "11:00–12:00": { subject: "Machine Design", faculty: "Dr. Vikram Mehta" },
      "2:00–3:00": { subject: "Project Work", faculty: "Guide" },
    },
    Sat: {},
  },
};

const NOTICES = [
  { id: 1, title: "Mid-Semester Examination Schedule Released", date: "Oct 5, 2026", type: "exam", urgent: true },
  { id: 2, title: "Annual Tech Fest 'IMPULSE 2026' – Registrations Open", date: "Oct 3, 2026", type: "event", urgent: false },
  { id: 3, title: "Library Timings Extended Till 10 PM During Exams", date: "Oct 2, 2026", type: "info", urgent: false },
  { id: 4, title: "Scholarship Applications – Last Date Oct 15", date: "Oct 1, 2026", type: "scholarship", urgent: true },
  { id: 5, title: "NBA Accreditation Visit – Please Maintain Campus Discipline", date: "Sep 30, 2026", type: "admin", urgent: false },
  { id: 6, title: "New Elective Course: 'Generative AI' – Enrollment Starts Oct 10", date: "Sep 28, 2026", type: "academic", urgent: false },
];

const ADMIN_STATS = [
  { label: "Total Students", value: "4,280", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Faculty Members", value: "186", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Departments", value: "12", icon: Building, color: "text-cyan-600", bg: "bg-cyan-50" },
  { label: "Courses Offered", value: "94", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
];

// ─── NLP Chatbot Logic ─────────────────────────────────────────────────────────
function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim();

  if (/hello|hi|hey|good (morning|evening|afternoon)/i.test(q))
    return "Hello! I'm the IARE Campus Assistant. I can help you with timetables, faculty info, exam schedules, library hours, and general campus queries. What would you like to know?";

  if (/exam|test|mid.?sem|end.?sem|schedule/i.test(q))
    return "The Mid-Semester Examinations are scheduled from October 20–28, 2026. End-semester exams will be held from November 25 – December 8, 2026. You can download the detailed schedule from the Academics portal or check the Administration notice board.";

  if (/library|book|borrow|reading/i.test(q))
    return "The IARE Central Library is open Monday–Saturday, 8:00 AM to 10:00 PM (extended during exam season). You can borrow up to 5 books for 14 days. E-resources are accessible 24/7 via the IARE digital library portal.";

  if (/fee|tuition|payment|scholarship/i.test(q))
    return "Semester fees are due by November 1, 2026. Scholarship applications close on October 15, 2026. You can pay fees online via the Student Portal → Finance section. For queries, contact the Accounts Office at accounts@iare.ac.in.";

  if (/hostel|room|accommodation|mess/i.test(q))
    return "IARE has 8 hostels — 5 for boys (NH1–NH5) and 3 for girls (GH1–GH3). Mess timings: Breakfast 7–9 AM, Lunch 12–2 PM, Dinner 7–9 PM. Contact the Hostel Office at hostel@iare.ac.in for allocation queries.";

  if (/placement|internship|job|recruit/i.test(q))
    return "The 2026–27 placement season opens in December 2026. Companies like Google, Microsoft, Infosys, TCS, and ISRO regularly recruit from IARE. Register at the Career Development Centre portal. Contact: cdc@iare.ac.in.";

  if (/faculty|professor|teacher|staff/i.test(q))
    return "IARE has 186 faculty members across 12 departments. You can view the Faculty Timetable from the navigation menu. For individual faculty contacts, visit the respective department pages or the Faculty Directory on the IARE website.";

  if (/timetable|schedule|class|lecture/i.test(q))
    return "Class timetables are available in the 'Class Timetable' section of this portal. You can filter by class (CS-A, CS-B, EC-A, ME-A) and view the week-wise schedule. Faculty timetables are under 'Faculty Timetable'.";

  if (/canteen|cafe|food|eat/i.test(q))
    return "The Main Canteen is open 8 AM–9 PM daily. There are also 3 department canteens. The Student Activity Centre (SAC) Cafe serves snacks until 11 PM. Special mess menus on Sundays and festive days!";

  if (/wifi|internet|network|connectivity/i.test(q))
    return "IARE campus has 1 Gbps NKN connectivity with Wi-Fi across all academic blocks, hostels, and common areas. Connect to 'IARE-Academic' (use your roll number + DOB as password). For issues, contact: netadmin@iare.ac.in.";

  if (/bus|transport|shuttle|conveyance/i.test(q))
    return "Campus shuttle buses run between IARE Gate and Surathkal Railway Station every 30 minutes (6 AM–10 PM). Route maps are posted at the Transport Office near the main gate. Monthly passes available for ₹300.";

  if (/sports|ground|gym|fitness|play/i.test(q))
    return "IARE Sports Complex includes a cricket ground, football field, basketball and tennis courts, a swimming pool, and a fully equipped gymnasium. The gym is open 6 AM–8 AM and 5 PM–8 PM on weekdays.";

  if (/admission|apply|entrance|rank/i.test(q))
    return "IARE College admits students through JEE Main (B.Tech), GATE (M.Tech), and CSIR/UGC-NET (PhD). The B.Tech cutoff ranks for 2026 ranged from 200 (CSE) to 18,000 (Civil). Contact: admissions@iare.ac.in.";

  if (/contact|helpdesk|support|help/i.test(q))
    return "Campus Helpdesk: 0824-2473000 | Email: helpdesk@iare.ac.in | Available Mon–Sat, 9 AM–5 PM. Emergency: Security Control Room – 0824-2473911 (24×7). I can also help you directly — just ask!";

  if (/department|course|branch|programme/i.test(q))
    return "IARE College has 12 departments: Computer Science, Electronics & Communication, Mechanical, Civil, Chemical, Mining, Metallurgy, Electrical, Information Technology, Mathematics, Physics, and Humanities. Each offers B.Tech, M.Tech, and PhD programs.";

  if (/nlp|chatbot|ai|artificial intelligence|natural language/i.test(q))
    return "This chatbot uses Natural Language Processing (NLP) techniques including tokenization, intent classification, and keyword-based entity extraction to understand your queries. It's built as part of the final-year CS project on Voice & Text NLP Systems.";

  if (/principal|director|hod|head/i.test(q))
    return "Director: Prof. B. Ramadoss | Registrar: Dr. S.K. Gupta | Dean (Academic): Prof. Rekha Iyengar. HODs are listed on the IARE website under each department. You can reach administration at admin@iare.ac.in.";

  if (/thank|thanks|great|nice|awesome|good/i.test(q))
    return "You're welcome! I'm always here to help you navigate the IARE campus. Feel free to ask anything — from exam schedules to hostel queries. Have a great day!";

  if (/bye|goodbye|see you|exit/i.test(q))
    return "Goodbye! Remember, I'm available 24/7 on this portal for any campus queries. All the best with your studies!";

  return `I understood you're asking about "${input}". While I don't have a direct answer right now, I can help with: timetables, exams, library, fees, hostels, placements, transport, sports, and campus info. Could you rephrase or ask something specific?`;
}

// ─── Campus Map Buildings ─────────────────────────────────────────────────────
const BUILDINGS = [
  { id: "main", label: "Main Building", x: 310, y: 130, w: 100, h: 60, color: "#1e40af", desc: "Administrative HQ, Principal & Registrar offices" },
  { id: "cs", label: "CS Dept.", x: 180, y: 230, w: 85, h: 50, color: "#4f46e5", desc: "Computer Science & IT Department, Labs, Faculty rooms" },
  { id: "ec", label: "EC Dept.", x: 450, y: 230, w: 85, h: 50, color: "#7c3aed", desc: "Electronics & Communication Dept, VLSI & Comm. Labs" },
  { id: "library", label: "Library", x: 310, y: 260, w: 90, h: 55, color: "#0891b2", desc: "Central Library — 1.2 lakh books, e-journals, reading halls" },
  { id: "canteen", label: "Canteen", x: 180, y: 340, w: 80, h: 45, color: "#059669", desc: "Main Canteen & Food Court — Open 8 AM to 9 PM" },
  { id: "sports", label: "Sports Complex", x: 470, y: 340, w: 95, h: 50, color: "#d97706", desc: "Cricket, Football, Basketball, Gym, Swimming Pool" },
  { id: "hostel-boys", label: "Boys Hostel", x: 130, y: 420, w: 85, h: 45, color: "#2563eb", desc: "NH1–NH5 | Capacity: 2400 students" },
  { id: "hostel-girls", label: "Girls Hostel", x: 520, y: 420, w: 85, h: 45, color: "#db2777", desc: "GH1–GH3 | Capacity: 900 students" },
  { id: "me-dept", label: "ME Dept.", x: 300, y: 370, w: 80, h: 45, color: "#b45309", desc: "Mechanical Engineering Dept., Workshop, Fluid Lab" },
  { id: "auditorium", label: "Auditorium", x: 390, y: 160, w: 75, h: 45, color: "#0f766e", desc: "Golden Jubilee Auditorium — 1200 seats" },
  { id: "gate", label: "Main Gate", x: 310, y: 480, w: 100, h: 35, color: "#374151", desc: "Main Entrance — Security 24×7 | Bus Stop nearby" },
];

// ─── Sidebar Items ─────────────────────────────────────────────────────────────
const NAV_ITEMS: { page: Page; icon: typeof Map; label: string }[] = [
  { page: "map", icon: Map, label: "Campus Map" },
  { page: "faculty-timetable", icon: GraduationCap, label: "Faculty Timetable" },
  { page: "class-timetable", icon: Calendar, label: "Class Timetable" },
  { page: "admin", icon: Settings, label: "Administration" },
  { page: "chatbot", icon: MessageSquare, label: "Campus Chatbot" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [user, setUser] = useState({ name: "", role: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (page === "login") {
    return <LoginPage onLogin={(name, role) => { setUser({ name, role }); setPage("map"); }} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}
        style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #1e3a8a 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={20} className="text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                IARE College
              </p>
              <p className="text-blue-300 text-xs">Campus Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {NAV_ITEMS.map(({ page: p, icon: Icon, label }) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                page === p
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
              {sidebarOpen && page === p && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/10">
          <div className={`flex items-center gap-2 ${!sidebarOpen ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{user.name[0]}</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user.name}</p>
                <p className="text-blue-300 text-xs truncate">{user.role}</p>
              </div>
            )}
            {sidebarOpen && (
              <button onClick={() => setPage("login")} className="text-blue-300 hover:text-white transition-colors">
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-3 bg-white border-b border-border shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
            <Menu size={20} />
          </button>
          <h1 className="font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {NAV_ITEMS.find((n) => n.page === page)?.label ?? "Portal"}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                className="pl-9 pr-4 py-1.5 text-sm border border-border rounded-lg bg-input-background focus:outline-none focus:ring-1 focus:ring-ring w-48"
                placeholder="Search..."
              />
            </div>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {page === "map" && <CampusMapPage />}
          {page === "faculty-timetable" && <FacultyTimetablePage />}
          {page === "class-timetable" && <ClassTimetablePage />}
          {page === "admin" && <AdminPage />}
          {page === "chatbot" && <ChatbotPage />}
        </main>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (name: string, role: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEMO = {
    student: { email: "student@iare.ac.in", pass: "student123", name: "Arjun Menon" },
    faculty: { email: "faculty@iare.ac.in", pass: "faculty123", name: "Dr. Ananya Sharma" },
    admin: { email: "admin@iare.ac.in", pass: "admin123", name: "Admin User" },
  };

  function handleLogin() {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const d = DEMO[role as keyof typeof DEMO];
      if (email === d.email && password === d.pass) {
        onLogin(d.name, role.charAt(0).toUpperCase() + role.slice(1));
      } else {
        setError("Invalid credentials. Use the demo credentials shown below.");
      }
      setLoading(false);
    }, 800);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #1e3a8a 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              background: i % 2 === 0 ? "#3b82f6" : "#7c3aed",
              top: `${10 + i * 12}%`,
              left: i < 3 ? `${-5 + i * 5}%` : `${65 + (i - 3) * 15}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4 border border-white/20">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            IARE College
          </h1>
          <p className="text-blue-300 mt-1 text-sm">Campus Management Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white text-lg font-semibold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Sign In to Your Account
          </h2>

          {/* Role tabs */}
          <div className="flex gap-1 p-1 bg-white/10 rounded-lg mb-6">
            {["student", "faculty", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setEmail(DEMO[r as keyof typeof DEMO].email); setPassword(DEMO[r as keyof typeof DEMO].pass); }}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  role === r ? "bg-white text-blue-700" : "text-blue-200 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-blue-200 text-xs font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${role}@iare.ac.in`}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/60 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-blue-200 text-xs font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/60 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-300 text-xs bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-70"
              style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Demo creds */}
          <div className="mt-5 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-blue-300 text-xs font-medium mb-1">Demo Credentials ({role})</p>
            <p className="text-blue-200 text-xs font-mono">{DEMO[role as keyof typeof DEMO].email}</p>
            <p className="text-blue-200 text-xs font-mono">{DEMO[role as keyof typeof DEMO].pass}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Campus Map Page ──────────────────────────────────────────────────────────
function CampusMapPage() {
  const [selected, setSelected] = useState<typeof BUILDINGS[0] | null>(null);

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Interactive Campus Map
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Click on any building to view details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2.5 flex items-center gap-2">
            <Map size={16} className="text-white" />
            <span className="text-white text-sm font-semibold">IARE College Campus — Aerial View</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <svg
              viewBox="0 0 720 560"
              className="w-full"
              style={{ background: "linear-gradient(180deg, #dbeafe 0%, #e0e7ff 100%)", borderRadius: "12px", minWidth: "400px" }}
            >
              {/* Roads */}
              <rect x="298" y="80" width="120" height="450" fill="#94a3b8" opacity="0.25" rx="4" />
              <rect x="80" y="270" width="550" height="80" fill="#94a3b8" opacity="0.2" rx="4" />
              {/* Sea */}
              <ellipse cx="640" cy="280" rx="90" ry="240" fill="#bfdbfe" opacity="0.6" />
              <text x="620" y="285" fontSize="11" fill="#1d4ed8" opacity="0.7" textAnchor="middle" fontFamily="Inter">Arabian Sea</text>

              {/* Green areas */}
              <ellipse cx="360" cy="520" rx="140" ry="25" fill="#bbf7d0" opacity="0.5" />
              <ellipse cx="360" cy="200" rx="50" ry="30" fill="#d1fae5" opacity="0.5" />
              <text x="360" y="206" fontSize="9" fill="#059669" textAnchor="middle" fontFamily="Inter">Garden</text>

              {/* Buildings */}
              {BUILDINGS.map((b) => (
                <g key={b.id} style={{ cursor: "pointer" }} onClick={() => setSelected(selected?.id === b.id ? null : b)}>
                  <rect
                    x={b.x} y={b.y} width={b.w} height={b.h}
                    rx="6" ry="6"
                    fill={b.color}
                    opacity={selected?.id === b.id ? 1 : 0.85}
                    stroke={selected?.id === b.id ? "#fbbf24" : "white"}
                    strokeWidth={selected?.id === b.id ? 2.5 : 1}
                    className="transition-all"
                  />
                  <text
                    x={b.x + b.w / 2} y={b.y + b.h / 2 - 4}
                    textAnchor="middle" fontSize="9" fill="white"
                    fontFamily="Inter" fontWeight="600"
                  >
                    {b.label.split(" ").slice(0, 2).join(" ")}
                  </text>
                  {b.label.split(" ").length > 2 && (
                    <text
                      x={b.x + b.w / 2} y={b.y + b.h / 2 + 8}
                      textAnchor="middle" fontSize="9" fill="white"
                      fontFamily="Inter" fontWeight="600"
                    >
                      {b.label.split(" ").slice(2).join(" ")}
                    </text>
                  )}
                </g>
              ))}
              {/* Compass */}
              <g transform="translate(60,90)">
                <circle r="20" fill="white" opacity="0.8" />
                <text textAnchor="middle" y="-7" fontSize="11" fontWeight="700" fill="#1e40af" fontFamily="Inter">N</text>
                <line y1="-2" y2="10" stroke="#1e40af" strokeWidth="1.5" />
                <text textAnchor="middle" y="18" fontSize="8" fill="#64748b" fontFamily="Inter">S</text>
                <text x="-14" y="4" fontSize="8" fill="#64748b" fontFamily="Inter">W</text>
                <text x="8" y="4" fontSize="8" fill="#64748b" fontFamily="Inter">E</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-4">
          {selected ? (
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-3 text-white" style={{ background: selected.color }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {selected.label}
                  </h3>
                  <button onClick={() => setSelected(null)} className="opacity-70 hover:opacity-100"><X size={16} /></button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground leading-relaxed">{selected.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Building size={12} />
                  <span>Building ID: {selected.id.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
              <Map size={28} className="text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">Select a building</p>
              <p className="text-xs text-muted-foreground mt-1">Click any colored block on the map to see its details</p>
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Campus Legend</h4>
            <div className="space-y-2">
              {BUILDINGS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(selected?.id === b.id ? null : b)}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all text-xs hover:bg-muted ${selected?.id === b.id ? "bg-muted" : ""}`}
                >
                  <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: b.color }} />
                  <span className="text-foreground font-medium truncate">{b.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Faculty Timetable Page ───────────────────────────────────────────────────
function FacultyTimetablePage() {
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTY_LIST[0]);
  const [selectedDept, setSelectedDept] = useState("All");
  const depts = ["All", ...Array.from(new Set(FACULTY_LIST.map((f) => f.dept)))];
  const filtered = FACULTY_LIST.filter((f) => selectedDept === "All" || f.dept === selectedDept);
  const timetable = FACULTY_TIMETABLE[selectedFaculty.id] ?? {};

  const cellColor = (slot: string) => {
    if (slot.includes("Lab")) return "bg-purple-50 text-purple-700 border-l-2 border-purple-400";
    if (slot.includes("Office")) return "bg-green-50 text-green-700 border-l-2 border-green-400";
    if (slot.includes("Research") || slot.includes("Seminar") || slot.includes("Review")) return "bg-amber-50 text-amber-700 border-l-2 border-amber-400";
    if (slot.includes("Meeting")) return "bg-cyan-50 text-cyan-700 border-l-2 border-cyan-400";
    return "bg-blue-50 text-blue-700 border-l-2 border-blue-400";
  };

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Faculty Timetable
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Week-wise schedule for all faculty members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Faculty List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {depts.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="p-2">
            {filtered.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFaculty(f)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all mb-1 ${
                  selectedFaculty.id === f.id ? "bg-blue-50 border border-blue-200" : "hover:bg-muted"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold truncate ${selectedFaculty.id === f.id ? "text-blue-700" : "text-foreground"}`}>
                    {f.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{f.dept}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Faculty Info */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            >
              {selectedFaculty.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {selectedFaculty.name}
              </h3>
              <p className="text-sm text-muted-foreground">{selectedFaculty.dept} Department</p>
            </div>
            <div className="hidden md:flex flex-col gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Mail size={11} />{selectedFaculty.email}</div>
              <div className="flex items-center gap-1.5"><Phone size={11} />{selectedFaculty.phone}</div>
            </div>
          </div>

          {/* Grid */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "linear-gradient(90deg, #1e3a8a, #4f46e5)" }}>
                    <th className="px-3 py-3 text-left text-white font-semibold w-28">Time</th>
                    {DAYS.map((d) => (
                      <th key={d} className="px-2 py-3 text-center text-white font-semibold">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIME_SLOTS.map((slot, i) => (
                    <tr key={slot} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-3 py-2.5 text-muted-foreground font-mono font-medium whitespace-nowrap border-r border-border">
                        {slot}
                      </td>
                      {DAYS.map((day) => {
                        const cell = timetable[day]?.[slot];
                        return (
                          <td key={day} className="px-1.5 py-1.5 text-center border-r border-border last:border-r-0">
                            {cell ? (
                              <div className={`rounded-md px-2 py-1.5 text-left ${cellColor(cell)}`}>
                                <p className="font-semibold leading-tight text-[10px]">{cell.split("(")[0].trim()}</p>
                                {cell.includes("(") && (
                                  <p className="opacity-70 text-[9px] mt-0.5">{cell.match(/\(([^)]+)\)/)?.[1]}</p>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground/40">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Legend */}
            <div className="px-4 py-3 border-t border-border flex flex-wrap gap-3">
              {[
                { label: "Lecture", cls: "bg-blue-100 border-l-2 border-blue-400" },
                { label: "Lab", cls: "bg-purple-100 border-l-2 border-purple-400" },
                { label: "Office Hours", cls: "bg-green-100 border-l-2 border-green-400" },
                { label: "Research/Seminar", cls: "bg-amber-100 border-l-2 border-amber-400" },
                { label: "Meeting", cls: "bg-cyan-100 border-l-2 border-cyan-400" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-sm ${l.cls}`} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Class Timetable Page ──────────────────────────────────────────────────────
function ClassTimetablePage() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const timetable = CLASS_TIMETABLES[selectedClass] ?? {};

  const subjectColors: Record<string, string> = {};
  const palette = [
    "bg-blue-50 text-blue-700 border-l-2 border-blue-400",
    "bg-purple-50 text-purple-700 border-l-2 border-purple-400",
    "bg-teal-50 text-teal-700 border-l-2 border-teal-400",
    "bg-amber-50 text-amber-700 border-l-2 border-amber-400",
    "bg-pink-50 text-pink-700 border-l-2 border-pink-400",
    "bg-indigo-50 text-indigo-700 border-l-2 border-indigo-400",
    "bg-green-50 text-green-700 border-l-2 border-green-400",
    "bg-orange-50 text-orange-700 border-l-2 border-orange-400",
  ];
  let colorIdx = 0;

  Object.values(timetable).forEach((daySlots) =>
    Object.values(daySlots).forEach(({ subject }) => {
      if (!subjectColors[subject]) {
        subjectColors[subject] = palette[colorIdx % palette.length];
        colorIdx++;
      }
    })
  );

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Class Timetable
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Weekly lecture schedule by class and section</p>
      </div>

      {/* Class Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CLASSES.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedClass(c)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedClass === c
                ? "text-white shadow-md"
                : "bg-white border border-border text-muted-foreground hover:border-blue-300 hover:text-blue-600"
            }`}
            style={selectedClass === c ? { background: "linear-gradient(90deg, #2563eb, #7c3aed)" } : {}}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #1e3a8a, #4f46e5)" }}>
                <th className="px-3 py-3 text-left text-white font-semibold w-28">Time</th>
                {DAYS.map((d) => (
                  <th key={d} className="px-2 py-3 text-center text-white font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot, i) => {
                const isLunch = slot === "12:00–1:00";
                return (
                  <tr key={slot} className={isLunch ? "bg-orange-50/60" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-3 py-2.5 text-muted-foreground font-mono font-medium whitespace-nowrap border-r border-border">
                      {isLunch ? (
                        <span className="text-orange-600 font-semibold">🍽 Lunch</span>
                      ) : slot}
                    </td>
                    {DAYS.map((day) => {
                      if (isLunch) return (
                        <td key={day} className="px-1.5 py-1.5 border-r border-border last:border-r-0">
                          <div className="text-center text-orange-400 text-[10px]">Break</div>
                        </td>
                      );
                      const cell = timetable[day]?.[slot];
                      return (
                        <td key={day} className="px-1.5 py-1.5 border-r border-border last:border-r-0">
                          {cell ? (
                            <div className={`rounded-md px-2 py-1.5 ${subjectColors[cell.subject] ?? "bg-gray-50 text-gray-700 border-l-2 border-gray-300"}`}>
                              <p className="font-semibold leading-tight text-[10px]">{cell.subject}</p>
                              <p className="opacity-70 text-[9px] mt-0.5">{cell.faculty.split(" ").slice(-1)[0]}</p>
                            </div>
                          ) : (
                            <span className="text-center block text-muted-foreground/30">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Subject Legend */}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Subject Legend</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(subjectColors).map(([subj, cls]) => (
              <div key={subj} className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium ${cls}`}>
                {subj}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Summary */}
      <div className="mt-6 bg-white rounded-2xl border border-border shadow-sm p-5">
        <h4 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Faculty Assigned — {selectedClass}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from(
            new Set(
              Object.values(timetable).flatMap((day) => Object.values(day).map((c) => c.faculty))
            )
          ).map((fac) => (
            <div key={fac} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              >
                {fac.split(" ").map((n) => n[0]).slice(-2).join("")}
              </div>
              <span className="text-xs text-foreground font-medium truncate">{fac}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
function AdminPage() {
  const [tab, setTab] = useState<"notices" | "faculty" | "stats">("notices");
  const [search, setSearch] = useState("");

  const filteredNotices = NOTICES.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const typeColors: Record<string, string> = {
    exam: "bg-red-100 text-red-700",
    event: "bg-blue-100 text-blue-700",
    info: "bg-gray-100 text-gray-600",
    scholarship: "bg-amber-100 text-amber-700",
    admin: "bg-purple-100 text-purple-700",
    academic: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Administration
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Campus notices, faculty directory, and institutional stats</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {ADMIN_STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit mb-6">
        {[
          { key: "notices", label: "Notices & Announcements", icon: Bell },
          { key: "faculty", label: "Faculty Directory", icon: Users },
          { key: "stats", label: "Academic Performance", icon: TrendingUp },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Notices Tab */}
      {tab === "notices" && (
        <div className="space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-start gap-4 hover:border-blue-200 transition-colors"
            >
              <div className={`mt-0.5 p-2 rounded-lg ${typeColors[n.type] ?? "bg-gray-100 text-gray-600"}`}>
                <FileText size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground leading-snug">{n.title}</p>
                  {n.urgent && (
                    <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} />{n.date}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${typeColors[n.type]}`}>{n.type}</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      )}

      {/* Faculty Directory Tab */}
      {tab === "faculty" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {FACULTY_LIST.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl border border-border shadow-sm p-4 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.dept}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail size={11} className="text-blue-500" />
                  <span className="truncate">{f.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={11} className="text-purple-500" />
                  <span>{f.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Tab */}
      {tab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Placement Rate by Department",
              items: [
                { label: "Computer Science", pct: 94 },
                { label: "Electronics", pct: 87 },
                { label: "Mechanical", pct: 78 },
                { label: "Civil", pct: 65 },
                { label: "Chemical", pct: 71 },
              ],
            },
            {
              title: "Research Publications (2025–26)",
              items: [
                { label: "SCI Journals", pct: 82, count: "148" },
                { label: "IEEE/ACM Papers", pct: 75, count: "134" },
                { label: "Patents Filed", pct: 40, count: "23" },
                { label: "PhD Theses", pct: 60, count: "41" },
                { label: "Funded Projects", pct: 55, count: "18" },
              ],
            },
          ].map((section) => (
            <div key={section.title} className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h4 className="font-bold text-sm text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {section.title}
              </h4>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground font-medium">{item.label}</span>
                      <span className="text-muted-foreground">
                        {"count" in item ? item.count : `${item.pct}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.pct}%`,
                          background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Awards */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-5">
            <h4 className="font-bold text-sm text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Recent Achievements
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Award, label: "NIRF Rank", value: "#21", color: "text-amber-600 bg-amber-50" },
                { icon: CheckCircle, label: "NBA Accredited", value: "8 Depts.", color: "text-green-600 bg-green-50" },
                { icon: TrendingUp, label: "Avg. Package", value: "₹18.4 LPA", color: "text-blue-600 bg-blue-50" },
                { icon: Users, label: "Alumni Network", value: "60,000+", color: "text-purple-600 bg-purple-50" },
              ].map((a) => (
                <div key={a.label} className={`rounded-xl p-4 ${a.color.split(" ")[1]}`}>
                  <a.icon size={22} className={a.color.split(" ")[0]} />
                  <p className="text-xl font-bold text-foreground mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {a.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Chatbot Page ─────────────────────────────────────────────────────────────
function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hello! I'm IARE Campus Assistant, powered by NLP. I can answer questions about timetables, exams, hostel, fees, placements, library, and more. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  function startListening() {
    const SR = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported in this browser."); return; }
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function speakText(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "en-IN";
      utt.rate = 0.95;
      utt.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utt);
    }
  }

  const QUICK = ["Exam schedule", "Library timings", "Hostel info", "Placement stats", "Bus route", "Fee payment"];

  return (
    <div className="h-full flex flex-col" style={{ maxHeight: "calc(100vh - 65px)" }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-border flex items-center gap-4 flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
        >
          <MessageSquare size={18} />
        </div>
        <div>
          <h2 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            IARE Campus Assistant
          </h2>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Online — NLP-powered chatbot
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">Voice & Text</span>
          <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg font-medium">NLP Engine</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto flex-shrink-0 bg-white border-b border-border">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className="flex-shrink-0 mt-1">
              {msg.role === "bot" ? (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  <MessageSquare size={14} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white">
                  <User size={14} />
                </div>
              )}
            </div>
            {/* Bubble */}
            <div className={`max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-tr-sm"
                    : "bg-white border border-border text-foreground rounded-tl-sm shadow-sm"
                }`}
                style={msg.role === "user" ? { background: "linear-gradient(135deg, #2563eb, #7c3aed)" } : {}}
              >
                {msg.text}
              </div>
              <div className={`flex items-center gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                {msg.role === "bot" && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                    title="Read aloud"
                  >
                    <Volume2 size={11} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            >
              <MessageSquare size={14} />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 bg-white border-t border-border flex-shrink-0">
        {listening && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            <Loader size={12} className="animate-spin" />
            Listening... speak now
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={listening ? stopListening : startListening}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              listening ? "bg-red-100 text-red-500 border border-red-200" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <input
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Ask anything about the campus..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          Supports voice input via Web Speech API · NLP intent classification active
        </p>
      </div>
    </div>
  );
}
