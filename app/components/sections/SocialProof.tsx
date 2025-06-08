import React from 'react';
import Image from 'next/image';

const SocialProof: React.FC = () => {
  return (
    <section className="py-16 bg-brand-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-2xl font-anton text-brand-gray">Důvěřují nám</h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 opacity-80">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" alt="Microsoft" width={120} height={40} className="h-8 md:h-10 w-auto transform transition-all duration-300 hover:scale-110" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" alt="Google" width={120} height={40} className="h-8 md:h-10 w-auto transform transition-all duration-300 hover:scale-110" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Czech_Television_logo.svg/512px-Czech_Television_logo.svg.png" alt="Česká televize" width={120} height={48} className="h-10 md:h-12 w-auto transform transition-all duration-300 hover:scale-110" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Seznam.cz_logo.svg/512px-Seznam.cz_logo.svg.png" alt="Seznam.cz" width={120} height={36} className="h-7 md:h-9 w-auto transform transition-all duration-300 hover:scale-110" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/MALL.svg/512px-MALL.svg.png" alt="MALL" width={120} height={32} className="h-6 md:h-8 w-auto transform transition-all duration-300 hover:scale-110" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">1 000+</div>
            <div className="text-brand-gray/80 font-montserrat">absolventů</div>
          </div>
          
          <div className="p-6 bg-white rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">+80%</div>
            <div className="text-brand-gray/80 font-montserrat">vyšší engagement</div>
          </div>
          
          <div className="p-6 bg-white rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">4.9/5</div>
            <div className="text-brand-gray/80 font-montserrat">hodnocení kurzu</div>
          </div>
          
          <div className="p-6 bg-white rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">92%</div>
            <div className="text-brand-gray/80 font-montserrat">zvýšení konverzí</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;