import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Mail, Phone, AlertTriangle } from 'lucide-react';

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

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <FileText className="w-12 h-12 text-brand-olive mr-4" />
              <div>
                <h1 className="text-3xl md:text-4xl font-anton text-brand-gray">
                  Všeobecné obchodní podmínky
                </h1>
                <p className="text-brand-gray/60 font-montserrat mt-2">
                  Kurz tvorby videí v rámci programu „Jsem v kurzu"
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-brand-beige rounded-lg p-6 mb-8">
              <p className="font-montserrat text-brand-gray/80 leading-relaxed">
                Tyto obchodní podmínky stanovují pravidla a podmínky poskytování kurzu tvorby videí (Poskytovatelem) v rámci programu „Jsem v kurzu" (dotace Úřadu práce ČR).
              </p>
            </div>

            {/* Provider identification */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">
                Identifikace Poskytovatele
              </h2>
              <div className="bg-brand-beige rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-montserrat mb-2"><strong>Název firmy:</strong> Marek Madenský</p>
                    <p className="font-montserrat mb-2"><strong>Sídlo:</strong> Karla Hynka Máchy 1706, Frýdek-Místek, 738 01</p>
                    <p className="font-montserrat mb-2"><strong>IČ:</strong> 06885560</p>
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

            {/* Content sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">1. Úvodní ustanovení</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">1.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Tyto obchodní podmínky jsou součástí poskytování kurzu tvorby videí v rámci programu „Jsem v kurzu" dotovaného Úřadem práce ČR.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">1.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Poskytovatel poskytuje kurz a Klient (účastník kurzu) jej využívá za podmínek stanovených v těchto obchodních podmínkách a ve smlouvě uzavřené mezi Klientem a Úřadem práce ČR.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">2. Objednávka a uzavření smlouvy</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">2.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Klient se do kurzu hlásí prostřednictvím webu www.jsemvkurzu.cz a následně uzavírá smlouvu o financování kurzu s Úřadem práce ČR.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">2.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Smluvním partnerem ohledně dotace a financování kurzu je Úřad práce ČR, nikoli přímo Poskytovatel.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">2.3</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Klient hradí Poskytovateli pouze spoluúčast ve výši <strong className="text-brand-red">2 700 Kč</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">3. Cena a platební podmínky</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">3.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Celková cena kurzu je hrazena převážně prostřednictvím Úřadu práce ČR v rámci dotačního programu.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">3.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Klient hradí pouze spoluúčast ve výši 2 700 Kč, a to převodem na účet Poskytovatele na základě platebních pokynů.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">3.3</span>
                    <p className="font-montserrat text-brand-gray/80">
                      V ceně (a v dotované části) jsou zahrnuty studijní materiály a přístup ke všem částem kurzu dle specifikace kurzu.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">4. Storno podmínky a vracení spoluúčasti</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">4.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Vzhledem k tomu, že kurz je financován z veřejných prostředků, nelze požadovat vrácení celé částky (kterou hradí Úřad práce).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">4.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      V případě zrušení účasti lze požadovat vrácení pouze zaplacené spoluúčasti (2 700 Kč), a to pouze před zahájením kurzu.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">4.3</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Po zahájení kurzu již není možné spoluúčast vracet, výjimku tvoří doložení závažných zdravotních či rodinných důvodů. V takovém případě se vrací spoluúčast na základě individuálního posouzení.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">5. Technické a osobní požadavky</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">5.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Klient se zavazuje mít během kurzu k dispozici chytrý telefon (smartphone) s kvalitním fotoaparátem a dostatečným úložištěm.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">5.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Bez odpovídajícího zařízení nemusí být možné plnohodnotné absolvování kurzu.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">6. Reklamace</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">6.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Vzhledem k charakteru kurzu a dotovanému režimu není možné kurz reklamovat standardní cestou jako zboží.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">6.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      V případě zásadních nedostatků (např. nefunkčnost obsahu, neodpovídající kvalita výuky) je možné kontaktovat Poskytovatele e-mailem na adrese: 
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline ml-1">
                        marek.madensky@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">7. Ochrana osobních údajů</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">7.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Ochrana osobních údajů se řídí samostatným dokumentem (
                      <Link href="/zasady-ochrany-osobnich-udaju" className="text-brand-olive hover:underline">
                        GDPR zásady
                      </Link>
                      ), který je dostupný na vyžádání nebo je součástí přihlášky do kurzu.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">7.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Klient poskytuje osobní údaje v rozsahu nezbytném pro realizaci kurzu a pro účely komunikace s Úřadem práce ČR.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">8. Řešení sporů</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">8.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      V případě jakýchkoli nejasností či nespokojenosti je Klient vyzván ke komunikaci přímo s Poskytovatelem.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">8.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Spotřebitel má právo obrátit se s případným sporem na Českou obchodní inspekci nebo využít platformu ODR: 
                      <a href="https://ec.europa.eu/consumers/odr/" className="text-brand-olive hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                        https://ec.europa.eu/consumers/odr/
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-anton text-brand-gray mb-4">9. Závěrečná ustanovení</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">9.1</span>
                    <p className="font-montserrat text-brand-gray/80">
                      Poskytovatel si vyhrazuje právo obchodní podmínky aktualizovat nebo upravit.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">9.2</span>
                    <p className="font-montserrat text-brand-gray/80">
                      V případě dotazů ohledně těchto podmínek může Klient kontaktovat Poskytovatele e-mailem na adrese: 
                      <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline ml-1">
                        marek.madensky@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Important notice */}
            <div className="mt-12 bg-brand-red/10 border border-brand-red/20 rounded-xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-brand-red mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-anton text-lg text-brand-red mb-2">Důležité upozornění</h4>
                  <p className="text-brand-gray/80 font-montserrat">
                    Tyto obchodní podmínky se vztahují na kurz financovaný z dotačního programu „Jsem v kurzu". 
                    Pro úspěšné absolvování je nutná minimálně 80% účast a splnění finálního projektu.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-brand-gray/10 text-center">
              <p className="text-brand-gray/60 font-montserrat">
                <strong>Datum poslední aktualizace:</strong> 1. 4. 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}