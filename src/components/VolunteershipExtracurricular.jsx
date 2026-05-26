import React from 'react';

const VolunteershipExtracurricular = ({ items }) => {
  return (
    <div className="flex-shrink-0 w-96 pr-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow-sm text-slate-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{item.title}</h3>
              <span className="text-xs text-slate-800">{item.year}</span>
            </div>
            <p className="text-xs text-slate-800 mb-2">{item.startDate} - {item.endDate}</p>
            <p className="text-xs text-slate-800">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteershipExtracurricular;
