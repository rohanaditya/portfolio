import React from 'react';

const Education = ({ items }) => {
  return (
    <div className="flex-shrink-0 w-96 pr-6">
      <div className="space-y-4">
        {items.map((edu) => (
          <div key={edu.id} className="bg-white p-4 rounded shadow-sm text-slate-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{edu.degree} in {edu.field}</h3>
              <span className="text-xs text-slate-800">{edu.year}</span>
            </div>
            <p className="text-xs text-slate-800 mb-2">{edu.school}</p>
            <p className="text-xs text-slate-800 mb-2">{edu.startDate} - {edu.endDate}</p>
            <p className="text-xs text-slate-800">{edu.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
