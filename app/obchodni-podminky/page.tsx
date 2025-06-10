import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Mail, Phone, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Všeobecné obchodní podmínky',
  description: 'Obchodní podmínky kurzu tvorby videí v rámci dotačního programu "Jsem v kurzu" od Double Tap.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 overflow-hidden">
            <div className="flex items-center mb-8">
              <FileText className="w-8 h-8 md:w-12 md:h-12 text-brand-olive mr-4 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-anton text-brand-gray leading-tight">
                  Všeobecné obchodní podmínky
                </h1>
                <p className="text-brand-gray/60 font-montserrat mt-2 text-sm md:text-base">
                  Kurz tvorby videí v rámci programu „Jsem v kurzu"
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-brand-beige rounded-lg p-4 md:p-6 mb-8">
              <p className="font-montserrat text-brand-gray/80 leading-relaxed text-sm md:text-base">
                Tyto obchodní podmínky stanovují pravidla a podmínky poskytování kurzu tvorby videí (Poskytovatelem) v rámci programu „Jsem v kurzu" (dotace Úřadu práce ČR).
              </p>
            </div>

            {/* Provider identification */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">
                Identifikace Poskytovatele
              </h2>
              <div className="bg-brand-beige rounded-lg p-4 md:p-6 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="font-montserrat mb-2 text-sm md:text-base"><strong>Název firmy:</strong> Marek Madenský</p>
                    <p className="font-montserrat mb-2 text-sm md:text-base break-words"><strong>Sídlo:</strong> Karla Hynka Máchy 1706, Frýdek-Místek, 738 01</p>
                    <p className="font-montserrat mb-2 text-sm md:text-base"><strong>IČ:</strong> 06885560</p>
                    <p className="font-montserrat text-sm md:text-base"><strong>DIČ:</strong> není plátcem DPH</p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center mb-2 min-w-0">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-olive mr-2 flex-shrink-0" />
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline font-montserrat text-sm md:text-base break-all min-w-0">
                        marek.madensky@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center min-w-0">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-olive mr-2 flex-shrink-0" />
                      <a href="tel:+420737775956" className="text-brand-olive hover:underline font-montserrat text-sm md:text-base break-all">
                        +420 737 775 956
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content sections with responsive design */}
            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">1. Úvodní ustanovení</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">1.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Tyto obchodní podmínky jsou součástí poskytování kurzu tvorby videí v rámci programu „Jsem v kurzu" dotovaného Úřadem práce ČR.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">1.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Poskytovatel poskytuje kurz a Klient (účastník kurzu) jej využívá za podmínek stanovených v těchto obchodních podmínkách a ve smlouvě uzavřené mezi Klientem a Úřadem práce ČR.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">2. Objednávka a uzavření smlouvy</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">2.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Klient se do kurzu hlásí prostřednictvím webu <span className="break-all">www.jsemvkurzu.cz</span> a následně uzavírá smlouvu o financování kurzu s Úřadem práce ČR.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">2.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Smluvním partnerem ohledně dotace a financování kurzu je Úřad práce ČR, nikoli přímo Poskytovatel.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">2.3</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Klient hradí Poskytovateli pouze spoluúčast ve výši <strong className="text-brand-red whitespace-nowrap">2 700 Kč</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">3. Cena a platební podmínky</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">3.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Celková cena kurzu je hrazena převážně prostřednictvím Úřadu práce ČR v rámci dotačního programu.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">3.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Klient hradí pouze spoluúčast ve výši <span className="whitespace-nowrap">2 700 Kč</span>, a to převodem na účet Poskytovatele na základě platebních pokynů.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">3.3</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      V ceně (a v dotované části) jsou zahrnuty studijní materiály a přístup ke všem částem kurzu dle specifikace kurzu.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">4. Storno podmínky a vracení spoluúčasti</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">4.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Vzhledem k tomu, že kurz je financován z veřejných prostředků, nelze požadovat vrácení celé částky (kterou hradí Úřad práce).
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">4.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      V případě zrušení účasti lze požadovat vrácení pouze zaplacené spoluúčasti (<span className="whitespace-nowrap">2 700 Kč</span>), a to pouze před zahájením kurzu.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">4.3</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Po zahájení kurzu již není možné spoluúčast vracet, výjimku tvoří doložení závažných zdravotních či rodinných důvodů. V takovém případě se vrací spoluúčast na základě individuálního posouzení.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">5. Technické a osobní požadavky</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">5.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Klient se zavazuje mít během kurzu k dispozici chytrý telefon (smartphone) s kvalitním fotoaparátem a dostatečným úložištěm.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">5.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Bez odpovídajícího zařízení nemusí být možné plnohodnotné absolvování kurzu.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">6. Reklamace</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">6.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Vzhledem k charakteru kurzu a dotovanému režimu není možné kurz reklamovat standardní cestou jako zboží.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">6.2</span>
                    <div className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      <p className="mb-2">V případě zásadních nedostatků (např. nefunkčnost obsahu, neodpovídající kvalita výuky) je možné kontaktovat Poskytovatele e-mailem na adrese:</p>
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline break-all">
                        marek.madensky@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">7. Ochrana osobních údajů</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">7.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Ochrana osobních údajů se řídí samostatným dokumentem (
                      <Link href="/zasady-ochrany-osobnich-udaju" className="text-brand-olive hover:underline break-words">
                        GDPR zásady
                      </Link>
                      ), který je dostupný na vyžádání nebo je součástí přihlášky do kurzu.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">7.2</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Klient poskytuje osobní údaje v rozsahu nezbytném pro realizaci kurzu a pro účely komunikace s Úřadem práce ČR.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">8. Řešení sporů</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">8.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      V případě jakýchkoli nejasností či nespokojenosti je Klient vyzván ke komunikaci přímo s Poskytovatelem.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">8.2</span>
                    <div className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      <p className="mb-2">Spotřebitel má právo obrátit se s případným sporem na Českou obchodní inspekci nebo využít platformu ODR:</p>
                      <a href="https://ec.europa.eu/consumers/odr/" className="text-brand-olive hover:underline break-all" target="_blank" rel="noopener noreferrer">
                        https://ec.europa.eu/consumers/odr/
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-xl md:text-2xl font-anton text-brand-gray mb-4">9. Závěrečná ustanovení</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">9.1</span>
                    <p className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      Poskytovatel si vyhrazuje právo obchodní podmínky aktualizovat nebo upravit.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="bg-brand-olive text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-anton text-xs md:text-sm flex-shrink-0 mt-1">9.2</span>
                    <div className="font-montserrat text-brand-gray/80 text-sm md:text-base leading-relaxed min-w-0">
                      <p className="mb-2">V případě dotazů ohledně těchto podmínek může Klient kontaktovat Poskytovatele e-mailem na adrese:</p>
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline break-all">
                        marek.madensky@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Important notice */}
            <div className="mt-12 bg-brand-red/10 border border-brand-red/20 rounded-xl p-4 md:p-6 overflow-hidden">
              <div className="flex items-start gap-3 md:gap-4">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-brand-red mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-anton text-base md:text-lg text-brand-red mb-2">Důležité upozornění</h4>
                  <p className="text-brand-gray/80 font-montserrat text-sm md:text-base leading-relaxed">
                    Tyto obchodní podmínky se vztahují na kurz financovaný z dotačního programu „Jsem v kurzu". 
                    Pro úspěšné absolvování je nutná minimálně 80% účast a splnění finálního projektu.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-brand-gray/10 text-center">
              <p className="text-brand-gray/60 font-montserrat text-sm md:text-base">
                <strong>Datum poslední aktualizace:</strong> 1. 4. 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}