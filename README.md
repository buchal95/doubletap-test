# Double Tap - Kurz Profesionální Tvorby Videí

Moderní landing page pro kurz profesionální tvorby videí postavená na Next.js s Tailwind CSS.

## 🚀 Funkce

- **Responzivní design** - Optimalizováno pro všechna zařízení
- **Moderní UI/UX** - Čistý a profesionální vzhled
- **Formulář registrace** - Integrovaný s BRJ API pro zpracování objednávek
- **SEO optimalizace** - Připraveno pro vyhledávače
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS** - Utility-first CSS framework

## 🛠️ Technologie

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typovaný JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Ikony
- [BRJ API](https://brj.app/) - Zpracování plateb

## 📦 Instalace

```bash
# Klonování repozitáře
git clone <repository-url>
cd doubletap

# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev
```

## 🔧 Konfigurace

Vytvořte soubor `.env.local` v kořenovém adresáři:

```env
BRJ_API_KEY=your_brj_api_key_here
```

## 🚀 Nasazení

### Netlify

1. Připojte repozitář k Netlify
2. Nastavte build command: `npm run build`
3. Nastavte publish directory: `.next`
4. Přidejte environment variables v Netlify dashboard

### Vercel (doporučeno pro Next.js)

```bash
npm install -g vercel
vercel
```

## 📁 Struktura projektu

```
doubletap/
├── app/
│   ├── api/
│   │   └── order/
│   │       └── create/
│   │           └── route.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── CTAButton.tsx
│   │   │   └── SectionHeading.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── PainPoints.tsx
│   │   │   ├── CourseOverview.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Subsidy.tsx
│   │   │   ├── Bonuses.tsx
│   │   │   ├── Urgency.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── LandingPage.tsx
│   ├── dekujeme/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

## 🎨 Design System

### Barvy

- **Brand Gray**: `#1C1C1C` - Hlavní text
- **Brand Beige**: `#EDE7DC` - Pozadí sekcí
- **Brand Red**: `#FF3B30` - CTA tlačítka
- **Brand Olive**: `#A8B400` - Akcenty

### Fonty

- **Anton** - Nadpisy
- **Montserrat** - Tělo textu

## 📧 Kontakt

Pro otázky ohledně kurzu kontaktujte:
- Email: mrkt.doubletap@gmail.com
- Telefon: +420 770 650 852

## 📄 Licence

Tento projekt je licencován pod MIT licencí.