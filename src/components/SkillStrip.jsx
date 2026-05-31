const SkillStrip = ({ skills, activeYear, isScrolling, isDarkMode }) => {
  const dm = isDarkMode;
  return (
    <div className={`h-[15%] px-6 py-4 overflow-hidden relative border-b ${dm ? 'border-slate-700' : 'border-slate-100'}`}>
      {/* Skills chips — hidden while scrolling */}
      <div
        className="h-full flex flex-col gap-2 overflow-hidden transition-opacity duration-300"
        style={{ opacity: isScrolling ? 0 : 1 }}
      >
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          {activeYear}
        </span>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className={`h-8 flex-shrink-0 rounded shadow-sm px-3 flex items-center text-xs font-semibold ${
                dm ? 'bg-slate-700 text-slate-100' : 'bg-[#F5F5F7] text-slate-800'
              }`}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Year overlay during scroll */}
      <div
        className="absolute inset-0 flex items-center px-6 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isScrolling ? 1 : 0 }}
      >
        <div className="text-6xl font-black text-slate-400 select-none">
          {activeYear}
        </div>
      </div>
    </div>
  );
};

export default SkillStrip;
