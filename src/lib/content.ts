// Content sourced from the ARES-Reflect ÖTR / KTR reports (TEKNOFEST 2026,
// Hareketli Uydu Terminali Yarışması, Takım PATH).

export const NAV = [
  { id: "genel", label: "Genel Bakış" },
  { id: "sorun", label: "Sorun" },
  { id: "sistem", label: "Sistem" },
  { id: "yazilim", label: "Yazılım" },
  { id: "donanim", label: "Donanım" },
  { id: "takim", label: "Takım" },
]

export const HERO_STATS = [
  { value: 15, decimals: 0, unit: "kg", label: "Toplam ağırlık", note: "Sınır 20 kg", prefix: "~" },
  { value: 100, decimals: 0, unit: "W", label: "Nominal güç", note: "Tepe ~124 W · Sınır 140 W", prefix: "~" },
  { value: 8, decimals: 0, unit: "°", label: "Bozucu bastırma", note: "10 sn periyot, Roll/Pitch", prefix: "±" },
  { value: 7.5, decimals: 1, unit: "dB", label: "IRS kazancı", note: "−122 → −114,5 dBm", prefix: "+" },
]

export const LINK = {
  blocked: -122,
  threshold: -110,
  withIrs: -114.5,
  gain: 7.5,
  min: -130,
  max: -106,
}

export const PIPELINE = [
  {
    step: "01",
    title: "Deterministik kümeleme",
    text: "Depremzede noktaları K-Means ile servis bölgelerine ayrılır. Rastgelelik yok: aynı girdi her zaman aynı yerleşimi üretir.",
  },
  {
    step: "02",
    title: "Aday üretimi",
    text: "Küme merkezi, çevre ızgarası, enkaz halkaları ve röle koridorlarından terminal adayları; bina cephelerine oturtulan IRS adayları.",
  },
  {
    step: "03",
    title: "Görüş hattı testi",
    text: "Nokta-poligon ve doğru parçası-poligon testleri. Terminal → IRS veya IRS → hedef sağlam bir binaya çarparsa aday elenir.",
  },
  {
    step: "04",
    title: "Ortak optimizasyon",
    text: "Terminaller ve IRS setleri birlikte seçilir: yol uzunluğu, açık kapsama, cephe hizası ve kestirimsel link kazancı tek skorda.",
  },
]

export const HARDWARE = [
  { group: "Beyin", name: "ESP32-WROOM-32", spec: "Çift çekirdek · 1 kHz EKF + PID, ikinci çekirdek telemetri" },
  { group: "Sensör", name: "BNO055 IMU", spec: "9 eksen · ivme, jiroskop, manyetometre füzyonu" },
  { group: "Sensör", name: "AS5048A enkoder", spec: "14-bit manyetik · eksen başına konum geri beslemesi" },
  { group: "Sensör", name: "NEO-M9N GNSS", spec: "Platform konumu → uydu azimut / elevasyon hesabı" },
  { group: "Eyleyici", name: "NEMA 23 + TB6600", spec: "2,0 Nm baz tork · mikroadım sürüş" },
  { group: "Aktarım", name: "3:1 triger kayış", spec: "6,0 Nm efektif tork · 1° motor → 0,33° anten" },
  { group: "RF", name: "40 cm parabolik anten", spec: "S-band 2 GHz · 3GPP Rel-17/18 NTN" },
  { group: "Döner", name: "12 kanal slip ring", spec: "Azimutta 0–360° kesintisiz dönüş" },
  { group: "Doğrulama", name: "5 mW lazer", spec: "Boresight ekseninde · hedef çembere nokta atışı" },
]

export const SAFETY = [
  { id: "L1", threat: "Ters polarite", guard: "P-MOSFET" },
  { id: "L2", threat: "Aşırı akım", guard: "5 A cam sigorta" },
  { id: "L3", threat: "Geçici aşırı gerilim", guard: "SMBJ40CA TVS" },
  { id: "L4", threat: "İletilen EMI", guard: "π-filtre (L+C)" },
  { id: "L5", threat: "12 V aşırı yük", guard: "TPS54331 OCP" },
  { id: "L6", threat: "5 V kısa devre", guard: "MP1584 SCP" },
  { id: "L7", threat: "ESD (USB/IO)", guard: "TVS dizisi" },
  { id: "L8", threat: "Yazılım kilitlenmesi", guard: "Watchdog timer" },
  { id: "L9", threat: "Kaçak akım", guard: "Topraklı şasi" },
]


export const TEAM = [
  { name: "Doç. Dr. İlhan Baştürk", role: "Danışman", dept: "Manisa CBÜ Öğretim Üyesi", linkedin: "https://www.linkedin.com/in/ilhan-ba%C5%9Ft%C3%BCrk-505b2819/" },
  { name: "Mehmet Burak Tarcan", role: "Takım Kaptanı", dept: "Elektrik-Elektronik Müh.", linkedin: "https://www.linkedin.com/in/mehmet-burak-tarcan-946076248/", cv: "/cv/mehmet-burak-tarcan.pdf" },
  { name: "Ali Alper Tellioğlu", role: "Elektronik Donanım", dept: "Elektrik-Elektronik Müh.", linkedin: "https://www.linkedin.com/in/alialpertellioglu/", cv: "/cv/ali-alper-tellioglu.pdf" },
  { name: "Eren Özdemir", role: "Simülasyon ve Test", dept: "Elektrik-Elektronik Müh.", linkedin: "https://www.linkedin.com/in/eren-%C3%B6zdemir-00b515297/", cv: "/cv/eren-ozdemir.pdf" },
  { name: "Hasan Arda Yaman", role: "Güç Sistemleri", dept: "Elektrik-Elektronik Müh.", linkedin: "https://www.linkedin.com/" },
  { name: "Hasan Emre Kaya", role: "Mekanik Tasarım", dept: "Makine Mühendisliği", linkedin: "https://www.linkedin.com/in/hasanemrekaya/", cv: "/cv/hasan-emre-kaya.pdf" },
  { name: "Oğuzhan Önder", role: "Arayüz ve Yazılım", dept: "Yapay Zeka ve Makine Öğrenmesi", linkedin: "https://www.linkedin.com/in/o%C4%9Fuzhan%C3%B6nderr/", cv: "/cv/oguzhan-onder.pdf" },
]

export const REFERENCES = [
  "S. Song vd., “Satellite direct-to-device communication: Two approaches for 3GPP global connectivity,” Ericsson Technology Review, 2025.",
  "3GPP, “Non-Terrestrial Networks (NTN) — Overview and standardization activities,” 2025.",
  "A. Umer vd., “Reconfigurable intelligent surfaces in 6G radio localization,” IEEE Commun. Surveys Tuts., c. 27, no. 6, 2025.",
  "R. Liu vd., “Integrated sensing and communication with reconfigurable intelligent surfaces,” IEEE Wireless Commun., c. 30, no. 1, 2023.",
  "S. Dey vd., “Robust cascade control strategy for trajectory tracking … inertial stabilized platform,” Trans. Inst. Meas. Control, 2025.",
  "B. Karaman vd., “Solutions for sustainable and resilient communication infrastructure in disaster relief,” IEEE Commun. Surveys Tuts., 2025.",
  "M. Jung, H. Son, “Performance Analysis of RIS-Assisted Satellite Communications,” Mathematics, 12(23), 2024.",
  "J. Ren vd., “Direct Closed-Loop Control Structure for the Three-Axis Satcom-on-the-Move Antenna,” Aerospace, 11(8), 2024.",
]
