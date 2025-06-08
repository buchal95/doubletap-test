'use client';

import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Star } from 'lucide-react';
import Image from 'next/image';

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  quote: string;
  image: string;
  stars?: number;
}> = ({ name, role, quote, image, stars = 5 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-brand-gray/10 transition-all duration-300 hover:shadow-lg">
      <div className="flex mb-4">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-brand-olive fill-brand-olive" />
        ))}
      </div>
      
      <p className="text-brand-gray/80 font-montserrat mb-6 italic">"{quote}"</p>
      
      <div className="flex items-center">
        <Image 
          src={image} 
          alt={name} 
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-anton text-brand-gray">{name}</p>
          <p className="text-brand-gray/60 text-sm font-montserrat">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Jana Veselá",
      role: "Marketingová manažerka",
      quote: "Kurz předčil moje očekávání. Za pouhé 4 dny jsem se naučila vše potřebné pro tvorbu profesionálních videí. Dosahy na našich sociálních sítích vzrostly o 120 % během prvního měsíce.",
      image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=150",
      stars: 5
    },
    {
      name: "Tomáš Svoboda",
      role: "Majitel e-shopu",
      quote: "Investice do kurzu se mi vrátila již během prvních dvou týdnů. Naše produktová videa mají nyní 3x vyšší konverzní poměr a zákazníci je mnohem lépe přijímají.",
      image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=150",
      stars: 5
    },
    {
      name: "Martina Dvořáková",
      role: "Content creator",
      quote: "Po absolvování kurzu jsem získala sebejistotu v tvorbě videí. Naučila jsem se efektivně stříhat a moje videa nyní vypadají profesionálně i bez drahého vybavení.",
      image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150",
      stars: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Příběhy našich absolventů" 
          subtitle="Poslechněte si, jak kurz pomohl našim absolventům dosáhnout konkrétních výsledků"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        <div className="bg-brand-beige rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl font-anton mb-4 text-brand-gray">Video recenze absolventů</h3>
          
          <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto mb-6">
            <div className="bg-white rounded-lg w-full h-64 md:h-[400px] flex items-center justify-center border border-brand-gray/10">
              <p className="text-brand-gray/60 font-montserrat">Video testimonial embedded here</p>
            </div>
          </div>
          
          <p className="text-brand-gray/80 font-montserrat max-w-2xl mx-auto">
            "Kurz byl perfektní. Jsem opravdu vděčná za všechny rady a triky, které jsem se naučila.
            Dnes pracuji jako freelance video tvůrce a živím se tím, co mě baví."
          </p>
          <p className="font-anton mt-2 text-brand-gray">Lucie Pokorná, freelancer</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;