import React from 'react';
import { useTranslation } from '../i18n';

const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '25+', label: t.about.statYears },
    { value: '80+', label: t.about.statContracts },
    { value: '10+', label: t.about.statClients },
    { value: '2001', label: t.about.statFounded },
  ];

  return (
    <>
      {/* Stats bar */}
      <div className="bg-[#6a9a10]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm md:text-base text-white mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/about-400.avif 400w, /images/about-640.avif 640w, /images/about-960.avif 960w"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet="/images/about-400.webp 400w, /images/about-640.webp 640w, /images/about-960.webp 960w"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <img
                  src="/images/about-640.webp"
                  alt={t.about.imgAlt}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={640}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </picture>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-[#6a9a10]/10 rounded-xl -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
                  {t.about.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {t.about.heading}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">
                {t.about.descriptionBefore}
                <strong className="text-gray-800">{t.about.descriptionBold}</strong>
                {t.about.descriptionAfter}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-4 border-[#6a9a10] pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">{t.about.missionTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t.about.missionText}
                  </p>
                </div>
                <div className="border-l-4 border-[#6a9a10] pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">{t.about.visionTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t.about.visionText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
