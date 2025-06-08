import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 mr-4 text-brand-olive" />
            <h1 className="text-3xl md:text-4xl font-anton">Všeobecné obchodní podmínky</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            <p className="text-lg text-brand-gray/80 font-montserrat mb-8">
              Tyto obchodní podmínky stanovují pravidla a podmínky poskytování kurzu tvorby videí (Poskytovatelem) v rámci programu „Jsem v kurzu" (dotace Úřadu práce ČR).
            </p>

            {/* Provider identification */}
            <div className="bg-brand-beige rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">Identifikace Poskytovatele</h2>
              <div className="space-y-2 font-montserrat">
                <p><strong>Název firmy:</strong> Marek Madenský</p>
                <p><strong>Sídlo:</strong> Karla Hynka Máchy 1706, Frýdek-Místek, 738 01</p>
                <p><strong>IČ:</strong> 06885560</p>
                <p><strong>DIČ:</strong> není plátcem DPH</p>
                <p><strong>E-mail:</strong> <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline">marek.madensky@gmail.com</a></p>
                <p><strong>Telefon:</strong> <a href="tel:+420737775956" className="text-brand-olive hover:underline">+420 737 775 956</a></p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">1. Úvodní ustanovení</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>1.1</strong> Tyto obchodní podmínky jsou součástí poskytování kurzu tvorby videí v rámci programu „Jsem v kurzu" dotovaného Úřadem práce ČR.</p>
                <p><strong>1.2</strong> Poskytovatel poskytuje kurz a Klient (účastník kurzu) jej využívá za podmínek stanovených v těchto obchodních podmínkách a ve smlouvě uzavřené mezi Klientem a Úřadem práce ČR.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">2. Objednávka a uzavření smlouvy</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>2.1</strong> Klient se do kurzu hlásí prostřednictvím webu www.jsemvkurzu.cz a následně uzavírá smlouvu o financování kurzu s Úřadem práce ČR.</p>
                <p><strong>2.2</strong> Smluvním partnerem ohledně dotace a financování kurzu je Úřad práce ČR, nikoli přímo Poskytovatel.</p>
                <p><strong>2.3</strong> Klient hradí Poskytovateli pouze spoluúčast ve výši 2 700 Kč</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">3. Cena a platební podmínky</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>3.1</strong> Celková cena kurzu je hrazena převážně prostřednictvím Úřadu práce ČR v rámci dotačního programu.</p>
                <p><strong>3.2</strong> Klient hradí pouze spoluúčast ve výši 2 700 Kč, a to převodem na účet Poskytovatele na základě platebních pokynů.</p>
                <p><strong>3.3</strong> V ceně (a v dotované části) jsou zahrnuty studijní materiály a přístup ke všem částem kurzu dle specifikace kurzu.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">4. Storno podmínky a vracení spoluúčasti</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>4.1</strong> Vzhledem k tomu, že kurz je financován z veřejných prostředků, nelze požadovat vrácení celé částky (kterou hradí Úřad práce).</p>
                <p><strong>4.2</strong> V případě zrušení účasti lze požadovat vrácení pouze zaplacené spoluúčasti (2 700 Kč), a to pouze před zahájením kurzu.</p>
                <p><strong>4.3</strong> Po zahájení kurzu již není možné spoluúčast vracet, výjimku tvoří doložení závažných zdravotních či rodinných důvodů. V takovém případě se vrací spoluúčast na základě individuálního posouzení.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">5. Technické a osobní požadavky</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>5.1</strong> Klient se zavazuje mít během kurzu k dispozici chytrý telefon (smartphone) s kvalitním fotoaparátem a dostatečným úložištěm.</p>
                <p><strong>5.2</strong> Bez odpovídajícího zařízení nemusí být možné plnohodnotné absolvování kurzu.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">6. Reklamace</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>6.1</strong> Vzhledem k charakteru kurzu a dotovanému režimu není možné kurz reklamovat standardní cestou jako zboží.</p>
                <p><strong>6.2</strong> V případě zásadních nedostatků (např. nefunkčnost obsahu, neodpovídající kvalita výuky) je možné kontaktovat Poskytovatele e-mailem na adrese: <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline">marek.madensky@gmail.com</a></p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">7. Ochrana osobních údajů</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>7.1</strong> Ochrana osobních údajů se řídí samostatným dokumentem (GDPR zásady), který je dostupný na vyžádání nebo je součástí přihlášky do kurzu.</p>
                <p><strong>7.2</strong> Klient poskytuje osobní údaje v rozsahu nezbytném pro realizaci kurzu a pro účely komunikace s Úřadem práce ČR.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">8. Řešení sporů</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>8.1</strong> V případě jakýchkoli nejasností či nespokojenosti je Klient vyzván ke komunikaci přímo s Poskytovatelem.</p>
                <p><strong>8.2</strong> Spotřebitel má právo obrátit se s případným sporem na Českou obchodní inspekci nebo využít platformu ODR: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-olive hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-anton text-brand-gray mb-4">9. Závěrečná ustanovení</h2>
              <div className="space-y-4 font-montserrat text-brand-gray/80">
                <p><strong>9.1</strong> Poskytovatel si vyhrazuje právo obchodní podmínky aktualizovat nebo upravit.</p>
                <p><strong>9.2</strong> V případě dotazů ohledně těchto podmínek může Klient kontaktovat Poskytovatele e-mailem na adrese: <a href="mailto:marek.madensky@gmail.com" className="text-brand-olive hover:underline">marek.madensky@gmail.com</a></p>
              </div>
            </section>

            {/* Date */}
            <div className="bg-brand-gray text-white rounded-xl p-6 text-center">
              <p className="font-montserrat font-semibold">
                Datum poslední aktualizace: 1. 4. 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}