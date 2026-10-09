// =====================================================================
//  CHASING THE SHLUMP — OYUN BİLGİSİ VE HABERLER
//  Yeni haber eklemek için NEWS dizisinin EN ÜSTÜNE yeni bir nesne ekle.
//  (Başka hiçbir dosyaya dokunman gerekmez; kart ve haber sayfası otomatik oluşur.)
//
//  Alanlar:
//   id        : URL'de kullanılan benzersiz kısa ad (küçük harf, tire ile)  -> haber.html?id=ornek-haber
//   tag       : Kartın üstündeki etiket (DUYURU, GÜNCELLEME, GELİŞTİRİCİ GÜNLÜĞÜ ...)
//   title     : Başlık
//   excerpt   : Kartta görünen kısa özet
//   date      : Görünen tarih metni. Henüz yoksa 'Yakında eklenecek'
//   dateISO   : (Opsiyonel) '2026-10-20' gibi; varsa Google için de kullanılır
//   developer : Haberi yazan / geliştirici
//   cover     : (Opsiyonel) kapak görseli yolu, örn. 'img/haber-1.jpg'. Boşsa logolu kapak çıkar
//   body      : İçerik. Düz metin = paragraf, { h: 'Alt başlık' } = başlık,
//               { list: ['madde 1','madde 2'] } = liste, { note: 'Not' } = vurgulu kutu
// =====================================================================

export const GAME = {
  slug: 'chasing-the-shlump',
  name: 'Chasing the Shlump',
  developer: 'HEXAGES GAMES',
  status: 'Geliştirme aşamasında',
  releaseDate: 'Yakında eklenecek',
  platform: 'Yakında eklenecek',
  genre: 'Yakında eklenecek',
  summary: 'HEXAGES GAMES ekibinin geliştirdiği yeni oyunu Chasing the Shlump için tüm haberler, duyurular ve geliştirici notları burada yayınlanacak.'
};

export const NEWS = [
  {
    id: 'yakinda-haberler',
    tag: 'Duyuru',
    title: 'Chasing the Shlump Haberleri Çok Yakında',
    excerpt: 'Oyunumuzun ilk resmi haberi hazırlanıyor. Tarih ve detaylar yakında bu sayfada yayınlanacak.',
    date: 'Yakında eklenecek',
    dateISO: '',
    developer: 'HEXAGES GAMES Geliştirici Ekibi',
    cover: '',
    body: [
      'Chasing the Shlump için ilk resmi haber hazırlanıyor. Oyunun detayları, geliştirme süreci ve yayın planı hazır olduğunda bu sayfada paylaşılacak.',
      { h: 'Neler paylaşılacak?' },
      { list: ['Oyun hakkında ilk resmi bilgiler', 'Geliştirici günlükleri ve ekran görüntüleri', 'Çıkış tarihi ve platform duyuruları', 'Test ve güncelleme notları'] },
      { note: 'Bu haber geçici bir yer tutucudur. Tarih, içerik ve görseller yakında eklenecek.' },
      'Gelişmeleri kaçırmamak için Discord sunucumuza katılabilir ve sosyal medya hesaplarımızı takip edebilirsin.'
    ]
  }
];

export function getNews(id) { return NEWS.find((n) => n.id === id) || null; }
