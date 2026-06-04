import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const GROUPS = {
  A: { teams: ["Mexico", "South Africa", "South Korea", "Czechia"] },
  B: { teams: ["Canada", "Bosnia-Herzegovina", "Qatar", "Switzerland"] },
  C: { teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  D: { teams: ["United States", "Paraguay", "Australia", "Türkiye"] },
  E: { teams: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"] },
  F: { teams: ["Netherlands", "Japan", "Sweden", "Tunisia"] },
  G: { teams: ["Belgium", "Egypt", "Iran", "New Zealand"] },
  H: { teams: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"] },
  I: { teams: ["France", "Senegal", "Iraq", "Norway"] },
  J: { teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  K: { teams: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"] },
  L: { teams: ["England", "Croatia", "Ghana", "Panama"] },
};

const FLAGS = {
  Mexico: "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", Czechia: "🇨🇿",
  Canada: "🇨🇦", "Bosnia-Herzegovina": "🇧🇦", Qatar: "🇶🇦", Switzerland: "🇨🇭",
  Brazil: "🇧🇷", Morocco: "🇲🇦", Haiti: "🇭🇹", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "United States": "🇺🇸", Paraguay: "🇵🇾", Australia: "🇦🇺", Türkiye: "🇹🇷",
  Germany: "🇩🇪", "Curaçao": "🇨🇼", "Ivory Coast": "🇨🇮", Ecuador: "🇪🇨",
  Netherlands: "🇳🇱", Japan: "🇯🇵", Sweden: "🇸🇪", Tunisia: "🇹🇳",
  Belgium: "🇧🇪", Egypt: "🇪🇬", Iran: "🇮🇷", "New Zealand": "🇳🇿",
  Spain: "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", Uruguay: "🇺🇾",
  France: "🇫🇷", Senegal: "🇸🇳", Iraq: "🇮🇶", Norway: "🇳🇴",
  Argentina: "🇦🇷", Algeria: "🇩🇿", Austria: "🇦🇹", Jordan: "🇯🇴",
  Portugal: "🇵🇹", "DR Congo": "🇨🇩", Uzbekistan: "🇺🇿", Colombia: "🇨🇴",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Croatia: "🇭🇷", Ghana: "🇬🇭", Panama: "🇵🇦",
  TBD: "⚽",
};

// All fixtures – GMT times
const FIXTURES = [
  // Jun 11
  { id:1, date:"2026-06-11", gmtTime:"19:00", home:"Mexico", away:"South Africa", group:"A", venue:"Mexico City" },
  { id:2, date:"2026-06-11", gmtTime:"23:00", home:"South Korea", away:"Czechia", group:"A", venue:"Guadalajara" },
  // Jun 12
  { id:3, date:"2026-06-12", gmtTime:"20:00", home:"Canada", away:"Bosnia-Herzegovina", group:"B", venue:"Toronto" },
  { id:4, date:"2026-06-12", gmtTime:"23:00", home:"United States", away:"Paraguay", group:"D", venue:"Los Angeles" },
  // Jun 13
  { id:5, date:"2026-06-13", gmtTime:"19:00", home:"Qatar", away:"Switzerland", group:"B", venue:"San Francisco" },
  { id:6, date:"2026-06-13", gmtTime:"22:00", home:"Brazil", away:"Morocco", group:"C", venue:"New York/NJ" },
  { id:7, date:"2026-06-13", gmtTime:"01:00", home:"Haiti", away:"Scotland", group:"C", venue:"Philadelphia", nextDay:true },
  // Jun 14
  { id:8, date:"2026-06-14", gmtTime:"17:00", home:"Germany", away:"Curaçao", group:"E", venue:"Houston" },
  { id:9, date:"2026-06-14", gmtTime:"20:00", home:"Netherlands", away:"Japan", group:"F", venue:"Arlington" },
  { id:10, date:"2026-06-14", gmtTime:"23:00", home:"Ivory Coast", away:"Ecuador", group:"E", venue:"Philadelphia" },
  { id:11, date:"2026-06-14", gmtTime:"02:00", home:"Sweden", away:"Tunisia", group:"F", venue:"Guadalajara", nextDay:true },
  // Jun 15
  { id:12, date:"2026-06-15", gmtTime:"17:00", home:"Spain", away:"Cape Verde", group:"H", venue:"Atlanta" },
  { id:13, date:"2026-06-15", gmtTime:"22:00", home:"Belgium", away:"Egypt", group:"G", venue:"Seattle" },
  { id:14, date:"2026-06-15", gmtTime:"23:00", home:"Saudi Arabia", away:"Uruguay", group:"H", venue:"Miami" },
  { id:15, date:"2026-06-15", gmtTime:"04:00", home:"Iran", away:"New Zealand", group:"G", venue:"Los Angeles", nextDay:true },
  // Jun 16
  { id:16, date:"2026-06-16", gmtTime:"20:00", home:"France", away:"Senegal", group:"I", venue:"New York/NJ" },
  { id:17, date:"2026-06-16", gmtTime:"23:00", home:"Iraq", away:"Norway", group:"I", venue:"Boston" },
  { id:18, date:"2026-06-16", gmtTime:"01:00", home:"Argentina", away:"Algeria", group:"J", venue:"Kansas City", nextDay:true },
  { id:19, date:"2026-06-16", gmtTime:"04:00", home:"Austria", away:"Jordan", group:"J", venue:"Seattle", nextDay:true },
  // Jun 17
  { id:20, date:"2026-06-17", gmtTime:"17:00", home:"Portugal", away:"DR Congo", group:"K", venue:"Los Angeles" },
  { id:21, date:"2026-06-17", gmtTime:"20:00", home:"England", away:"Croatia", group:"L", venue:"New York/NJ" },
  { id:22, date:"2026-06-17", gmtTime:"23:00", home:"Uzbekistan", away:"Colombia", group:"K", venue:"Dallas" },
  { id:23, date:"2026-06-17", gmtTime:"02:00", home:"Ghana", away:"Panama", group:"L", venue:"Atlanta", nextDay:true },
  // Jun 18
  { id:24, date:"2026-06-18", gmtTime:"17:00", home:"Australia", away:"Türkiye", group:"D", venue:"Houston" },
  { id:25, date:"2026-06-18", gmtTime:"20:00", home:"South Africa", away:"Czechia", group:"A", venue:"Toronto" },
  { id:26, date:"2026-06-18", gmtTime:"23:00", home:"Mexico", away:"South Korea", group:"A", venue:"Dallas" },
  { id:27, date:"2026-06-18", gmtTime:"02:00", home:"Bosnia-Herzegovina", away:"Qatar", group:"B", venue:"Vancouver", nextDay:true },
  // Jun 19
  { id:28, date:"2026-06-19", gmtTime:"17:00", home:"Brazil", away:"Haiti", group:"C", venue:"Philadelphia" },
  { id:29, date:"2026-06-19", gmtTime:"20:00", home:"Morocco", away:"Scotland", group:"C", venue:"New York/NJ" },
  { id:30, date:"2026-06-19", gmtTime:"23:00", home:"Canada", away:"Qatar", group:"B", venue:"Toronto" },
  { id:31, date:"2026-06-19", gmtTime:"02:00", home:"Switzerland", away:"Bosnia-Herzegovina", group:"B", venue:"Boston", nextDay:true },
  // Jun 20
  { id:32, date:"2026-06-20", gmtTime:"17:00", home:"Germany", away:"Ivory Coast", group:"E", venue:"Toronto" },
  { id:33, date:"2026-06-20", gmtTime:"20:00", home:"Ecuador", away:"Curaçao", group:"E", venue:"Kansas City" },
  { id:34, date:"2026-06-20", gmtTime:"23:00", home:"Netherlands", away:"Sweden", group:"F", venue:"Houston" },
  { id:35, date:"2026-06-20", gmtTime:"03:00", home:"Japan", away:"Tunisia", group:"F", venue:"Guadalajara", nextDay:true },
  // Jun 21
  { id:36, date:"2026-06-21", gmtTime:"17:00", home:"United States", away:"Australia", group:"D", venue:"Seattle" },
  { id:37, date:"2026-06-21", gmtTime:"20:00", home:"Paraguay", away:"Türkiye", group:"D", venue:"San Francisco" },
  { id:38, date:"2026-06-21", gmtTime:"23:00", home:"Belgium", away:"Iran", group:"G", venue:"Los Angeles" },
  { id:39, date:"2026-06-21", gmtTime:"02:00", home:"New Zealand", away:"Egypt", group:"G", venue:"Vancouver", nextDay:true },
  // Jun 22
  { id:40, date:"2026-06-22", gmtTime:"17:00", home:"France", away:"Iraq", group:"I", venue:"Los Angeles" },
  { id:41, date:"2026-06-22", gmtTime:"20:00", home:"Norway", away:"Senegal", group:"I", venue:"Dallas" },
  { id:42, date:"2026-06-22", gmtTime:"23:00", home:"Spain", away:"Saudi Arabia", group:"H", venue:"Atlanta" },
  { id:43, date:"2026-06-22", gmtTime:"02:00", home:"Uruguay", away:"Cape Verde", group:"H", venue:"Miami", nextDay:true },
  // Jun 23
  { id:44, date:"2026-06-23", gmtTime:"17:00", home:"Argentina", away:"Austria", group:"J", venue:"Dallas" },
  { id:45, date:"2026-06-23", gmtTime:"20:00", home:"Algeria", away:"Jordan", group:"J", venue:"Houston" },
  { id:46, date:"2026-06-23", gmtTime:"23:00", home:"Portugal", away:"Uzbekistan", group:"K", venue:"Kansas City" },
  { id:47, date:"2026-06-23", gmtTime:"02:00", home:"Colombia", away:"DR Congo", group:"K", venue:"Vancouver", nextDay:true },
  // Jun 24
  { id:48, date:"2026-06-24", gmtTime:"17:00", home:"England", away:"Ghana", group:"L", venue:"Atlanta" },
  { id:49, date:"2026-06-24", gmtTime:"20:00", home:"Croatia", away:"Panama", group:"L", venue:"Miami" },
  { id:50, date:"2026-06-24", gmtTime:"23:00", home:"Mexico", away:"Czechia", group:"A", venue:"Mexico City" },
  { id:51, date:"2026-06-24", gmtTime:"23:00", home:"South Korea", away:"South Africa", group:"A", venue:"Guadalajara" },
  // Jun 25
  { id:52, date:"2026-06-25", gmtTime:"17:00", home:"Qatar", away:"Canada", group:"B", venue:"Toronto" },
  { id:53, date:"2026-06-25", gmtTime:"17:00", home:"Bosnia-Herzegovina", away:"Switzerland", group:"B", venue:"Boston" },
  { id:54, date:"2026-06-25", gmtTime:"20:00", home:"Brazil", away:"Scotland", group:"C", venue:"New York/NJ" },
  { id:55, date:"2026-06-25", gmtTime:"20:00", home:"Morocco", away:"Haiti", group:"C", venue:"Philadelphia" },
  // Jun 26
  { id:56, date:"2026-06-26", gmtTime:"17:00", home:"United States", away:"Türkiye", group:"D", venue:"Los Angeles" },
  { id:57, date:"2026-06-26", gmtTime:"17:00", home:"Australia", away:"Paraguay", group:"D", venue:"San Francisco" },
  { id:58, date:"2026-06-26", gmtTime:"20:00", home:"Belgium", away:"New Zealand", group:"G", venue:"Seattle" },
  { id:59, date:"2026-06-26", gmtTime:"20:00", home:"Egypt", away:"Iran", group:"G", venue:"Los Angeles" },
  // Jun 27
  { id:60, date:"2026-06-27", gmtTime:"17:00", home:"Germany", away:"Ecuador", group:"E", venue:"Houston" },
  { id:61, date:"2026-06-27", gmtTime:"17:00", home:"Ivory Coast", away:"Curaçao", group:"E", venue:"Toronto" },
  { id:62, date:"2026-06-27", gmtTime:"20:00", home:"Netherlands", away:"Tunisia", group:"F", venue:"Dallas" },
  { id:63, date:"2026-06-27", gmtTime:"20:00", home:"Sweden", away:"Japan", group:"F", venue:"Guadalajara" },
  { id:64, date:"2026-06-27", gmtTime:"23:00", home:"Spain", away:"Uruguay", group:"H", venue:"Miami" },
  { id:65, date:"2026-06-27", gmtTime:"23:00", home:"Cape Verde", away:"Saudi Arabia", group:"H", venue:"Atlanta" },
  { id:66, date:"2026-06-27", gmtTime:"02:00", home:"France", away:"Norway", group:"I", venue:"Boston", nextDay:true },
  { id:67, date:"2026-06-27", gmtTime:"02:00", home:"Senegal", away:"Iraq", group:"I", venue:"Kansas City", nextDay:true },
  { id:68, date:"2026-06-27", gmtTime:"23:00", home:"Argentina", away:"Jordan", group:"J", venue:"Dallas" },
  { id:69, date:"2026-06-27", gmtTime:"23:00", home:"Austria", away:"Algeria", group:"J", venue:"Houston" },
  { id:70, date:"2026-06-27", gmtTime:"02:00", home:"Portugal", away:"Colombia", group:"K", venue:"Vancouver", nextDay:true },
  { id:71, date:"2026-06-27", gmtTime:"02:00", home:"Uzbekistan", away:"DR Congo", group:"K", venue:"Los Angeles", nextDay:true },
  { id:72, date:"2026-06-27", gmtTime:"23:00", home:"England", away:"Panama", group:"L", venue:"New York/NJ" },
  { id:73, date:"2026-06-27", gmtTime:"23:00", home:"Croatia", away:"Ghana", group:"L", venue:"Miami" },
];

// Journey path for each group winner/runner-up through the knockout stages
const BRACKET_PATHS = {
  "Group A Winner": ["R32: vs 3rd C/E/F/H/I", "R16", "QF", "SF", "Final"],
  "Group A Runner-up": ["R32: vs Group B Runner-up", "R16", "QF", "SF", "Final"],
  "Group B Winner": ["R32: vs 3rd E/F/G/I/J", "R16", "QF", "SF", "Final"],
  "Group C Winner": ["R32: vs 3rd A/B/D/F/G", "R16", "QF", "SF", "Final"],
  "Group D Winner": ["R32: vs 3rd B/E/F/I/J", "R16", "QF", "SF", "Final"],
  "Group E Winner": ["R32: vs 3rd A/B/C/D/F", "R16", "QF", "SF", "Final"],
  "Group F Winner": ["R32: vs Group C Runner-up", "R16", "QF", "SF", "Final"],
  "Group G Winner": ["R32: vs 3rd A/E/H/I/J", "R16", "QF", "SF", "Final"],
  "Group H Winner": ["R32: vs Group J Runner-up", "R16", "QF", "SF", "Final"],
  "Group I Winner": ["R32: vs 3rd C/D/F/G/H", "R16", "QF", "SF", "Final"],
  "Group J Winner": ["R32: vs Group H Runner-up", "R16", "QF", "SF", "Final"],
  "Group K Winner": ["R32: vs 3rd D/E/I/J/L", "R16", "QF", "SF", "Final"],
  "Group L Winner": ["R32: vs 3rd E/H/I/J/K", "R16", "QF", "SF", "Final"],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function isToday(dateStr) {
  return dateStr === getToday();
}

function isPast(dateStr, gmtTime) {
  const now = new Date();
  const matchDt = new Date(`${dateStr}T${gmtTime}:00Z`);
  return now > new Date(matchDt.getTime() + 2 * 60 * 60 * 1000);
}

function isLive(dateStr, gmtTime) {
  const now = new Date();
  const matchDt = new Date(`${dateStr}T${gmtTime}:00Z`);
  const end = new Date(matchDt.getTime() + 2 * 60 * 60 * 1000);
  return now >= matchDt && now <= end;
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function MatchCard({ match, compact = false }) {
  const live = isLive(match.date, match.gmtTime);
  const past = isPast(match.date, match.gmtTime);
  const today = isToday(match.date);

  return (
    <div style={{
      background: live ? "rgba(220,38,38,0.12)" : today ? "rgba(234,179,8,0.08)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${live ? "#dc2626" : today ? "#ca8a04" : "rgba(255,255,255,0.1)"}`,
      borderRadius: 10,
      padding: compact ? "10px 14px" : "14px 18px",
      marginBottom: 8,
      position: "relative",
      transition: "all 0.2s",
    }}>
      {live && (
        <span style={{
          position: "absolute", top: 8, right: 10,
          background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "2px 7px", borderRadius: 20, letterSpacing: 1,
          animation: "pulse 1.5s infinite",
        }}>● LIVE</span>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          <span style={{ fontSize: compact ? 18 : 22 }}>{FLAGS[match.home] || "⚽"}</span>
          <span style={{ color: "#f1f5f9", fontSize: compact ? 12 : 14, fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif" }}>
            {match.home}
          </span>
        </div>
        <div style={{ textAlign: "center", minWidth: 52 }}>
          <div style={{ color: past ? "#94a3b8" : "#f59e0b", fontWeight: 700, fontSize: compact ? 13 : 15, fontFamily: "monospace" }}>
            {match.gmtTime}
          </div>
          <div style={{ color: "#64748b", fontSize: 9, letterSpacing: 0.5 }}>GMT</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
          <span style={{ color: "#f1f5f9", fontSize: compact ? 12 : 14, fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif", textAlign: "right" }}>
            {match.away}
          </span>
          <span style={{ fontSize: compact ? 18 : 22 }}>{FLAGS[match.away] || "⚽"}</span>
        </div>
      </div>
      {!compact && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ color: "#475569", fontSize: 10 }}>Group {match.group}</span>
          <span style={{ color: "#475569", fontSize: 10 }}>📍 {match.venue}</span>
        </div>
      )}
    </div>
  );
}

// ─── VIEWS ───────────────────────────────────────────────────────────────────

function TodayView() {
  const today = getToday();
  const todayMatches = FIXTURES.filter(m => m.date === today);
  const upcoming = FIXTURES.filter(m => m.date > today).slice(0, 8);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          Today · {formatDate(today)}
        </h2>
        {todayMatches.length === 0 ? (
          <div style={{ color: "#475569", padding: "20px 0", fontSize: 14 }}>No matches today. Check upcoming below ↓</div>
        ) : (
          todayMatches.map(m => <MatchCard key={m.id} match={m} />)
        )}
      </div>
      {todayMatches.length === 0 && (
        <div>
          <h3 style={{ color: "#94a3b8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Coming Up
          </h3>
          {upcoming.map(m => (
            <div key={m.id}>
              <div style={{ color: "#64748b", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, marginTop: 12 }}>
                {formatDate(m.date)}
              </div>
              <MatchCard match={m} compact />
            </div>
          ))}
        </div>
      )}
      {todayMatches.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: "#94a3b8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Next Up
          </h3>
          {upcoming.slice(0, 4).map(m => (
            <div key={m.id}>
              <div style={{ color: "#64748b", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, marginTop: 10 }}>
                {formatDate(m.date)}
              </div>
              <MatchCard match={m} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleView() {
  const [filterGroup, setFilterGroup] = useState("ALL");
  const grouped = {};
  FIXTURES.filter(m => filterGroup === "ALL" || m.group === filterGroup).forEach(m => {
    if (!grouped[m.date]) grouped[m.date] = [];
    grouped[m.date].push(m);
  });

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {["ALL", ...Object.keys(GROUPS)].map(g => (
          <button key={g} onClick={() => setFilterGroup(g)} style={{
            background: filterGroup === g ? "#f59e0b" : "rgba(255,255,255,0.06)",
            color: filterGroup === g ? "#0f172a" : "#94a3b8",
            border: "none", borderRadius: 6, padding: "5px 12px",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
          }}>
            {g === "ALL" ? "All" : `Grp ${g}`}
          </button>
        ))}
      </div>
      {Object.keys(grouped).sort().map(date => (
        <div key={date} style={{ marginBottom: 20 }}>
          <div style={{
            color: isToday(date) ? "#f59e0b" : "#64748b",
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            fontWeight: 700, marginBottom: 8,
            fontFamily: "'Barlow Condensed', sans-serif",
            borderLeft: `3px solid ${isToday(date) ? "#f59e0b" : "#1e293b"}`,
            paddingLeft: 8,
          }}>
            {isToday(date) ? "▶ TODAY — " : ""}{formatDate(date)}
          </div>
          {grouped[date].map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      ))}
    </div>
  );
}

function GroupsView() {
  const [selected, setSelected] = useState("A");

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {Object.keys(GROUPS).map(g => (
          <button key={g} onClick={() => setSelected(g)} style={{
            background: selected === g ? "#f59e0b" : "rgba(255,255,255,0.06)",
            color: selected === g ? "#0f172a" : "#94a3b8",
            border: "none", borderRadius: 8, padding: "6px 14px",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
          }}>Group {g}</button>
        ))}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "16px 18px", marginBottom: 16,
      }}>
        <h3 style={{ color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, letterSpacing: 2, marginBottom: 14 }}>
          GROUP {selected} — STANDINGS
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto auto auto", gap: "6px 10px", alignItems: "center" }}>
          {["#", "Team", "P", "W", "D", "L", "Pts"].map(h => (
            <div key={h} style={{ color: "#475569", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
          ))}
          {GROUPS[selected].teams.map((team, i) => (
            <>
              <div style={{ color: i < 2 ? "#f59e0b" : "#475569", fontWeight: 700, fontSize: 13 }}>{i + 1}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 18 }}>{FLAGS[team]}</span>
                <span style={{ color: "#f1f5f9", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>{team}</span>
                {i < 2 && <span style={{ fontSize: 9, color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "1px 5px", borderRadius: 4 }}>ADV</span>}
              </div>
              {["0", "0", "0", "0", "0"].map((v, j) => (
                <div key={j} style={{ color: "#64748b", fontSize: 12, textAlign: "center" }}>{v}</div>
              ))}
            </>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#334155", marginTop: 10 }}>
          * Standings update live as tournament progresses · Top 2 advance · Best 8 third-placed teams also advance
        </div>
      </div>

      <h3 style={{ color: "#94a3b8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        Group {selected} Fixtures
      </h3>
      {FIXTURES.filter(m => m.group === selected).map(m => <MatchCard key={m.id} match={m} />)}
    </div>
  );
}

function JourneyView() {
  const [selectedTeam, setSelectedTeam] = useState("England");
  const allTeams = Object.values(GROUPS).flatMap(g => g.teams).sort();

  const teamGroup = Object.entries(GROUPS).find(([, g]) => g.teams.includes(selectedTeam))?.[0];
  const groupTeams = teamGroup ? GROUPS[teamGroup].teams : [];
  const teamFixtures = FIXTURES.filter(m => m.home === selectedTeam || m.away === selectedTeam);

  const stages = [
    { label: "Group Stage", icon: "⚽", desc: `Play 3 group matches in Group ${teamGroup}. Top 2 qualify + 8 best 3rd-placed.` },
    { label: "Round of 32", icon: "🔵", desc: `Group ${teamGroup} winner faces a 3rd-placed team. Runner-up faces another group's runner-up.` },
    { label: "Round of 16", icon: "🟡", desc: "16 survivors compete. One match, no second chances." },
    { label: "Quarter-finals", icon: "🟠", desc: "8 teams remain. Elite football from here on." },
    { label: "Semi-finals", icon: "🔴", desc: "Final four. Every match a legacy moment." },
    { label: "🏆 FINAL", icon: "🏆", desc: "New York/NJ · July 19, 2026 · 19:00 GMT" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ color: "#64748b", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          Select Team
        </label>
        <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)} style={{
          background: "#1e293b", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "8px 12px", fontSize: 14, width: "100%", outline: "none",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}>
          {allTeams.map(t => (
            <option key={t} value={t}>{FLAGS[t]} {t}</option>
          ))}
        </select>
      </div>

      <div style={{
        background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)",
        borderRadius: 12, padding: "14px 18px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <span style={{ fontSize: 42 }}>{FLAGS[selectedTeam]}</span>
        <div>
          <div style={{ color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>
            {selectedTeam}
          </div>
          <div style={{ color: "#64748b", fontSize: 12 }}>Group {teamGroup} · {groupTeams.join(", ")}</div>
        </div>
      </div>

      <h3 style={{ color: "#94a3b8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
        Path to the Final
      </h3>

      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{
          position: "absolute", left: 9, top: 0, bottom: 0,
          width: 2, background: "linear-gradient(to bottom, #f59e0b, #dc2626)",
          borderRadius: 1,
        }} />
        {stages.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
            <div style={{
              position: "absolute", left: 3, width: 14, height: 14,
              background: i === 5 ? "#f59e0b" : "#1e293b",
              border: `2px solid ${i === 5 ? "#f59e0b" : i < 2 ? "#475569" : "#334155"}`,
              borderRadius: "50%",
              marginTop: 3,
            }} />
            <div style={{
              background: i === 5 ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${i === 5 ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 10, padding: "10px 14px", flex: 1,
            }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: i === 5 ? 18 : 15, fontWeight: 700, color: i === 5 ? "#f59e0b" : "#e2e8f0", letterSpacing: 1 }}>
                {s.label}
              </div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 3 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ color: "#94a3b8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", margin: "20px 0 12px" }}>
        {selectedTeam} Fixtures
      </h3>
      {teamFixtures.map(m => <MatchCard key={m.id} match={m} />)}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function WorldCup2026() {
  const [tab, setTab] = useState("today");

  const tabs = [
    { id: "today", label: "Today", icon: "📅" },
    { id: "schedule", label: "Schedule", icon: "📋" },
    { id: "groups", label: "Groups", icon: "🏟" },
    { id: "journey", label: "Journey", icon: "🗺" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      backgroundImage: "radial-gradient(ellipse at top, #0d1b35 0%, #0a0f1e 60%)",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        select option { background: #1e293b; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b35 0%, #162040 100%)",
        borderBottom: "1px solid rgba(245,158,11,0.2)",
        padding: "16px 20px 12px",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 24, fontWeight: 900, letterSpacing: 2,
              color: "#f59e0b", lineHeight: 1, textTransform: "uppercase",
            }}>
              FIFA World Cup
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 13, letterSpacing: 4, color: "#475569", textTransform: "uppercase",
            }}>
              2026 · USA · Canada · Mexico
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 1, fontWeight: 600 }}>ALL TIMES</div>
            <div style={{ color: "#94a3b8", fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>GMT</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? "#f59e0b" : "rgba(255,255,255,0.05)",
              color: tab === t.id ? "#0a0f1e" : "#64748b",
              border: "none", borderRadius: 8, padding: "7px 4px",
              fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5,
              transition: "all 0.2s",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px", maxWidth: 520, margin: "0 auto" }}>
        {tab === "today" && <TodayView />}
        {tab === "schedule" && <ScheduleView />}
        {tab === "groups" && <GroupsView />}
        {tab === "journey" && <JourneyView />}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 16px", color: "#1e293b", fontSize: 11 }}>
        Jun 11 – Jul 19, 2026 · 48 Teams · 104 Matches · All times GMT
      </div>
    </div>
  );
}
