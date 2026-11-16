import { readJSON, writeJSON } from '../utils/storage'
import { DEFAULT_PROFILE } from '../config/profile'

const KEY = 'studyflow_profile_v1'

const profileService = {
  get() {
    return { ...DEFAULT_PROFILE, ...readJSON(KEY, {}) }
  },
  save(profile) {
    const data = { ...DEFAULT_PROFILE, ...profile }
    const ok = writeJSON(KEY, data)
    return ok ? { success: true, data } : { success: false, message: 'Gagal menyimpan profil.' }
  },
  reset() {
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* abaikan */
    }
    return { ...DEFAULT_PROFILE }
  },
}

export default profileService
