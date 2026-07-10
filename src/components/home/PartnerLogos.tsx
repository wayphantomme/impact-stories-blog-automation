import React from 'react';

const partners = [
  {
    name: "UNICEF",
    logo: <span className="font-sans font-black tracking-tighter text-3xl lowercase">unicef</span>,
  },
  {
    name: "World Economic Forum",
    logo: (
      <div className="flex flex-col leading-[0.85] font-bold text-[0.65rem] tracking-[0.15em] uppercase border-l-[3px] border-current pl-3 py-0.5">
        <span>World</span>
        <span>Economic</span>
        <span>Forum</span>
      </div>
    )
  },
  {
    name: "United Nations",
    logo: (
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span className="font-serif text-xl tracking-wide">United Nations</span>
      </div>
    )
  },
  {
    name: "World Bank",
    logo: <span className="font-sans font-extrabold tracking-tighter text-2xl uppercase">World Bank Group</span>,
  },
  {
    name: "WHO",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-sans font-black tracking-tighter text-3xl">WHO</span>
      </div>
    )
  },
  {
    name: "Amnesty International",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L12 10M12 10C12 10 14 10 15 12C16 14 16 16 14 18C12 20 12 22 12 22C12 22 12 20 10 18C8 16 8 14 9 12C10 10 12 10 12 10Z"/>
        </svg>
        <span className="font-sans font-bold uppercase text-sm tracking-widest">AMNESTY</span>
      </div>
    )
  }
];

export function PartnerLogos() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
          Empowering insights alongside global initiatives
        </p>
      </div>
      
      {/* Marquee Container with CSS Mask for perfect fading regardless of background */}
      <div 
        className="relative flex overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-24 pr-24 hover:animation-paused">
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div 
              key={`${partner.name}-${i}`} 
              className="flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-500 ease-out min-w-max hover:scale-105 cursor-default"
            >
              <span className="sr-only">{partner.name}</span>
              {partner.logo}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .hover\\:animation-paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
