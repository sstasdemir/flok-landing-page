import type { Dictionary } from "@/lib/dictionaries/types";

const ids = {
  trust: "guven",
  categories: "kategoriler",
  eventDay: "etkinlik-gunu",
  memories: "anilar",
  faq: "sss",
  preRegister: "on-kayit",
};

export const tr: Dictionary = {
  meta: {
    title: "Flok · Yakındaki etkinlikler, tek uygulamada",
    description:
      "Flok, İstanbul'daki konser, atölye, koşu gibi küçük buluşmaları tek yerde toplar. Başvur, sohbete katıl, kapıda QR ile gir. Ön kayıt açık.",
    ogTitle: "Flok · İstanbul'daki küçük buluşmalar, tek uygulamada",
    ogImage: "images/og-home.jpg?v=4",
    ogImageAlt: "Flok: İstanbul'daki küçük buluşmalar, tek uygulamada.",
    ogLocale: "tr_TR",
  },
  header: {
    homeLabel: "Flok ana sayfa",
    navLabel: "Menü",
    cta: "Ön kayıt oluştur",
    languageLabel: "Dil",
    links: [
      { id: ids.trust, label: "Güven" },
      { id: ids.faq, label: "SSS" },
    ],
  },
  footer: {
    legalLabel: "Yasal",
    privacy: "Gizlilik",
    terms: "Kullanım Şartları",
    support: "Destek",
    cookies: "Çerez tercihleri",
  },
  hero: {
    srOnly: "Yakındaki insanlar ve etkinlikler, tek uygulamada.",
    before: "Yakındaki",
    wordSuffix: ",",
    after: "tek uygulamada.",
    words: [
      "insanlar",
      "etkinlikler",
      "koşular",
      "konserler",
      "sofralar",
      "atölyeler",
      "yürüyüşler",
      "stand-up'lar",
      "sergiler",
      "piknikler",
      "topluluklar",
    ],
    lead: "İstanbul'daki konser, atölye, koşu, stand-up… Her yere dağılmış küçük buluşmaları Flok tek yerde toplar. Başvurursun, sohbete katılırsın, kapıda QR ile girersin.",
    leadHighlight: "İstanbul'daki",
    scrollCue: "Aşağı kaydır",
    storeBadges: [
      { src: "/images/badges/app-store-tr.svg", alt: "App Store'dan indirin", width: 151.29, height: 40 },
      { src: "/images/badges/google-play-tr.png", alt: "Google Play'den indirin", width: 134.58, height: 40 },
    ],
  },
  trust: {
    id: ids.trust,
    eyebrow: "Güven",
    title: "Tanımadığın insanlarla, içi rahat buluşmalar.",
    description:
      "Flok'ta her buluşmanın arkasında onaylı başvurular, görünür bir güven puanı ve senin kontrolündeki bir profil var.",
    points: [
      {
        icon: "shieldCheck",
        title: "Kimin geleceğine düzenleyen karar verir.",
        body: "Başvurulu etkinliklerde katılımcıları organizatör onaylar. Yer açıldığında bekleme listesi kendiliğinden ilerler.",
      },
      {
        icon: "sparkles",
        title: "Karma puanı güveni görünür kılar.",
        body: "Onaylanan her başvuru, kapıdaki her giriş ve paylaşılan her fotoğraf puanını büyütür. Kiminle buluşacağını önceden bilirsin.",
      },
      {
        icon: "flag",
        title: "Bildir, engelle, rahat et.",
        body: "Uygunsuz bir etkinliği ya da kullanıcıyı tek dokunuşla bildir, istemediğin kişileri engelle. Her bildirim incelenir.",
      },
      {
        icon: "eyeOff",
        title: "Profilin senin kontrolünde.",
        body: "Profilini kimlerin göreceğini sen seçersin. Etiketlendiğin fotoğrafları profilinden istediğin an gizleyebilirsin.",
      },
    ],
  },
  categories: {
    id: ids.categories,
    eyebrow: "Her zevke bir buluşma",
    title: "Bu akşam ne yapsan?",
    description:
      "Konserden atölyeye, koşudan stand-up'a. Flok sevdiğin şeyleri, sevdiğin şeyleri yapan insanlarla buluşturur.",
    listLabel: "Etkinlik kategorileri",
    perks: [
      { icon: "heart", title: "İlgi alanına göre öneriler", body: "Seçtiğin kategoriler akışını şekillendirir." },
      { icon: "bell", title: "Yakınında yeni bir şey açılınca haber", body: "Bildirimleri aç, çevrendeki etkinlikleri kaçırma." },
    ],
    items: [
      { icon: "music", label: "Müzik" },
      { icon: "palette", label: "Sanat" },
      { icon: "dumbbell", label: "Spor" },
      { icon: "utensils", label: "Yemek" },
      { icon: "users", label: "Sosyal" },
      { icon: "briefcase", label: "İş ağı" },
      { icon: "cpu", label: "Teknoloji" },
      { icon: "drama", label: "Komedi" },
      { icon: "plane", label: "Seyahat" },
      { icon: "trees", label: "Doğa" },
      { icon: "clapperboard", label: "Sinema" },
    ],
  },
  eventDay: {
    id: ids.eventDay,
    eyebrow: "Bir buluşmanın hikâyesi",
    title: "Başvurudan anıya, tek uygulamada.",
    description: "Bir etkinliği keşfettiğin andan fotoğrafların profiline düştüğü güne kadar her şey Flok'ta.",
    moments: [
      {
        time: "Salı 14:20",
        icon: "search",
        title: "Keşfettin, başvurdun.",
        body: "Kadıköy'de bir akustik gece gözüne çarptı. Tek dokunuşla başvurdun.",
      },
      {
        time: "Salı 18:05",
        icon: "badgeCheck",
        title: "Onaylandın.",
        body: "Düzenleyen başvurunu onayladı, QR biletin uygulamada hazır.",
      },
      {
        time: "Cuma 17:30",
        icon: "messageCircle",
        title: "Sohbette buluştunuz.",
        body: "Buluşma noktası duyuruldu. Hava durumu ve yol tarifi bir dokunuş uzağında.",
      },
      { time: "Cuma 20:00", icon: "qrCode", title: "Kapıda saniyeler.", body: "QR biletini okuttun, içeridesin." },
      {
        time: "Cumartesi",
        icon: "camera",
        title: "Gecenin anısı profilinde.",
        body: "Fotoğraflar paylaşıldı, karma puanın büyüdü.",
      },
    ],
  },
  memories: {
    id: ids.memories,
    eyebrow: "Şehirde bu hafta",
    title: "Her hafta yeni bir buluşma.",
    description:
      "Akustik geceler, sabah koşuları, seramik atölyeleri, uzun sofralar. Hepsi birilerinin bir fikriyle başladı.",
  },
  faq: {
    id: ids.faq,
    eyebrow: "Sık sorulanlar",
    title: "Aklında soru kalmasın.",
    prompt: "Cevabını bulamadığın bir şey mi\u00a0var?",
    items: [
      {
        question: "Flok ne zaman çıkıyor?",
        answer: "Son hazırlıkları yapıyoruz. Ön kayıt oluşturursan Flok App Store'a çıktığı gün ilk sen haberdar olursun.",
      },
      {
        question: "Android'de kullanabilecek miyim?",
        answer: "Evet. Flok hem iPhone'da hem Android'de olacak. Google Play'e çıktığımızda ön kayıt listesindekilere haber vereceğiz.",
      },
      {
        question: "Flok'u kullanmak ücretli mi?",
        answer: "Hayır. Flok'u indirmek, etkinlikleri keşfetmek, başvurmak ve etkinlik oluşturmak ücretsiz.",
      },
      {
        question: "Ücretli etkinlikler olacak mı?",
        answer:
          "Evet. Bazı etkinlikler ücretli olabilir; fiyat etkinlik sayfasında açıkça yazar ve bilet şimdilik organizatörün kendi sayfasından alınır. İleride isteyen herkes Flok üzerinden ücretli etkinlik oluşturup biletini doğrudan uygulamada satabilecek.",
      },
      {
        question: "Bir etkinliğe nasıl katılırım?",
        answer:
          "Etkinlik sayfasından başvurursun. Açık etkinliklerde yerin hemen ayrılır, başvurulu etkinliklerde düzenleyen onaylar. Onaylandığında QR biletin uygulamada hazır olur ve etkinlik sohbetine katılırsın.",
      },
      {
        question: "Etkinlik doluysa ne olur?",
        answer:
          "Düzenleyen bekleme listesini açtıysa listeye katılırsın. Bir yer açıldığında sıra kendiliğinden ilerler ve sana haber veririz.",
      },
      {
        question: "Etkinlikleri kim düzenliyor, güvenli mi?",
        answer:
          "Etkinlikleri Flok kullanıcıları düzenler. Başvurulu etkinliklerde kimin katılacağına düzenleyen karar verir; karma puanı, bildirme ve engelleme araçları topluluğu güvende tutar.",
      },
      {
        question: "Karma puanı nedir?",
        answer:
          "Flok'taki güvenilirliğini gösteren puan. Onaylanan her başvuru, kapıdaki her giriş ve paylaşılan her fotoğrafla büyür; böylece kiminle buluşacağını önceden görebilirsin.",
      },
      {
        question: "Profilimi kimler görebilir?",
        answer:
          "Bunu sen seçersin. Profilini gizli yaparsan yalnızca onayladığın kişiler görür. Etiketlendiğin fotoğrafları da profilinden istediğin an gizleyebilirsin.",
      },
      {
        question: "Organizatör olmak için ne gerekiyor?",
        answer:
          "Yalnızca bir Flok hesabı. Etkinliğini adım adım oluşturup yayınlarsın; başvuruları, sohbeti ve kapıdaki girişi uygulamadan yönetirsin.",
      },
      {
        question: "Kapıda katılımcıları kim kontrol ediyor?",
        answer:
          "Etkinliği düzenleyen kişi. Katılımcıları girişte uygulamadaki QR bilet ve doğrulama araçlarıyla bizzat organizatörün doğrulaması gerekir. Flok etkinlikler için personel, görevli ya da güvenlik desteği sağlamaz; yalnızca etkinliği oluşturup yönetebileceğin platformu sunar.",
      },
      {
        question: "Hesabımı silebilir miyim?",
        answer:
          "Evet. Profil ayarlarından hesabını istediğin an silebilirsin; profilin ve kişisel bilgilerin kalıcı olarak kaldırılır.",
      },
    ],
  },
  preRegister: {
    id: ids.preRegister,
    title: "İlk kullanıcılar ve organizatörler arasında yerini al.",
    body: "E-postanı bırak; Flok App Store'a çıktığı gün ilk sen haberdar ol.",
  },
  waitlist: {
    placeholder: "E-posta adresin",
    submit: "Ön kayıt oluştur",
    submitting: "Kaydediliyor…",
    consentBefore: "Ön kayıt oluşturarak ",
    consentLink: "Gizlilik Politikası",
    consentAfter: "’nı okuduğunu kabul edersin.",
    joined: "Listedesin! Yayına girince ilk sana yazacağız.",
    alreadyJoined: "Zaten listedesin, teşekkürler!",
    errors: {
      invalid: "Geçerli bir e-posta adresi yaz.",
      config: "Kayıt şu an kapalı. Biraz sonra tekrar dene.",
      network: "Bir şeyler ters gitti. Bağlantını kontrol edip tekrar dene.",
    },
  },
  consent: {
    title: "Çerez tercihin",
    bodyBefore:
      "Siteyi geliştirmek için analiz çerezleri kullanmak istiyoruz. Kabul etmezsen hiçbir analiz verisi toplanmaz. Ayrıntılar ",
    link: "Gizlilik Politikası",
    bodyAfter: "’nda.",
    accept: "Kabul et",
    decline: "Reddet",
  },
  legal: {
    updatedLabel: "Son güncelleme:",
    titles: { privacy: "Gizlilik Politikası", terms: "Kullanım Şartları", support: "Destek" },
    descriptions: {
      privacy: "Flok'un hangi verileri topladığı, nasıl kullandığı ve haklarınız.",
      terms: "Flok uygulamasını kullanma şartları, abonelikler ve hesap silme.",
      support: "Flok hakkında sık sorulan sorular ve iletişim.",
    },
  },
};
