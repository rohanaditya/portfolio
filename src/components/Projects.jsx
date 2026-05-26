import React from 'react';

const Projects = ({ items }) => {
  return (
    <div className="flex-shrink-0 w-96 pr-6">
      <div className="space-y-4">
        {items.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded shadow-sm text-slate-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{project.title}</h3>
              <span className="text-xs text-slate-800">{project.year}</span>
            </div>
            <p className="text-xs text-slate-800 mb-2">{project.startDate} - {project.endDate}</p>
            <p className="text-xs text-slate-800 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="text-xs bg-white text-slate-800 px-2 py-1 rounded shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
