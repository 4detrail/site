// =====================================================================
//  CHASING THE SHLUMP — HABER VERİLERİ
//  Yeni haber eklemek için NEWS dizisinin EN BAŞINA yeni bir nesne ekle.
//  Alanlar:
//    id         : URL'de görünen kısa kimlik (küçük harf, boşluksuz, tek olmalı)
//    title      : Haber başlığı
//    category   : DUYURU / GÜNCELLEME / GELİŞTİRİCİ GÜNLÜĞÜ ...
//    date       : Tarih (örn. '12 Kasım 2026')  — şimdilik 'Yakında eklenecek'
//    developer  : Haberi yazan geliştirici / ekip
//    summary    : Kartta görünen kısa özet
//    cover      : (isteğe bağlı) kapak görseli yolu, örn. 'img/haber-1.jpg'
//    body       : Paragraflar dizisi (her eleman bir paragraf)
//    comingSoon : true ise içerik yerine "yakında eklenecek" kutusu gösterilir
// =====================================================================
export const GAME = {
  name: 'Chasing The Shlump',
  developer: 'HEXAGES GAMES',
  status: 'Geliştiriliyor',
  platform: 'Yakında duyurulacak',
  release: 'Yakında'
};

export const NEWS = [
  {
    id: 'ilk-haber',
    title: 'İlk Haber Yakında',
    category: 'DUYURU',
    date: 'Yakında eklenecek',
    developer: 'HEXAGES GAMES Geliştirme Ekibi',
    summary: 'Chasing The Shlump hakkındaki ilk resmi haber çok yakında burada yayınlanacak.',
    cover: '',
    body: [],
    comingSoon: true
  }
];
