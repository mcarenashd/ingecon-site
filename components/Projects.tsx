import React, { useState, useEffect, useMemo } from 'react';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../constants';
import { useTranslation } from '../i18n';

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => (
  <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
    <td className="p-4 align-top">
      <p className="font-semibold text-gray-900 text-sm">{project.title}</p>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{project.description}</p>
    </td>
    <td className="p-4 align-top text-sm text-gray-600 whitespace-nowrap">{project.client}</td>
    <td className="p-4 align-top text-sm text-gray-600 whitespace-nowrap">{project.year}</td>
    <td className="p-4 align-top">
      <span className="inline-block text-xs font-medium text-[#6a9a10] bg-[#6a9a10]/10 px-2 py-1 rounded-md whitespace-nowrap">
        {project.category}
      </span>
    </td>
  </tr>
);

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortColumn, setSortColumn] = useState<'year' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const CATEGORIES = [
    { label: t.projects.catAll, value: 'Todos' },
    { label: t.projects.catViales, value: 'Interventoría de obras Viales' },
    { label: t.projects.catEstudios, value: 'Estudios y Diseños' },
    { label: t.projects.catCiviles, value: 'Interventoría y Mantenimiento de Obras Civiles' },
    { label: t.projects.catEstudiosInt, value: 'Interventoría en Estudios y Diseños' },
    { label: t.projects.catGerencias, value: 'Interventorías y gerencias...' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects(PROJECTS_DATA);
      setLoading(false);
    }, 600);
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'Todos' || p.category === activeCategory
  );

  const sortedProjects = useMemo(() => {
    if (!sortColumn) return filteredProjects;
    return [...filteredProjects].sort((a, b) => {
      const aVal = a[sortColumn] ?? 0;
      const bVal = b[sortColumn] ?? 0;
      const dir = sortDirection === 'asc' ? 1 : -1;
      return aVal < bVal ? -dir : aVal > bVal ? dir : 0;
    });
  }, [filteredProjects, sortColumn, sortDirection]);

  const visibleProjects = sortedProjects.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(10);
  };

  const handleSort = (col: 'year') => {
    if (sortColumn === col) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection('desc');
    }
  };

  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.projects.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.projects.heading}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat.value
                  ? 'bg-[#6a9a10] text-white border-[#6a9a10]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#6a9a10] hover:text-[#6a9a10]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#6a9a10] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-left bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/5">{t.projects.thProject}</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projects.thClient}</th>
                    <th
                      className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#6a9a10] select-none"
                      onClick={() => handleSort('year')}
                    >
                      <span className="flex items-center gap-1">
                        {t.projects.thYear}
                        {sortColumn === 'year' && (
                          <span className="text-[#6a9a10]">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projects.thCategory}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                  ))}
                </tbody>
              </table>
            </div>

            {visibleCount < filteredProjects.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + 10)}
                  className="px-8 py-3 rounded-lg border-2 border-[#6a9a10] text-[#6a9a10] font-semibold text-sm hover:bg-[#6a9a10] hover:text-white transition-all duration-200"
                >
                  {t.projects.loadMore} ({filteredProjects.length - visibleCount} {t.projects.remaining})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
