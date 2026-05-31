const Header = ({ basics, isDarkMode }) => {
  const textClass = isDarkMode ? 'text-slate-100' : 'text-slate-800';
  return (
    <header className={`h-1/4 flex ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="w-1/4 p-8 flex items-center justify-start">
        <h1 className={`text-3xl font-black ${textClass}`}>{basics.name}</h1>
      </div>

      <div className="w-3/4 p-8 flex flex-col justify-center overflow-y-auto">
        <p className={`text-sm leading-relaxed ${textClass}`}>{basics.summary}</p>
        <div className="mt-4 flex gap-4 text-xs">
          <a href={`mailto:${basics.email}`} className={`${textClass} hover:underline`}>{basics.email}</a>
          <a href={`tel:${basics.phone}`} className={`${textClass} hover:underline`}>{basics.phone}</a>
          <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className={`${textClass} hover:underline`}>LinkedIn</a>
          <a href={basics.github} target="_blank" rel="noopener noreferrer" className={`${textClass} hover:underline`}>GitHub</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
