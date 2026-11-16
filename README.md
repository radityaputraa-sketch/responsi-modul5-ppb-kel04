# StudyFlow - PWA Pelacak Tugas Kuliah (Responsi Modul 5 PPB)

Stack: React 18 + Vite + vite-plugin-pwa + Axios + lucide-react + localStorage, deploy ke Vercel.

## Halaman
| Hash | Halaman |
|------|---------|
| `#/` | Beranda (statistik, deadline terdekat, kutipan dari API via Axios) |
| `#/tugas` | **CRUD tugas** (tambah, lihat, ubah, hapus, cari, filter, urutkan) |
| `#/profil` | **Profil** (nama, NIM, kelompok) |
| `#/tentang` | Tentang aplikasi |

## WAJIB: isi nomor kelompok
Anggota kelompok sudah terisi di `src/config/profile.js`. Ganti nilai `kelompok` (mis. `Kelompok 5`) sesuai nomor kelompokmu.

## Menjalankan
```bash
npm install
npm run dev        # mode pengembangan
npm run build      # build produksi (menghasilkan sw.js + manifest)
npm run preview    # cek hasil build + PWA di http://localhost:4173
```

## Deploy ke Vercel
```bash
git init
git add .
git commit -m "responsi modul 5 ppb"
git branch -M main
git remote add origin <link-repo-github-kamu>
git push -u origin main
```
Lalu di vercel.com: Add New > Project > import repo > Deploy (preset Vite terdeteksi otomatis, tanpa env var).
