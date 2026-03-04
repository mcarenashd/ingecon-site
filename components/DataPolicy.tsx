import React from 'react';
import { useTranslation } from '../i18n';

const DataPolicy: React.FC = () => {
  const { t } = useTranslation();
  const dp = t.dataPolicy;

  return (
    <section id="politica-de-datos" className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{dp.title}</h2>
          <div className="w-24 h-1 bg-[#7cb342] mx-auto mt-4"></div>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s1Title}</h3>
          <p>{dp.s1Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s2Title}</h3>
          <p>
            {dp.s2Text1}
            <a href="mailto:info@ingecon.com.co" className="text-[#809419] hover:underline">{dp.s2Email}</a>.
          </p>
          <p>{dp.s2Text2}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s3Title}</h3>
          <p>{dp.s3Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s4Title}</h3>
          {dp.s4Definitions.map((def, i) => (
            <p key={i}><strong>{def.term}</strong> {def.definition}</p>
          ))}

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s5Title}</h3>
          {dp.s5Principles.map((p, i) => (
            <p key={i}><strong>{p.term}</strong> {p.definition}</p>
          ))}

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s6Title}</h3>
          <p>{dp.s6Text}</p>
          <p>{dp.s6Intro}</p>
          <ul className="list-disc list-inside space-y-2">
            {dp.s6Rights.map((right, i) => (
              <li key={i}>{right}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s7Title}</h3>
          <p>{dp.s7Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s8Title}</h3>
          <p><strong>{dp.s8Consultas.substring(0, dp.s8Consultas.indexOf('.') + 1)}</strong>{dp.s8Consultas.substring(dp.s8Consultas.indexOf('.') + 1)}</p>
          <p><strong>{dp.s8Reclamos.substring(0, dp.s8Reclamos.indexOf('.') + 1)}</strong>{dp.s8Reclamos.substring(dp.s8Reclamos.indexOf('.') + 1)}</p>
          <p><strong>{dp.s8Requisito.substring(0, dp.s8Requisito.indexOf('.') + 1)}</strong>{dp.s8Requisito.substring(dp.s8Requisito.indexOf('.') + 1)}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s9Title}</h3>
          <p>{dp.s9Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s10Title}</h3>
          <p>{dp.s10Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s11Title}</h3>
          <p>{dp.s11Text}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">{dp.s12Title}</h3>
          <p>{dp.s12Text}</p>
        </div>
      </div>
    </section>
  );
};

export default DataPolicy;
