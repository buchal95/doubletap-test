import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-beige">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-brand-olive hover:text-brand-gray transition-colors mb-8 font-montserrat font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na hlavní stránku
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <Shield className="w-12 h-12 text-brand-olive mr-4" />
              <div>
                <h1 className="text-3xl md:text-4xl font-anton text-brand-gray">
                  Zásady ochrany osobních údajů
                </h1>
                <p className="text-brand-gray/60 font-montserrat mt-2">
                  Účinné od: 8. dubna 2025
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* Section 1 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">
                  1. Identifikace správce osobních údajů
                </h2>
                <div className="bg-brand-beige rounded-lg p-6 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-montserrat"><strong>Název firmy:</strong> Marek Madenský</p>
                      <p className="font-montserrat"><strong>Sídlo:</strong> Karla Hynka Máchy 1706, Frýdek-Místek, 738 01</p>
                      <p className="font-montserrat"><strong>IČ:</strong> 06885560</p>
                      <p className="font-montserrat"><strong>DIČ:</strong> není plátcem DPH</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Mail className="w-5 h-5 text-brand-olive mr-2" />
                        <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline font-montserrat">
                          marek.madensky@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-brand-olive mr-2" />
                        <a href="tel:+420737775956" className="text-brand-olive hover:underline font-montserrat">
                          +420 737 775 956
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">2. Úvod</h2>
                <p className="font-montserrat text-brand-gray/80 leading-relaxed">
                  Vaše soukromí je pro nás důležité. Tyto zásady vysvětlují, jakým způsobem zpracováváme osobní údaje návštěvníků našich webových stránek v souladu s Nařízením EU 2016/679 (GDPR).
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">3. Jaké údaje shromažďujeme</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">Můžeme zpracovávat následující kategorie údajů:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80">
                      <strong>Kontaktní údaje:</strong> jméno, e-mail, telefon, pokud je dobrovolně vyplníte ve formuláři.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80">
                      <strong>Technické a analytické údaje:</strong> IP adresa, typ zařízení, prohlížeč, jazyk, odkud jste přišli, na co klikáte apod.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">4. Jak a proč údaje zpracováváme</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">Údaje zpracováváme z těchto důvodů:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80">odpovědi na vaše dotazy nebo poptávky,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80">analýza návštěvnosti a chování na webu,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80">cílená reklama a remarketing.</span>
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">5. Nástroje třetích stran, které využíváme</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">Na webu používáme nástroje, které mohou shromažďovat cookies a další údaje:</p>
                <div className="space-y-4">
                  <div className="bg-brand-beige rounded-lg p-4">
                    <h4 className="font-anton text-brand-gray mb-2">Google Analytics 4</h4>
                    <p className="font-montserrat text-brand-gray/80 text-sm">
                      Slouží k měření a analýze chování uživatelů na webu. 
                      <a href="#" className="text-brand-olive hover:underline ml-1">Zásady Google</a>
                    </p>
                  </div>
                  <div className="bg-brand-beige rounded-lg p-4">
                    <h4 className="font-anton text-brand-gray mb-2">Google Ads</h4>
                    <p className="font-montserrat text-brand-gray/80 text-sm">
                      Používáme pro cílenou reklamu a měření kampaní. 
                      <a href="#" className="text-brand-olive hover:underline ml-1">Podmínky reklam Google</a>
                    </p>
                  </div>
                  <div className="bg-brand-beige rounded-lg p-4">
                    <h4 className="font-anton text-brand-gray mb-2">Google Tag Manager</h4>
                    <p className="font-montserrat text-brand-gray/80 text-sm">
                      Spravuje měřicí kódy bez zásahu do kódu webu. Sám údaje neukládá. 
                      <a href="#" className="text-brand-olive hover:underline ml-1">Podmínky GTM</a>
                    </p>
                  </div>
                  <div className="bg-brand-beige rounded-lg p-4">
                    <h4 className="font-anton text-brand-gray mb-2">Sklik (Seznam.cz)</h4>
                    <p className="font-montserrat text-brand-gray/80 text-sm">
                      Nástroj pro zobrazování a měření českých reklamních kampaní. 
                      <a href="#" className="text-brand-olive hover:underline ml-1">Zásady Sklik</a>
                    </p>
                  </div>
                  <div className="bg-brand-beige rounded-lg p-4">
                    <h4 className="font-anton text-brand-gray mb-2">Meta (Facebook a Instagram)</h4>
                    <p className="font-montserrat text-brand-gray/80 text-sm">
                      Využíváme pixel Meta pro měření účinnosti reklam. 
                      <a href="#" className="text-brand-olive hover:underline ml-1">Zásady Meta</a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">6. Právní základ zpracování</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">Zpracování probíhá na základě:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>Vašeho souhlasu</strong> – například pro marketingové cookies,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>plnění smlouvy</strong> – když nám napíšete poptávku,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>oprávněného zájmu</strong> – například bezpečnost, základní analytika.</span>
                  </li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">7. Kdo má k údajům přístup</h2>
                <p className="font-montserrat text-brand-gray/80">
                  Vaše údaje nezpřístupňujeme třetím stranám bez vašeho souhlasu, kromě poskytovatelů výše uvedených nástrojů a případů, kdy to vyžaduje zákon.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">8. Přenos do třetích zemí</h2>
                <p className="font-montserrat text-brand-gray/80">
                  Některé nástroje (např. Google, Meta) mohou přenášet údaje mimo EU. Děje se tak na základě tzv. standardních smluvních doložek nebo jiných záruk dle GDPR.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">9. Jak dlouho údaje uchováváme</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>Kontaktní údaje:</strong> do vyřízení požadavku, maximálně 1 rok.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>Cookies:</strong> podle typu – od 1 dne po max. 2 roky.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-montserrat text-brand-gray/80"><strong>Analytická data:</strong> v anonymizované podobě i déle.</span>
                  </li>
                </ul>
              </section>

              {/* Section 10 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">10. Vaše práva</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">Máte právo:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">na přístup k údajům,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">na opravu nebo výmaz,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">na omezení zpracování,</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">na přenositelnost údajů,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">vznést námitku,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">odvolat souhlas,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-montserrat text-brand-gray/80">
                        podat stížnost u ÚOOÚ (<a href="https://www.uoou.cz" className="text-brand-olive hover:underline">www.uoou.cz</a>).
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 11 */}
              <section className="mb-8">
                <h2 className="text-2xl font-anton text-brand-gray mb-4">11. Kontakt</h2>
                <p className="font-montserrat text-brand-gray/80 mb-4">
                  Pro uplatnění vašich práv nebo v případě dotazů nás kontaktujte na:
                </p>
                <div className="bg-brand-beige rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-brand-olive mr-2" />
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline font-montserrat font-semibold">
                        marek.madensky@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-brand-olive mr-2" />
                      <a href="tel:+420737775956" className="text-brand-olive hover:underline font-montserrat font-semibold">
                        +420 737 775 956
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}