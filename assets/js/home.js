(() => {
  "use strict";

  const SESSION_KEY = "jejak_nusantara_session_v1";
  const client = window.jejakSupabase;

  const greeting = document.querySelector("#account-greeting");
  const signOutButton = document.querySelector("#signout-button");
  const searchForm = document.querySelector("#site-search-form");
  const searchInput = document.querySelector("#site-search-input");
  const searchStatus = document.querySelector("#search-results-status");
  const storyCards = [...document.querySelectorAll(".story-card, .program-detail-card, .split-page-card")];
  const navToggle = document.querySelector("#nav-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const currentYear = document.querySelector("#current-year");
  const feedbackForm = document.querySelector("#feedback-form");
  const feedbackStatus = document.querySelector("#feedback-status");
  const feedbackPreview = document.querySelector("#feedback-preview");
  const FEEDBACK_KEY = "jejak_nusantara_feedback_v1";

  const modal = document.querySelector("#destination-modal");
  const modalCard = document.querySelector(".destination-modal-card");
  const modalMedia = document.querySelector("#modal-media");
  const modalGallery = document.querySelector("#modal-gallery");
  const modalTitle = document.querySelector("#modal-title");
  const modalProgram = document.querySelector("#modal-program");
  const modalDuration = document.querySelector("#modal-duration");
  const modalFocus = document.querySelector("#modal-focus");
  const modalOverview = document.querySelector("#modal-overview");

  const destinationDetails = {
  "umm": {
    "program": "OSN",
    "title": "UMM — Universitas Muhammadiyah Malang",
    "duration": "±3 jam",
    "focus": "Final OSN di Malang",
    "imageTitle": "Suasana Final OSN di UMM",
    "media": [
      {
        "src": "./assets/images/osn/umm-entrance.jpeg",
        "alt": "Siswa berdiri di depan gerbang Universitas Muhammadiyah Malang."
      },
      {
        "src": "./assets/images/osn/umm-main-building.jpeg",
        "alt": "Gedung utama UMM saat kegiatan berlangsung."
      },
      {
        "src": "./assets/images/osn/umm-inside.jpeg",
        "alt": "Suasana kegiatan di dalam area UMM."
      }
    ],
    "overview": "UMM menjadi titik utama dalam cerita Final OSN di Malang. Buat saya, tempat ini selalu terasa lebih dari sekadar kampus karena di sinilah rasa tegang, fokus, dan bangga bercampur jadi satu. Datang ke final OSN membuat perjalanan terasa jauh lebih serius, dan UMM jadi latar yang kuat untuk pengalaman itu.",
    "tags": [
      "OSN",
      "Kampus",
      "Final"
    ],
    "search": "osn umm universitas muhammadiyah malang campus final"
  },
  "osn-ai": {
    "program": "OSN",
    "title": "OSN AI",
    "duration": "Rangkaian lomba",
    "focus": "Kompetisi dan kebersamaan peserta",
    "imageTitle": "Dokumentasi OSN AI",
    "media": [
      {
        "src": "./assets/images/osn-ai/osnopening.jpg",
        "alt": "Suasana pembukaan OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/osnaicompetitionroomphotowithparticipant.jpg",
        "alt": "Suasana ruang lomba OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/ardiwithfriendsosnai.jpg",
        "alt": "Foto bersama teman-teman saat OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/foto-bersamaosnai.jpg",
        "alt": "Foto bersama peserta OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/picwithfriends1osnai.jpg",
        "alt": "Kebersamaan peserta OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/picwithfriendsosnai2.jpg",
        "alt": "Foto bersama setelah kegiatan OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/fototogetherosnaiafterwinning.jpg",
        "alt": "Foto bersama setelah hasil diumumkan."
      },
      {
        "src": "./assets/images/osn-ai/awardingnightmeholdinggoldmeda.jpg",
        "alt": "Momen award night OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/meholdingmedal.jpg",
        "alt": "Momen memegang medali setelah OSN AI."
      },
      {
        "src": "./assets/images/osn-ai/umminfront.jpg",
        "alt": "Berfoto di depan UMM dalam rangkaian OSN AI."
      }
    ],
    "overview": "Bagian ini merupakan cerita saya tentang OSN AI. Dokumentasinya tidak hanya memperlihatkan sisi kompetisi, tetapi juga sisi manusiawi yang saya alami: pembukaan yang ramai, ruang lomba yang penuh fokus, kebersamaan dengan teman-teman, sampai momen award yang sulit saya lupakan.",
    "tags": [
      "OSN",
      "AI",
      "Highlight"
    ],
    "search": "osn ai opening competition room award medal friends"
  },
  "brawijaya": {
    "program": "OSN",
    "title": "Istana Oleh-Oleh Brawijaya",
    "duration": "±2 jam",
    "focus": "Oleh-oleh dan produk lokal",
    "imageTitle": "Oleh-oleh dan produk lokal Malang",
    "media": [
      {
        "src": "./assets/images/osn/brawijaya-entrance.jpeg",
        "alt": "Papan depan Istana Oleh-Oleh Brawijaya."
      }
    ],
    "overview": "Istana Oleh-Oleh Brawijaya hadir sebagai bagian OSN karena tempat ini menunjukkan sisi lain dari perjalanan: budaya lokal dan ekonomi kecil. Menurut saya, oleh-oleh bukan sekadar barang yang dibeli sebelum pulang, tetapi cara suatu daerah memperkenalkan identitasnya kepada pengunjung.",
    "tags": [
      "OSN",
      "Oleh-oleh",
      "Branding"
    ],
    "search": "brawijaya oleh oleh souvenir"
  },
  "jatim-park-2": {
    "program": "OSN",
    "title": "Jatim Park 2",
    "duration": "±5 jam",
    "focus": "Wisata edukasi",
    "imageTitle": "Belajar sains lewat wisata di Jatim Park 2",
    "media": [
      {
        "src": "./assets/images/osn/jatim-park-2-entrance.jpeg",
        "alt": "Siswa berdiri di pintu masuk Jatim Park 2."
      }
    ],
    "overview": "Jatim Park 2 awalnya terasa seperti tempat rekreasi biasa, tetapi setelah diperhatikan, banyak bagian yang sebenarnya bisa dipakai untuk belajar. Saya suka karena edukasinya tidak terasa terlalu formal.",
    "tags": [
      "OSN",
      "Wisata",
      "Sains"
    ],
    "search": "jatim park 2"
  },
  "san-terra": {
    "program": "OSN",
    "title": "Flora Wisata San Terra de Laponte",
    "duration": "±3 jam",
    "focus": "Desain visual",
    "imageTitle": "Warna dan spot foto di San Terra",
    "media": [
      {
        "src": "./assets/images/osn/santerra-entrance.jpeg",
        "alt": "Pintu masuk Flora Wisata San Terra de Laponte."
      },
      {
        "src": "./assets/images/osn/santerra-inside.jpeg",
        "alt": "Foto kelompok di dalam San Terra."
      },
      {
        "src": "./assets/images/osn/santerra-inside-1.jpeg",
        "alt": "Suasana area bertema di San Terra."
      },
      {
        "src": "./assets/images/osn/santerra-inside-2.jpeg",
        "alt": "Pengunjung mengambil foto di area San Terra."
      }
    ],
    "overview": "San Terra terasa paling kuat dari sisi visual. Menurut saya, tempat ini memang dibuat supaya pengunjung nyaman berjalan, mengambil foto, dan menikmati warna-warna yang rapih disusun.",
    "tags": [
      "OSN",
      "Visual",
      "Wisata"
    ],
    "search": "san terra de laponte"
  },
  "coban-rondo": {
    "program": "OSN",
    "title": "Coban Rondo",
    "duration": "±4 jam",
    "focus": "Wisata alam",
    "imageTitle": "Suasana Coban Rondo",
    "media": [
      {
        "src": "./assets/images/osn/coban-rondo-entrance.jpeg",
        "alt": "Gerbang masuk Coban Rondo."
      },
      {
        "src": "./assets/images/osn/coban-rondo-waterfall.jpeg",
        "alt": "Air terjun Coban Rondo."
      },
      {
        "src": "./assets/images/osn/coban-rondo-waterfall-1.jpeg",
        "alt": "Dokumentasi di dekat air terjun Coban Rondo."
      },
      {
        "src": "./assets/images/osn/coban-rondo-waterfall-2.jpeg",
        "alt": "Pemandangan air terjun Coban Rondo."
      },
      {
        "src": "./assets/images/osn/coban-rondo-food.jpeg",
        "alt": "Makan bersama setelah berkunjung ke Coban Rondo."
      }
    ],
    "overview": "Coban Rondo memberi suasana yang berbeda dari tempat sebelumnya. Setelah banyak kegiatan, berada di area air terjun terasa lebih tenang dan menyegarkan. Buat saya, tempat ini cocok untuk refleksi sekaligus menikmati alam.",
    "tags": [
      "OSN",
      "Alam",
      "Refleksi"
    ],
    "search": "coban rondo waterfall"
  },
  "ui": {
    "program": "Pelatnas",
    "title": "UI — Pelatnas IOI Tahap 1",
    "duration": "Tahap 1 IOI",
    "focus": "Latihan awal menuju IOI",
    "imageTitle": "Suasana latihan di UI",
    "media": [
      {
        "src": "./assets/images/pelatnas/ui/ui-icon.png",
        "alt": "Landmark UI."
      },
      {
        "src": "./assets/images/pelatnas/ui/ui-lab-komputer.png",
        "alt": "Suasana lab komputer saat Pelatnas IOI di UI."
      }
    ],
    "overview": "Ini adalah catatan saya tentang Pelatnas IOI tahap 1 di UI. Setelah Final OSN, suasana di UI terasa seperti pintu masuk ke level yang lebih serius. Bagi saya, tahap ini bukan cuma soal latihan, tetapi juga adaptasi terhadap ritme, target, dan standar baru yang lebih tinggi.",
    "tags": [
      "Pelatnas",
      "IOI",
      "UI"
    ],
    "search": "pelatnas ioi ui"
  },
  "ipb": {
    "program": "Pelatnas",
    "title": "IPB University — Pelatnas IOI Tahap 2",
    "duration": "Tahap 2 IOI",
    "focus": "Pendalaman dan konsistensi",
    "imageTitle": "Aktivitas Pelatnas IOI di IPB",
    "media": [
      {
        "src": "./assets/images/pelatnas/ipb/ipb-lab-komputer.png",
        "alt": "Suasana lab komputer saat Pelatnas IOI di IPB."
      }
    ],
    "overview": "Bagi saya, tahap 2 di IPB terasa lebih matang dan menuntut konsistensi yang lebih tinggi. Kalau UI terasa sebagai awal transisi, IPB menegaskan bahwa persiapan IOI membutuhkan latihan serius dan ritme yang terus saya jaga.",
    "tags": [
      "Pelatnas",
      "IOI",
      "IPB"
    ],
    "search": "pelatnas ioi ipb"
  },
  "kebun-raya-bogor": {
    "program": "Pelatnas",
    "title": "Kebun Raya Bogor",
    "duration": "Jeda refleksi",
    "focus": "Alam dan observasi",
    "imageTitle": "Jeda di Kebun Raya Bogor",
    "media": [
      {
        "src": "./assets/images/pelatnas/kebun-raya-bogor/walking.png",
        "alt": "Berjalan-jalan di Kebun Raya Bogor."
      },
      {
        "src": "./assets/images/pelatnas/kebun-raya-bogor/presidential-place-1.png",
        "alt": "Area bangunan di sekitar Kebun Raya Bogor."
      },
      {
        "src": "./assets/images/pelatnas/kebun-raya-bogor/presidential-place-2.png",
        "alt": "Sudut lain di Kebun Raya Bogor."
      },
      {
        "src": "./assets/images/pelatnas/kebun-raya-bogor/cat-1.png",
        "alt": "Kucing di area Kebun Raya Bogor."
      },
      {
        "src": "./assets/images/pelatnas/kebun-raya-bogor/cat-2.png",
        "alt": "Dokumentasi kucing di area Kebun Raya Bogor."
      }
    ],
    "overview": "Kebun Raya Bogor hadir sebagai bagian pelengkap dari jalur Pelatnas karena suasananya memberi jeda yang menyenangkan di tengah ritme latihan. Buat saya, tempat seperti ini penting karena membantu pikiran lebih lega sebelum kembali ke aktivitas yang intens.",
    "tags": [
      "Pelatnas",
      "Refleksi",
      "Bogor"
    ],
    "search": "kebun raya bogor"
  },
  "ioai-ui-1": {
    "program": "Pelatnas",
    "title": "Pelatnas IOAI Tahap 1 — UI",
    "duration": "Tahap 1 IOAI",
    "focus": "Machine learning, statistika, dan simulasi awal",
    "imageTitle": "Pelatnas IOAI tahap 1 di UI",
    "media": [
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/bannerioaipelatnas1.jpg",
        "alt": "Banner Pelatnas IOAI tahap 1."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/materisesipelatnasioai.jpg",
        "alt": "Sesi materi Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/sesimateri2ioai.jpg",
        "alt": "Materi lanjutan di Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/laptopfullofcodingpelatnasioai.jpg",
        "alt": "Laptop penuh kode saat Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/uiroommeetingpelatnasioai.jpg",
        "alt": "Meeting room tempat belajar sampai malam."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/rmeetingpelatnasioai.jpg",
        "alt": "Suasana meeting room saat diskusi."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/testdaypelatnasioai.jpg",
        "alt": "Suasana test day Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/coffeewaitingroompelatnasioai.jpg",
        "alt": "Coffee break di waiting room Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/eatpelatnasioai.jpg",
        "alt": "Makan bersama saat Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/experiencepelatnasioaigame.jpg",
        "alt": "Momen main game setelah simulasi."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/refreshing-maimaipelatnasioai.jpg",
        "alt": "Momen refreshing setelah belajar."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/togetherpicturepelatnasioai.jpg",
        "alt": "Foto bersama peserta Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/picwithfriendspelatnasioai.jpg",
        "alt": "Foto bersama teman saat Pelatnas IOAI."
      },
      {
        "type": "video",
        "src": "./assets/images/pelatnas/ioai-ui-tahap-1/pengungumanpelatnasioaiketahap2.mp4",
        "alt": "Video pengumuman lolos ke tahap 2 Pelatnas IOAI."
      }
    ],
    "overview": "Bagian ini merupakan catatan saya tentang Pelatnas IOAI tahap 1 yang berlangsung offline selama dua minggu di UI. Saya mempelajari machine learning, teori matematika statistika, dan mulai masuk ke deep learning terutama untuk image. Simulasi pertama saya belum cukup untuk lolos, tetapi kegagalan itu mendorong saya belajar lebih serius, membuat catatan, dan memanfaatkan meeting room setiap malam sampai sekitar jam 12 untuk berdiskusi dan berlatih.",
    "tags": [
      "Pelatnas",
      "IOAI",
      "UI"
    ],
    "search": "pelatnas ioai ui tahap 1 machine learning stat deep learning meeting room top 6"
  },
  "ioai-ui-2": {
    "program": "Pelatnas",
    "title": "Pelatnas IOAI Tahap 2 — UI",
    "duration": "Tahap 2 IOAI",
    "focus": "APOAI, simulasi akhir, dan seleksi delegasi",
    "imageTitle": "Pelatnas IOAI tahap 2 di UI",
    "media": [
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-2/testdaypelatnasioaitahap2.jpg",
        "alt": "Suasana test day Pelatnas IOAI tahap 2."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-2/melolosioai.jpg",
        "alt": "Momen dinyatakan lolos sebagai delegasi."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-2/togetherpicturepelatnasioai.jpg",
        "alt": "Foto bersama saat rangkaian Pelatnas IOAI."
      },
      {
        "src": "./assets/images/pelatnas/ioai-ui-tahap-2/picwithfriendspelatnasioai.jpg",
        "alt": "Kebersamaan peserta pada tahap akhir pelatnas."
      }
    ],
    "overview": "Tahap 2 Pelatnas IOAI offline berlangsung lebih singkat karena ada masalah pendanaan dari pemerintah, jadi sesi offline-nya hanya sekitar empat hari. Sebelumnya saya mengikuti sesi online tentang CV, NLP, dan audio, sehingga tahap ini terasa lebih mendalam dalam implementasi deep learning. Dua hari pertama saya gunakan untuk latihan dan recap materi, lalu saya menghadapi APOAI dan simulasi akhir. Dari empat soal APOAI selama enam jam dan simulasi lima jam dengan kategori CV, NLP, dan audio, saya menjaga performa dengan baik. Nilai APOAI menempatkan saya di top 10 dari 125 peserta, sementara simulasi memberi saya rank 3 dari 8 orang. Hasil gabungan itu membuat saya mengamankan posisi IDN2 dan masuk ke gang of four sebagai delegasi Indonesia untuk IOAI.",
    "tags": [
      "Pelatnas",
      "IOAI",
      "IDN2"
    ],
    "search": "pelatnas ioai tahap 2 ui apoai cv nlp audio top 10 idn2 delegate"
  },
  "museum-macan": {
    "program": "Edutrip",
    "title": "Museum MACAN",
    "duration": "±4 jam",
    "focus": "Seni kontemporer dan opini pribadi",
    "imageTitle": "Dokumentasi Museum MACAN",
    "media": [
      {
        "src": "./assets/images/edutrip/museum-macan/macan.jpg",
        "alt": "Dokumentasi di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan2.jpg",
        "alt": "Karya dan ruang di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan3.jpg",
        "alt": "Dokumentasi edutrip di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan4.jpg",
        "alt": "Karya seni di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan5.jpg",
        "alt": "Sudut instalasi di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan6.jpg",
        "alt": "Karya seni dengan orientasi vertikal di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan7.jpg",
        "alt": "Ruang pamer Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan8.jpg",
        "alt": "Dokumentasi lain di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan9.jpg",
        "alt": "Instalasi vertikal di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan10.jpg",
        "alt": "Salah satu karya yang didokumentasikan di Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan11.jpg",
        "alt": "Suasana galeri Museum MACAN."
      },
      {
        "src": "./assets/images/edutrip/museum-macan/macan12.jpg",
        "alt": "Dokumentasi penutup dari Museum MACAN."
      },
      {
        "type": "video",
        "src": "./assets/images/edutrip/museum-macan/macanvideo.mp4",
        "alt": "Video singkat dokumentasi Museum MACAN."
      }
    ],
    "overview": "Sekarang Museum MACAN jadi salah satu bagian yang paling enak dieksplor karena dokumentasinya sudah jauh lebih lengkap. Menurut saya, tempat ini menarik bukan karena semua orang harus punya tafsir yang sama, tetapi justru karena karya-karyanya mendorong kita berhenti sejenak, melihat detail, lalu berani punya opini sendiri.",
    "tags": [
      "Edutrip",
      "Seni",
      "Opini"
    ],
    "search": "museum macan art gallery video"
  },
  "museum-kota-tua": {
    "program": "Edutrip",
    "title": "Kota Tua / Museum Kota Tua",
    "duration": "±4,5 jam",
    "focus": "Sejarah kota",
    "imageTitle": "Menyusuri Kota Tua",
    "media": [
      {
        "src": "./assets/images/edutrip/kota-tua/exploring.png",
        "alt": "Berjalan di area Kota Tua."
      },
      {
        "src": "./assets/images/edutrip/kota-tua/exploring-1.png",
        "alt": "Suasana eksplorasi di Kota Tua."
      },
      {
        "src": "./assets/images/edutrip/kota-tua/exploring-2.png",
        "alt": "Dokumentasi lain di Kota Tua."
      },
      {
        "src": "./assets/images/edutrip/kota-tua/painting.png",
        "alt": "Kegiatan atau karya lukis di area Kota Tua."
      }
    ],
    "overview": "Jalan-jalan di Kota Tua membuat sejarah terasa lebih hidup karena bukti-buktinya terlihat langsung. Saya suka bagian ini karena nuansanya membuat kota terasa punya lapisan cerita.",
    "tags": [
      "Edutrip",
      "Sejarah",
      "Kota"
    ],
    "search": "kota tua museum"
  },
  "tzu-chi": {
    "program": "Edutrip",
    "title": "Tzu Chi",
    "duration": "±3,5 jam",
    "focus": "Lingkungan dan pelayanan",
    "imageTitle": "Kegiatan di Tzu Chi",
    "media": [
      {
        "src": "./assets/images/edutrip/tzu-chi/plastic-bottle-work.png",
        "alt": "Kegiatan memilah botol plastik di Tzu Chi."
      },
      {
        "src": "./assets/images/edutrip/tzu-chi/plastic-bottle-result.png",
        "alt": "Hasil dari kegiatan botol plastik di Tzu Chi."
      },
      {
        "src": "./assets/images/edutrip/tzu-chi/group-finished-photo.png",
        "alt": "Foto penutup bersama setelah kegiatan Tzu Chi."
      }
    ],
    "overview": "Di Tzu Chi, kegiatan botol plastik membuat saya sadar bahwa peduli lingkungan itu terasa paling nyata saat dilakukan bersama-sama. Menurut saya, bagian ini sederhana tetapi justru membekas.",
    "tags": [
      "Edutrip",
      "Lingkungan",
      "Aksi"
    ],
    "search": "tzu chi plastic bottle"
  },
  "saaja": {
    "program": "Edutrip",
    "title": "SAAJA",
    "duration": "±5 jam",
    "focus": "Pelayanan, empati, dan belajar bersama anak-anak",
    "imageTitle": "Kegiatan bersama anak-anak di SAAJA",
    "media": [
      {
        "src": "./assets/images/edutrip/saaja/saaja-1.jpg",
        "alt": "Kegiatan bersama anak-anak di SAAJA dengan suasana kelas yang hangat."
      },
      {
        "src": "./assets/images/edutrip/saaja/saaja-2.jpg",
        "alt": "Dokumentasi lain saat kegiatan berlangsung di SAAJA."
      },
      {
        "src": "./assets/images/edutrip/saaja/saaja-3.jpg",
        "alt": "Interaksi dengan anak-anak di ruang belajar SAAJA."
      }
    ],
    "overview": "SAAJA menjadi salah satu bagian edutrip yang paling terasa manusiawi. Di tempat ini, pengalaman belajar tidak datang dari lomba atau kampus, tetapi dari interaksi langsung dengan anak-anak. Suasananya sederhana, ramai, dan hangat. Dari sini saya merasa bahwa pendidikan bukan hanya soal materi yang disampaikan, tetapi juga soal cara hadir, mendengar, dan membuat orang lain merasa diperhatikan.",
    "tags": [
      "Edutrip",
      "Pelayanan",
      "Empati"
    ],
    "search": "saaja community service children education teaching empathy"
  },
  "transportation": {
    "program": "Pendukung Perjalanan",
    "title": "Transportasi: bandara, pesawat, bus, dan MRT",
    "duration": "Sepanjang perjalanan",
    "focus": "Perpindahan dan ritme perjalanan",
    "imageTitle": "Transportasi selama perjalanan",
    "media": [
      {
        "src": "./assets/images/trip-support/transportation/bandarasbyosnai.jpg",
        "alt": "Suasana di bandara saat perjalanan OSN AI."
      },
      {
        "src": "./assets/images/trip-support/transportation/jakarta-airport-soekarno-hatta.jpeg",
        "alt": "Bandara Soekarno-Hatta."
      },
      {
        "src": "./assets/images/trip-support/transportation/in-front-of-plane.jpeg",
        "alt": "Berfoto di depan pesawat."
      },
      {
        "src": "./assets/images/trip-support/transportation/bus.jpeg",
        "alt": "Suasana di bus selama perjalanan."
      },
      {
        "src": "./assets/images/trip-support/transportation/bus-1.jpeg",
        "alt": "Dokumentasi lain di bus."
      },
      {
        "src": "./assets/images/trip-support/transportation/jakarta-mrt-transportation.png",
        "alt": "Perjalanan MRT Jakarta."
      },
      {
        "src": "./assets/images/trip-support/transportation/jakarta-mrt-1.png",
        "alt": "Dokumentasi MRT lain."
      }
    ],
    "overview": "Bagian transportasi sering terlihat sepele, padahal justru di sinilah ritme perjalanan terasa. Dari bandara, pesawat, bus, sampai MRT, semuanya ikut membentuk suasana sebelum dan sesudah kegiatan utama.",
    "tags": [
      "Transportasi",
      "Perjalanan",
      "Logistik"
    ],
    "search": "transportation airport bus mrt plane"
  },
  "accommodation": {
    "program": "Pendukung Perjalanan",
    "title": "Akomodasi: hotel dan tempat beristirahat",
    "duration": "Menginap",
    "focus": "Istirahat dan persiapan",
    "imageTitle": "Akomodasi selama kegiatan",
    "media": [
      {
        "src": "./assets/images/trip-support/accommodation/kapal-garden-hotel-osn.jpeg",
        "alt": "Foto kelompok di Kapal Garden Hotel saat OSN."
      },
      {
        "src": "./assets/images/trip-support/accommodation/hotel-lobby.jpeg",
        "alt": "Lobby hotel."
      },
      {
        "src": "./assets/images/trip-support/accommodation/hotel-inside.jpeg",
        "alt": "Bagian dalam hotel."
      },
      {
        "src": "./assets/images/trip-support/accommodation/outside-hotel.jpeg",
        "alt": "Bagian luar hotel."
      },
      {
        "src": "./assets/images/trip-support/accommodation/bogor-valley-hotel-resto.png",
        "alt": "Bogor Valley Hotel dan resto."
      }
    ],
    "overview": "Hotel dan tempat menginap saya taruh sebagai bagian penting karena justru di sinilah ada jeda, persiapan, dan obrolan santai yang tidak muncul di ruang lomba atau kelas.",
    "tags": [
      "Akomodasi",
      "Hotel",
      "Istirahat"
    ],
    "search": "hotel accommodation"
  },
  "meals": {
    "program": "Pendukung Perjalanan",
    "title": "Makan dan keseharian",
    "duration": "Setiap hari",
    "focus": "Energi, jeda, dan kebersamaan",
    "imageTitle": "Makan dan coffee break",
    "media": [
      {
        "src": "./assets/images/trip-support/meals/eatpelatnasioai.jpg",
        "alt": "Makan bersama saat Pelatnas IOAI."
      },
      {
        "src": "./assets/images/trip-support/meals/coffeewaitingroompelatnasioai.jpg",
        "alt": "Coffee break di waiting room Pelatnas IOAI."
      },
      {
        "src": "./assets/images/trip-support/meals/food.jpeg",
        "alt": "Makanan yang disajikan selama perjalanan."
      },
      {
        "src": "./assets/images/trip-support/meals/food-2.jpeg",
        "alt": "Dokumentasi makanan lain."
      },
      {
        "src": "./assets/images/trip-support/meals/food-3.jpeg",
        "alt": "Dokumentasi makanan selama kegiatan."
      },
      {
        "src": "./assets/images/trip-support/meals/food-in-mall-bogor.png",
        "alt": "Makanan di mall Bogor."
      }
    ],
    "overview": "Foto makanan dan coffee break mungkin kecil, tetapi justru bagian seperti ini yang membuat cerita terasa manusiawi. Di sela lomba, pelatnas, atau perjalanan, makan bersama sering jadi momen paling santai untuk bernapas sebentar.",
    "tags": [
      "Makan",
      "Keseharian",
      "Jeda"
    ],
    "search": "meals coffee break"
  },
  "documents": {
    "program": "Pendukung Perjalanan",
    "title": "Dokumen program dan ID card",
    "duration": "Sebelum / selama kegiatan",
    "focus": "Identitas dan bukti kegiatan",
    "imageTitle": "ID card dan dokumen",
    "media": [
      {
        "src": "./assets/images/trip-support/documents/id-card.jpeg",
        "alt": "ID card program dengan lanyard."
      }
    ],
    "overview": "Bagian dokumen hadir supaya keseluruhan perjalanan punya konteks yang jelas. ID card mungkin terlihat kecil, tetapi menurut saya penting karena menunjukkan bahwa kegiatan ini memang bagian dari program yang terorganisir.",
    "tags": [
      "Dokumen",
      "ID Card",
      "Bukti"
    ],
    "search": "id card document proof"
  }
};

  let lastFocusedElement = null;

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());


  function readFeedbackList() {
    try {
      const stored = localStorage.getItem(FEEDBACK_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveFeedback(entry) {
    const feedbackList = readFeedbackList();
    feedbackList.unshift(entry);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackList.slice(0, 30)));
  }

  function renderFeedbackPreview(entry) {
    if (!feedbackPreview || !entry) return;
    feedbackPreview.hidden = false;
    feedbackPreview.innerHTML = `
      <strong>Feedback terakhir:</strong>
      <span>${entry.topic} · ${entry.ratingLabel}</span>
      <p>“${entry.message}”</p>
      <small>Dikirim oleh ${entry.name}${entry.role ? ` — ${entry.role}` : ""}</small>
    `;
  }

  function handleFeedbackSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const ratingValue = formData.get("rating");
    const ratingOption = form.querySelector(`#feedback-rating option[value="${ratingValue}"]`);
    const entry = {
      name: String(formData.get("name") || "Pembaca").trim(),
      role: String(formData.get("role") || "").trim(),
      topic: String(formData.get("topic") || "Keseluruhan").trim(),
      rating: ratingValue,
      ratingLabel: ratingOption ? ratingOption.textContent : "Feedback",
      message: String(formData.get("message") || "").trim(),
      createdAt: new Date().toISOString()
    };

    saveFeedback(entry);
    renderFeedbackPreview(entry);
    if (feedbackStatus) {
      feedbackStatus.textContent = "Terima kasih, feedback sudah terkirim dan tersimpan di browser ini.";
      feedbackStatus.classList.add("is-success");
    }
    form.reset();
  }

  function authPageUrl() {
    return new URL("./index.html", window.location.href).href;
  }

  function readSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async function requireSession() {
    if (!client) {
      localStorage.removeItem(SESSION_KEY);
      window.location.replace(authPageUrl());
      return;
    }

    const { data, error } = await client.auth.getSession();
    if (error || !data?.session) {
      localStorage.removeItem(SESSION_KEY);
      window.location.replace(authPageUrl());
      return;
    }

    const user = data.session.user;
    let displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "pembaca";

    try {
      const { data: profile } = await client
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.display_name) displayName = profile.display_name;
    } catch (error) {
      console.info("Profil tidak tersedia, memakai nama dari akun.");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email: user.email,
      displayName,
      signedInAt: new Date().toISOString(),
      provider: "supabase"
    }));

    if (greeting) greeting.textContent = `Halo, ${displayName}`;
  }

  function renderMedia(detail) {
    const items = detail.media || detail.images || [];
    if (!modalMedia) return;

    const renderItem = (item, large = false) => {
      if (item.type === "video") {
        return `<video class="${large ? "modal-photo" : "gallery-video"}" src="${item.src}" controls playsinline preload="metadata"></video>`;
      }
      return `<img class="${large ? "photo-cover modal-photo" : ""}" src="${item.src}" alt="${item.alt || detail.title}" ${large ? "" : 'loading="lazy"'}>`;
    };

    if (items.length > 0) {
      const first = items[0];
      modalMedia.classList.remove("media-placeholder");
      modalMedia.classList.add("photo-frame");
      modalMedia.removeAttribute("role");
      modalMedia.innerHTML = renderItem(first, true);
    } else {
      modalMedia.classList.add("media-placeholder");
      modalMedia.classList.remove("photo-frame");
      modalMedia.setAttribute("role", "img");
      modalMedia.innerHTML = `
        <div class="placeholder-label">
          <span>FOTO BELUM ADA</span>
          <strong>${detail.imageTitle || detail.title}</strong>
          <small>Dokumentasi belum tersedia</small>
        </div>`;
    }

    if (!modalGallery) return;
    modalGallery.innerHTML = "";
    modalGallery.hidden = items.length <= 1;
    items.slice(1).forEach((item) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-photo";
      figure.innerHTML = item.type === "video"
        ? `<video class="gallery-video" src="${item.src}" controls playsinline preload="metadata"></video>`
        : `<img src="${item.src}" alt="${item.alt || detail.title}" loading="lazy">`;
      modalGallery.append(figure);
    });
  }

  function openDestination(placeKey) {
    const detail = destinationDetails[placeKey];
    if (!detail || !modal) return;

    lastFocusedElement = document.activeElement;

    modalProgram.textContent = detail.program;
    modalTitle.textContent = detail.title;
    modalDuration.textContent = detail.duration;
    modalFocus.textContent = detail.focus;
    modalOverview.textContent = detail.overview;
    renderMedia(detail);

    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    modalCard?.scrollTo({ top: 0, behavior: "auto" });
    modal.querySelector(".modal-close")?.focus();
  }

  function closeDestination() {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  signOutButton?.addEventListener("click", async () => {
    signOutButton.disabled = true;
    signOutButton.textContent = "Keluar…";

    try {
      if (client) await client.auth.signOut({ scope: "local" });
    } catch (error) {
      console.warn("Supabase sign out failed:", error);
    }

    localStorage.removeItem(SESSION_KEY);
    window.location.replace(authPageUrl());
  });

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    if (!query) {
      storyCards.forEach((card) => { card.hidden = false; });
      document.querySelectorAll(".story-category").forEach((section) => { section.hidden = false; });
      searchStatus.textContent = "Kolom pencarian sudah aktif. Ketik lokasi, program, atau kata kunci untuk memfilter cerita di halaman ini.";
      return;
    }

    let matches = 0;
    storyCards.forEach((card) => {
      const placeKey = card.dataset.place;
      const detail = placeKey ? destinationDetails[placeKey] : null;
      const detailText = detail ? Object.values(detail).flat(3).join(" ") : "";
      const searchableText = `${card.dataset.search || ""} ${card.textContent} ${detailText}`.toLowerCase();
      const visible = searchableText.includes(query);
      card.hidden = !visible;
      if (visible) matches += 1;
    });

    document.querySelectorAll(".story-category").forEach((section) => {
      const visibleCards = section.querySelectorAll(".story-card:not([hidden])").length;
      section.hidden = visibleCards === 0;
    });

    searchStatus.textContent = `Ditemukan ${matches} kartu untuk “${rawQuery.trim()}”`;
    document.querySelector("#stories-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
  });

  searchInput?.addEventListener("search", () => runSearch(searchInput.value));

  feedbackForm?.addEventListener("submit", handleFeedbackSubmit);

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navigation?.classList.toggle("is-open", !open);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    const closeTrigger = event.target.closest("[data-modal-close]");
    if (closeTrigger) {
      closeDestination();
      return;
    }

    const trigger = event.target.closest(".destination-card, .destination-timeline-item, .detail-button");
    if (!trigger) return;

    const placeKey = trigger.dataset.place;
    if (!placeKey) return;

    event.preventDefault();
    openDestination(placeKey);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDestination();
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") return;

    const trigger = event.target.closest(".destination-card, .destination-timeline-item");
    if (!trigger || event.target.matches("button, a, input, textarea, select")) return;

    event.preventDefault();
    openDestination(trigger.dataset.place);
  });

  requireSession();
})();
