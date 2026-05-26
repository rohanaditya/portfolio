import React from 'react';

const Skills = ({ items }) => {
  return (
    <div className="flex-shrink-0 w-96 pr-6">
      <div className="space-y-4">
        {items.map((skill) => (
          <div key={skill.id} className="bg-white p-4 rounded shadow-sm text-slate-800">
            <h3 className="font-bold text-sm mb-2">{skill.category}</h3>
            <p className="text-xs text-slate-800 leading-relaxed">{skill.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
