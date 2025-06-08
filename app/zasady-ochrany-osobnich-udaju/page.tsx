import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-gray text-white py-8">
        <div className="container mx-auto px-4">
          <Link 
            href="/"
            className="inline-flex items-center text-brand-beige hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na hlavní stránku
          </Link>
          
          <div className="flex items-center">
            <Shield className="w-8 h-8 mr-4 text-brand-olive" />
            <h1 className="text-3xl md:text-4xl font-anton">Zásady ochrany osobních údajů</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-brand-beige rounded-xl p-6 mb-8">
              <p className="text-lg font-montserrat font-semibold text-brand-gray">
                Účinné od: 8. dubna 2025
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">1. Identifikace správce osobních údajů</h2>
              <div className="bg-brand-beige rounded-xl p-6">
                <div className="space-y-2 font-montserrat">
                  <p><strong>Název firmy:</strong> Marek Madenský</p>
                  <p><strong>Sídlo:</strong> Karla Hynka Máchy 1706, Frýdek-Místek, 738 01</p>
                  <p><strong>IČ:</strong> 06885560</p>
                  <p><strong>DIČ:</strong> není plátcem DPH</p>
                  <p><strong>E-mail:</strong> <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline">marek.madensky@gmail.com</a></p>
                  <p><strong>Telefon:</strong> <a href="tel:+420737775956" className="text-brand-olive hover:underline">+420 737 775 956</a></p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">2. Úvod</h2>
              <div className="font-montserrat text-brand-gray/80">
                <p>Vaše soukromí je pro nás důležité. Tyto zásady vysvětlují, jakým způsobem zpracováváme osobní údaje návštěvníků našich webových stránek v souladu s Nařízením EU 2016/679 (GDPR).</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">3. Jaké údaje shromažďujeme</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Můžeme zpracovávat následující kategorie údajů:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Kontaktní údaje:</strong> jméno, e-mail, telefon, pokud je dobrovolně vyplníte ve formuláři.</li>
                  <li><strong>Technické a analytické údaje:</strong> IP adresa, typ zařízení, prohlížeč, jazyk, odkud jste přišli, na co klikáte apod.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">4. Jak a proč údaje zpracováváme</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Údaje zpracováváme z těchto důvodů:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>odpovědi na vaše dotazy nebo poptávky,</li>
                  <li>analýza návštěvnosti a chování na webu,</li>
                  <li>cílená reklama a remarketing.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">5. Nástroje třetích stran, které využíváme</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Na webu používáme nástroje, které mohou shromažďovat cookies a další údaje:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Google Analytics 4</strong> - Slouží k měření a analýze chování uživatelů na webu. <a href="https://policies.google.com/privacy" target=\"_blank" rel="noopener noreferrer\" className="text-brand-olive hover:underline">Zásady Google</a></li>
                  <li><strong>Google Ads</strong> - Používáme pro cílenou reklamu a měření kampaní. <a href="https://policies.google.com/technologies/ads" target=\"_blank" rel="noopener noreferrer\" className="text-brand-olive hover:underline">Podmínky reklam Google</a></li>
                  <li><strong>Google Tag Manager</strong> - Spravuje měřicí kódy bez zásahu do kódu webu. Sám údaje neukládá. <a href="https://policies.google.com/privacy" target=\"_blank" rel="noopener noreferrer\" className="text-brand-olive hover:underline">Podmínky GTM</a></li>
                  <li><strong>Sklik (Seznam.cz)</strong> - Nástroj pro zobrazování a měření českých reklamních kampaní. <a href="https://www.seznam.cz/ochranaudaju/" target=\"_blank" rel="noopener noreferrer\" className="text-brand-olive hover:underline">Zásady Sklik</a></li>
                  <li><strong>Meta (Facebook a Instagram)</strong> - Využíváme pixel Meta pro měření účinnosti reklam. <a href="https://www.facebook.com/privacy/policy/" target=\"_blank" rel="noopener noreferrer\" className="text-brand-olive hover:underline">Zásady Meta</a></li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">6. Právní základ zpracování</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Zpracování probíhá na základě:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Vašeho souhlasu</strong> – například pro marketingové cookies,</li>
                  <li><strong>plnění smlouvy</strong> – když nám napíšete poptávku,</li>
                  <li><strong>oprávněného zájmu</strong> – například bezpečnost, základní analytika.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">7. Kdo má k údajům přístup</h2>
              <div className="font-montserrat text-brand-gray/80">
                <p>Vaše údaje nezpřístupňujeme třetím stranám bez vašeho souhlasu, kromě poskytovatelů výše uvedených nástrojů a případů, kdy to vyžaduje zákon.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">8. Přenos do třetích zemí</h2>
              <div className="font-montserrat text-brand-gray/80">
                <p>Některé nástroje (např. Google, Meta) mohou přenášet údaje mimo EU. Děje se tak na základě tzv. standardních smluvních doložek nebo jiných záruk dle GDPR.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">9. Jak dlouho údaje uchováváme</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Kontaktní údaje:</strong> do vyřízení požadavku, maximálně 1 rok.</li>
                  <li><strong>Cookies:</strong> podle typu – od 1 dne po max. 2 roky.</li>
                  <li><strong>Analytická data:</strong> v anonymizované podobě i déle.</li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">10. Vaše práva</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Máte právo:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>na přístup k údajům,</li>
                  <li>na opravu nebo výmaz,</li>
                  <li>na omezení zpracování,</li>
                  <li>na přenositelnost údajů,</li>
                  <li>vznést námitku,</li>
                  <li>odvolat souhlas,</li>
                  <li>podat stížnost u ÚOOÚ (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-brand-olive hover:underline">www.uoou.cz</a>).</li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">11. Kontakt</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p>Pro uplatnění vašich práv nebo v případě dotazů nás kontaktujte na:</p>
                <div className="bg-brand-beige rounded-xl p-6">
                  <div className="space-y-2">
                    <p>📧 <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline">marek.madensky@gmail.com</a></p>
                    <p>📞 <a href="tel:+420737775956" className="text-brand-olive hover:underline">+420 737 775 956</a></p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}