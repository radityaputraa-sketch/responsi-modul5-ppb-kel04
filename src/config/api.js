import axios from 'axios'

// ---------------------------------------------------------------------------
// Axios instance - dipakai untuk mengambil kutipan motivasi (RESTful API publik).
// Jika offline / gagal, aplikasi otomatis memakai kutipan lokal (lihat quoteService).
// ---------------------------------------------------------------------------
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
})

// Response interceptor - unwrap data & normalisasi error
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'Terjadi kesalahan tak terduga'
    let status = null
    if (error.response) {
      status = error.response.status
      message = error.response.data?.message || `Server error (${status})`
    } else if (error.request) {
      message = 'Tidak dapat menjangkau server. Periksa koneksi internet.'
    } else {
      message = error.message || message
    }
    return Promise.reject({ message, status })
  },
)

export { apiClient, BASE_URL }
