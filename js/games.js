// Oyun kataloğu — sadece gerçek bilgiler. Yeni oyun eklemek için bir kayıt daha ekleyin.
// Görsel dosya adları assets/games/<id>/ altındadır.
export const GAMES = [
  {
    id: 'chasing-the-shlump',
    name: 'Chasing the SHlump',
    status: 'Geliştiriliyor',
    platform: 'PC',
    genre: 'Aksiyon / Macera',
    summary: 'HEXAGES GAMES’in geliştirdiği Chasing the SHlump, yakında duyurulacak ilk ana projemizdir.',
    description: 'Oyun hakkında detaylı bilgiler, geliştirme güncellemeleri ve yayın tarihi açıklandığında bu sayfadan takip edebilirsiniz.',
    images: {
      cover: 'assets/games/chasing-the-shlump/cover.png',
      banner: 'assets/games/chasing-the-shlump/banner.png',
      logo: 'assets/games/chasing-the-shlump/logo.png',
      og: 'assets/games/chasing-the-shlump/og-image.png',
      screenshots: [
        'assets/games/chasing-the-shlump/screenshot-1.png',
        'assets/games/chasing-the-shlump/screenshot-2.png',
        'assets/games/chasing-the-shlump/screenshot-3.png',
        'assets/games/chasing-the-shlump/screenshot-4.png'
      ]
    }
  }
];

export function getGame(id) {
  return GAMES.find(g => g.id === id) || null;
}
