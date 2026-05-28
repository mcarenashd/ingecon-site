import React, { useState, useMemo } from 'react';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../constants';
import { useTranslation } from '../i18n';

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => (
  <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
    <td className="p-4 align-top">
      <p className="font-semibold text-gray-900 text-sm">{project.title}</p>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{project.description}</p>
    </td>
    <td className="p-4 align-top text-sm text-gray-600 leading-snug">{project.client}</td>
    <td className="p-4 align-top text-sm text-gray-600 whitespace-nowrap">{project.year}</td>
    <td className="p-4 align-top">
      <span className="inline-block text-xs font-medium text-[#6a9a10] bg-[#6a9a10]/10 px-2 py-1 rounded-md">
        {project.category}
      </span>
    </td>
  </tr>
);

const ProjectCard: React.FC<{ project: Project; t: ReturnType<typeof useTranslation>['t'] }> = ({ project, t }) => (
  <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-start justify-between gap-3 mb-2">
      <h3 className="font-semibold text-gray-900 text-sm leading-snug flex-1">{project.title}</h3>
      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{project.year}</span>
    </div>
    <p className="text-xs text-gray-500 leading-relaxed mb-3">{project.description}</p>
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-gray-500">
        <span className="font-medium text-gray-400">{t.projects.thClient}:</span> {project.client}
      </span>
    </div>
    <span className="inline-block mt-3 text-xs font-medium text-[#6a9a10] bg-[#6a9a10]/10 px-2 py-1 rounded-md">
      {project.category}
    </span>
  </article>
);

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortColumn, setSortColumn] = useState<'year' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const CATEGORIES = [
    { label: t.projects.catAll, value: 'Todos' },
    { label: t.projects.catCiviles, value: 'Interventoría a obras civiles' },
    { label: t.projects.catEstudios, value: 'Estudios y Diseños' },
    { label: t.projects.catEstudiosInt, value: 'Interventoría en Estudios y Diseños' },
  ];

  const filteredProjects = PROJECTS_DATA.filter(
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.projects.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.projects.heading}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label={t.projects.heading}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
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
        <p className="text-xs text-gray-500 mb-8 leading-relaxed">
          {t.projects.catCivilesIncludes}
        </p>

        {/* Mobile: cards */}
        <div className="md:hidden grid gap-4">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} t={t} />
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-left bg-white table-fixed">
            <colgroup>
              <col className="w-2/5" />
              <col className="w-[30%]" />
              <col className="w-[80px]" />
              <col className="w-[25%]" />
            </colgroup>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th scope="col" className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projects.thProject}</th>
                <th scope="col" className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projects.thClient}</th>
                <th
                  scope="col"
                  aria-sort={sortColumn === 'year' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#6a9a10] select-none"
                  onClick={() => handleSort('year')}
                >
                  <span className="flex items-center gap-1">
                    {t.projects.thYear}
                    {sortColumn === 'year' && (
                      <span aria-hidden="true" className="text-[#6a9a10]">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
                <th scope="col" className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projects.thCategory}</th>
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
      </div>
    </section>
  );
};

export default Projects;
