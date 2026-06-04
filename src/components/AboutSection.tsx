"use client";

import { Award, Users, BookOpen, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Stats Cards Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg hover:border-brand-green/25 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 bg-brand-green/10 text-brand-green">
              <Users size={24} />
            </div>
            <h3 className="text-3xl font-extrabold text-brand-navy mb-1.5 leading-none">170+</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Crianças e Adolescentes Atendidos</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/25 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 bg-brand-blue/10 text-brand-blue">
              <Heart size={24} />
            </div>
            <h3 className="text-3xl font-extrabold text-brand-navy mb-1.5 leading-none">135</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Famílias Acolhidas na Comunidade</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg hover:border-brand-gold/25 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 bg-brand-gold/10 text-brand-gold">
              <BookOpen size={24} />
            </div>
            <h3 className="text-3xl font-extrabold text-brand-navy mb-1.5 leading-none">2012</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Ano de Fundação do Projeto</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg hover:border-brand-navy/20 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 bg-brand-navy/10 text-brand-navy">
              <Award size={24} />
            </div>
            <h3 className="text-3xl font-extrabold text-brand-navy mb-1.5 leading-none">Gratuito</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Atividades 100% Filantrópicas</p>
          </div>
        </div>

        {/* Right Side: Detailed Narrative */}
        <div className="lg:col-span-6 flex flex-col">
          <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">
            Quem Somos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-6 leading-tight">
            Breve História do Nosso Sonho
          </h2>
          
          <div className="flex flex-col gap-5 text-slate-600 text-[15px] sm:text-base leading-relaxed">
            <p>
              O projeto nasceu no coração de <strong className="text-slate-800">Massaranduba</strong>, um bairro da península de Itapagipe em Salvador-BA (região iluminada pelos Santuários do Senhor do Bonfim e de Santa Dulce dos Pobres). Nesse contexto, as nossas crianças historicamente sofreram com a vulnerabilidade social e severas fragilidades na educação básica.
            </p>
            <p>
              Em 2012, confrontado com a incapacidade de ler e escrever das crianças locais, o padre missionário <strong className="text-slate-800">Padre Luca Niccheri</strong> se indagou: <em className="text-brand-navy font-medium not-italic bg-brand-blue/5 px-1 py-0.5 rounded">"Nesta situação, como posso ensinar os mandamentos se as crianças não sabem ler? Como posso ajudar essas pessoas a superarem a baixa autoestima e desenvolverem suas inúmeras potencialidades?"</em>
            </p>
            <p>
              Foi assim que, a partir da Paróquia Nossa Senhora da Piedade, nasceu a nossa associação. Um projeto sócio-educativo integral que abrange desde a creche-escola até oficinas especializadas de reforço, capoeira, desenho, circo e teatro, acompanhando nossos jovens até completarem 18 anos de idade.
            </p>
            <p>
              A consolidação desse sonho contou com a valiosa direção do <strong className="text-slate-800">Padre Paolo Sbolci</strong> e, atualmente, é conduzida com dedicação sob a coordenação do <strong className="text-slate-800">Padre Marco Pagliucci</strong>. O Projeto Beija-Flor é um pedaço da história de uma comunidade de guerreiras e guerreiros que decidiram continuar a sonhar juntos sob a luz de Deus, convictos de que <strong className="text-brand-green">"a beleza salvará o mundo"</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
