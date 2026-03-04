import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';

// ──────────────────────────────────────────────
// Para conectar con tu Google Sheet:
// 1. Crea una hoja con columnas: activa | titulo | ubicacion | tipoContrato | experiencia | descripcion | requisitos | beneficios | emailContacto
// 2. En requisitos y beneficios separa cada ítem con | (pipe)
// 3. Publica la hoja: Archivo > Compartir > Publicar en la web > CSV
// 4. Pega la URL aquí abajo
// ──────────────────────────────────────────────
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsDWU9tIubUeHZauE3bhDnsvPnfSrM6wvZLqb_AFv_3GdJ6DLSD5JgTOieI7Lgtv0755jPCXnVytQ2/pub?gid=0&single=true&output=csv';

interface Vacancy {
  titulo: string;
  ubicacion: string;
  tipoContrato: string;
  experiencia: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  emailContacto: string;
}

function parseCSV(csv: string): Vacancy[] {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  // Remove header row
  const rows = lines.slice(1);
  const vacancies: Vacancy[] = [];

  for (const row of rows) {
    // Simple CSV parse handling quoted fields
    const cols: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current.trim());

    const [activa, titulo, ubicacion, tipoContrato, experiencia, descripcion, requisitos, beneficios, emailContacto] = cols;

    if (activa?.toUpperCase() !== 'TRUE') continue;
    if (!titulo) continue;

    vacancies.push({
      titulo,
      ubicacion: ubicacion || '',
      tipoContrato: tipoContrato || '',
      experiencia: experiencia || '',
      descripcion: descripcion || '',
      requisitos: requisitos ? requisitos.split('|').map(r => r.trim()).filter(Boolean) : [],
      beneficios: beneficios ? beneficios.split('|').map(b => b.trim()).filter(Boolean) : [],
      emailContacto: emailContacto || 'info@ingecon.com.co',
    });
  }

  return vacancies;
}

const BriefcaseIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073c0 1.078-.882 1.952-1.969 1.952H5.72c-1.087 0-1.969-.874-1.969-1.952V14.15M9 6.75V4.5c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v2.25M3.75 10.5h16.5c1.035 0 1.875.84 1.875 1.875v1.775H1.875V12.375c0-1.035.84-1.875 1.875-1.875z" />
  </svg>
);

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Badge: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
      <span className="font-medium text-gray-500">{label}:</span> {value}
    </span>
  );
};

const VacancyCard: React.FC<{ vacancy: Vacancy }> = ({ vacancy }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const subject = encodeURIComponent(`${t.careers.applySubject} ${vacancy.titulo}`);
  const mailtoUrl = `mailto:${vacancy.emailContacto}?subject=${subject}`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3">{vacancy.titulo}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge label={t.careers.locationLabel} value={vacancy.ubicacion} />
            <Badge label={t.careers.contractLabel} value={vacancy.tipoContrato} />
            <Badge label={t.careers.experienceLabel} value={vacancy.experiencia} />
          </div>
        </div>
        <div className="flex-shrink-0 text-gray-400 mt-1">
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* Expandable details */}
      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">
          {vacancy.descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed">{vacancy.descripcion}</p>
          )}

          {vacancy.requisitos.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{t.careers.requirementsTitle}</h4>
              <ul className="space-y-1.5">
                {vacancy.requisitos.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#6a9a10] mt-1 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.beneficios.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{t.careers.benefitsTitle}</h4>
              <ul className="space-y-1.5">
                {vacancy.beneficios.map((ben, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#6a9a10] mt-1 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                    {ben}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={mailtoUrl}
            className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-semibold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow"
          >
            {t.careers.apply}
          </a>
        </div>
      </div>
    </div>
  );
};

const Careers: React.FC = () => {
  const { t } = useTranslation();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      setLoading(false);
      return;
    }

    fetch(SHEET_CSV_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then(csv => {
        setVacancies(parseCSV(csv));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const sendCVSubject = encodeURIComponent(t.careers.sendCVSubject);
  const sendCVUrl = `mailto:info@ingecon.com.co?subject=${sendCVSubject}`;

  return (
    <section id="carreras" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.careers.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {t.careers.heading}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {t.careers.subheading}
          </p>
        </div>

        {/* Loading */}
        {loading && SHEET_CSV_URL && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#6a9a10] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-gray-500">{t.careers.errorLoading}</p>
          </div>
        )}

        {/* Vacancies grid */}
        {!loading && !error && vacancies.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {vacancies.map((vacancy, i) => (
              <VacancyCard key={i} vacancy={vacancy} />
            ))}
          </div>
        )}

        {/* No vacancies - send CV */}
        {!loading && !error && vacancies.length === 0 && (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6a9a10]/10 text-[#6a9a10] mb-6">
              <BriefcaseIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.careers.noVacanciesTitle}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-8">
              {t.careers.noVacanciesText}
            </p>
            <a
              href={sendCVUrl}
              className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-semibold py-3.5 px-8 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow"
            >
              {t.careers.sendCV}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Careers;
