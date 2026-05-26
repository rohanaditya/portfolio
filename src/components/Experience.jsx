import React from 'react';

const Experience = ({ items }) => {
  return (
    <div className="flex-shrink-0 w-96 pr-6">
      <div className="space-y-4">
        {items.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded shadow-sm text-slate-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{exp.title}</h3>
              <span className="text-xs text-slate-800">{exp.year}</span>
            </div>
            <p className="text-xs text-slate-800 mb-2">{exp.company}</p>
            <p className="text-xs text-slate-800 mb-3">{exp.startDate} - {exp.endDate}</p>
            <ul className="text-xs space-y-1">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="text-slate-800 leading-tight">
                  • {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
