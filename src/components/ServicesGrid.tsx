"use client";

import { Baby, Trophy, Palette, BookOpen, UserCheck } from "lucide-react";

export default function ServicesGrid() {
  const services = [
    {
      icon: <Baby size={28} />,
      title: "Creche-Escola",
      description: "Educação infantil em tempo integral para crianças. Nosso critério de seleção é pautado prioritariamente na pobreza e vulnerabilidade social, garantindo acolhimento a quem mais necessita.",
      colorClass: "bg-brand-green/10 text-brand-green hover:border-brand-green/30",
    },
    {
      icon: <UserCheck size={28} />,
      title: "Acompanhamento Continuado",
      description: "Nosso compromisso não termina na infância. Temos como diretriz acompanhar de perto a trajetória das crianças ao longo dos anos escolares, prestando apoio social até que completem 18 anos.",
      colorClass: "bg-brand-blue/10 text-brand-blue hover:border-brand-blue/30",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Reforço Escolar",
      description: "Aulas de apoio pedagógico ministradas no turno inverso ao escolar, focando na alfabetização, leitura, matemática e combate à defasagem educacional dos adolescentes.",
      colorClass: "bg-brand-gold/10 text-brand-gold hover:border-brand-gold/30",
    },
    {
      icon: <Trophy size={28} />,
      title: "Oficinas de Capoeira",
      description: "Aulas de capoeira gratuitas para crianças e adolescentes. Fomentamos a cultura afro-brasileira, a disciplina física, o respeito mútuo, a música e a socialização na comunidade.",
      colorClass: "bg-brand-green/15 text-brand-green hover:border-brand-green/40",
    },
    {
      icon: <Palette size={28} />,
      title: "Artes Visuais e Desenho",
      description: "Oficinas de desenho e expressão artística. Ajudamos a desenvolver a coordenação motora, o foco, a imaginação e a sensibilidade estética de cada jovem atendido.",
      colorClass: "bg-brand-blue/15 text-brand-blue hover:border-brand-blue/40",
    },
    {
      icon: <Baby size={28} />,
      title: "Teatro e Artes Circenses",
      description: "Aulas de teatro e circo para desinibição, trabalho em equipe e expressão corporal. Nossas crianças se apresentam em festivais locais e eventos comunitários com orgulho.",
      colorClass: "bg-brand-navy/10 text-brand-navy hover:border-brand-navy/30",
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest mb-3 block">
            O que fazemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
            Frentes de Atuação Sócio-Educativa
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed">
            Oferecemos apoio integral para transformar vidas. Todas as atividades e oficinas são totalmente gratuitas, abertas a pessoas de qualquer contexto social ou religioso, priorizando a dignidade humana.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl flex flex-col items-start border border-slate-200/50 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${service.colorClass.split(' ')[0]} ${service.colorClass.split(' ')[1]}`}>
                {service.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-brand-navy mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
