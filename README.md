# ARES-Reflect · Tanıtım Sitesi

TEKNOFEST 2026 Hareketli Uydu Terminali Yarışması, Takım PATH — ARES-Reflect projesinin tek sayfalık tanıtım sitesi.

**Teknolojiler:** Vite · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Lyra) · Magic UI · Motion · Phosphor Icons

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ klasörüne üretim çıktısı
npm run preview
```

## Vercel'e yayınlama

Repoyu GitHub'a gönderip Vercel'de **Add New → Project** ile içe aktarın. Vercel, Vite projesini otomatik tanır:

- Build Command: `npm run build`
- Output Directory: `dist`

Ek ayar veya ortam değişkeni gerekmez.

## Yapı

Tasarım, masaüstü uygulaması (ARES-Reflect Control Station) ile aynı "Amber Console" tokenlarını kullanır:
sol ray menü, üst durum şeridi, köşebentli paneller.

```text
src/lib/content.ts              Tüm metin ve sayısal veriler (ÖTR / KTR raporlarından)
src/components/shell.tsx        Sol ray menü + üst şerit (uygulamadaki kabuk)
src/components/section.tsx      Bölüm başlığı, panel, veri hücresi
src/components/hero-scene.tsx   NLoS / IRS saha şeması (SVG)
src/components/sections/        hero, problem, system, software, hardware, closing
```

İçeriği güncellemek için çoğu zaman yalnızca `src/lib/content.ts` dosyasını düzenlemek yeterlidir.
