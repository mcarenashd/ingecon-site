import React, { useState, useEffect, useMemo } from 'react';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../constants';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg">
    <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex flex-col justify-end p-6">
      <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm mt-1">{project.description}</p>
        <p className="text-[#a4bf20] mt-2 font-semibold">{project.category}</p>
      </div>
    </div>
  </div>
);

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return 'N/A';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => (
    <tr className="hover:bg-gray-100">
        <td className="p-4 align-top">
            <p className="font-bold text-gray-800">{project.title}</p>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
        </td>
        <td className="p-4 align-top text-gray-700">{project.client}</td>
        <td className="p-4 align-top text-gray-700">{project.year}</td>
        <td className="p-4 align-top text-gray-700 font-medium whitespace-nowrap">{formatCurrency(project.constructionValue)}</td>
        <td className="p-4 align-top text-gray-700 font-medium whitespace-nowrap">{formatCurrency(project.supervisionValue)}</td>
        <td className="p-4 align-top text-gray-700">{project.category}</td>
    </tr>
);


const CATEGORIES = [
  "Todos",
  "Interventoría de obras Viales",
  "Estudios y Diseños",
  "Interventoría y Mantenimiento de Obras Civiles",
  "Interventoría en Estudios y Diseños",
  "Interventorías y gerencias...",
];

const SortArrow: React.FC<{ direction?: 'asc' | 'desc' }> = ({ direction }) => {
  return (
    <span className="inline-flex flex-col w-3 h-3 ml-1.5 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-1.5 w-1.5 ${direction === 'asc' ? 'text-gray-900' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clipRule="evenodd" /></svg>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-1.5 w-1.5 ${direction === 'desc' ? 'text-gray-900' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" clipRule="evenodd" /></svg>
    </span>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(6);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortColumn, setSortColumn] = useState<'year' | 'constructionValue' | 'supervisionValue' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects(PROJECTS_DATA);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSort = (column: 'year' | 'constructionValue' | 'supervisionValue') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredProjects = projects.filter(p => activeCategory === "Todos" ? true : p.category === activeCategory);

  const sortedProjects = useMemo(() => {
    if (!sortColumn) return filteredProjects;

    const sorted = [...filteredProjects].sort((a, b) => {
      const aVal = a[sortColumn] ?? 0;
      const bVal = b[sortColumn] ?? 0;
      
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });

    if (sortDirection === 'desc') {
      return sorted.reverse();
    }
    return sorted;
  }, [filteredProjects, sortColumn, sortDirection]);

  const visibleProjects = sortedProjects.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + (view === 'grid' ? 6 : 10));
  };
  
  const getSortTooltip = (column: 'year' | 'constructionValue' | 'supervisionValue', label: string) => {
    if (sortColumn === column) {
      return `Ordenar por ${label} (${sortDirection === 'asc' ? 'descendente' : 'ascendente'})`;
    }
    return `Ordenar por ${label}`;
  };

  const ViewToggle = () => (
    <div className="flex items-center space-x-2">
      <button onClick={() => setView('grid')} title="Cambiar a vista de cuadrícula" className={`p-2 rounded-md ${view === 'grid' ? 'bg-[#809419] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
      </button>
      <button onClick={() => setView('list')} title="Cambiar a vista de lista" className={`p-2 rounded-md ${view === 'list' ? 'bg-[#809419] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
      </button>
    </div>
  );

  return (
    <section id="proyectos" className="py-20 bg-gray-50 pt-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Proyectos Destacados</h2>
              <div className="w-24 h-1 bg-[#7cb342] mt-4"></div>
            </div>
            <ViewToggle />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(category => (
                <button 
                    key={category}
                    onClick={() => { setActiveCategory(category); setVisibleCount(view === 'grid' ? 6 : 10); }}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeCategory === category ? 'bg-[#809419] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {category}
                </button>
            ))}
        </div>
        {loading ? (
            <div className="text-center text-gray-600">Cargando proyectos...</div>
        ) : (
            <>
                {view === 'grid' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                      <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                              <tr>
                                  <th scope="col" className="p-4 w-1/3">Proyecto</th>
                                  <th scope="col" className="p-4">Cliente</th>
                                  <th scope="col" className="p-4 cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('year')} title={getSortTooltip('year', 'Año')}>
                                    <div className="flex items-center">
                                      Año
                                      <SortArrow direction={sortColumn === 'year' ? sortDirection : undefined} />
                                    </div>
                                  </th>
                                  <th scope="col" className="p-4 cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('constructionValue')} title={getSortTooltip('constructionValue', 'Valor Obra')}>
                                    <div className="flex items-center">
                                      Valor Obra
                                      <SortArrow direction={sortColumn === 'constructionValue' ? sortDirection : undefined} />
                                    </div>
                                  </th>
                                  <th scope="col" className="p-4 cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('supervisionValue')} title={getSortTooltip('supervisionValue', 'Valor Interventoría')}>
                                    <div className="flex items-center">
                                      Valor Interventoría
                                      <SortArrow direction={sortColumn === 'supervisionValue' ? sortDirection : undefined} />
                                    </div>
                                  </th>
                                  <th scope="col" className="p-4">Categoría</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y">
                              {visibleProjects.map((project) => (
                                  <ProjectRow key={project.id} project={project} />
                              ))}
                          </tbody>
                      </table>
                  </div>
                )}
                {visibleCount < filteredProjects.length && (
                    <div className="text-center mt-12">
                        <button onClick={loadMore} className="bg-[#7cb342] hover:bg-[#689f38] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                            Cargar Más
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