import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-4">
          {t.notFound.eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {t.notFound.heading}
        </h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          {t.notFound.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-bold py-3.5 px-8 rounded-lg text-sm transition-colors duration-200 motion-reduce:transition-none shadow-sm hover:shadow"
          >
            {t.notFound.backHome}
          </Link>
          <Link
            to="/#servicios"
            className="inline-block bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3.5 px-8 rounded-lg text-sm border border-gray-200 hover:border-[#6a9a10] hover:text-[#6a9a10] transition-colors duration-200 motion-reduce:transition-none"
          >
            {t.notFound.exploreServices}
          </Link>
          <Link
            to="/#proyectos"
            className="inline-block bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3.5 px-8 rounded-lg text-sm border border-gray-200 hover:border-[#6a9a10] hover:text-[#6a9a10] transition-colors duration-200 motion-reduce:transition-none"
          >
            {t.notFound.exploreProjects}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
