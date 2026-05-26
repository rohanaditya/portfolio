const Header = ({ basics, activeYear }) => {
  const displayYear = activeYear ?? basics.currentYear;

  return (
    <header className="h-1/4 bg-white text-slate-800 flex">
      <div className="w-1/4 p-8 flex flex-col justify-center">
        <h1 className="text-xl font-black font-semibold mb-2">{basics.name}</h1>
        <p className="text-sm text-slate-800 font-semibold transition-all duration-300">
          {displayYear}
        </p>
      </div>

      <div className="w-3/4 p-8 flex flex-col justify-center overflow-y-auto">
        <p className="text-sm leading-relaxed text-slate-800">{basics.summary}</p>
        <div className="mt-4 flex gap-4 text-xs">
          <a href={`mailto:${basics.email}`} className="text-slate-800 hover:underline">{basics.email}</a>
          <a href={`tel:${basics.phone}`} className="text-slate-800 hover:underline">{basics.phone}</a>
          <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">LinkedIn</a>
          <a href={basics.github} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">GitHub</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
