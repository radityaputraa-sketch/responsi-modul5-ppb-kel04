import { apiClient } from '../config/api'

const LOCAL_QUOTES = [
  { quote: 'Mulai dari mana kamu berada, gunakan apa yang kamu punya, lakukan apa yang kamu bisa.', author: 'Arthur Ashe' },
  { quote: 'Cara terbaik untuk memulai adalah berhenti bicara dan mulai mengerjakan.', author: 'Walt Disney' },
  { quote: 'Tidak penting seberapa lambat kamu berjalan selama kamu tidak berhenti.', author: 'Konfusius' },
  { quote: 'Disiplin adalah jembatan antara tujuan dan pencapaian.', author: 'Jim Rohn' },
  { quote: 'Sedikit demi sedikit, lama-lama menjadi bukit.', author: 'Peribahasa' },
]

export const getLocalQuote = () => LOCAL_QUOTES[Math.floor(Math.random() * LOCAL_QUOTES.length)]

const quoteService = {
  // Ambil kutipan acak dari RESTful API (GET /quotes/random)
  async getRandom() {
    const data = await apiClient.get('/quotes/random')
    if (!data?.quote) throw { message: 'Respons API tidak valid.' }
    return { quote: data.quote, author: data.author || 'Anonim' }
  },
}

export default quoteService
