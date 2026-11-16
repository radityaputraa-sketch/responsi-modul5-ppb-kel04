import { useState, useEffect } from 'react'
import { Download, WifiOff, X, CheckCircle2 } from 'lucide-react'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

// Banner status PWA: offline, tombol install, dan notifikasi "siap offline".
export default function PWABadge() {
  const online = useOnlineStatus()
  const [installPrompt, setInstallPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    const onInstalled = () => setInstallPrompt(null)
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  // Tampilkan info singkat saat service worker sudah aktif (app siap offline)
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let timer
    let cancelled = false
    const flagKey = 'studyflow_offline_ready_shown'
    navigator.serviceWorker.ready
      .then(() => {
        if (cancelled) return
        let shown = false
        try { shown = localStorage.getItem(flagKey) === '1' } catch { /* abaikan */ }
        if (!shown) {
          setOfflineReady(true)
          try { localStorage.setItem(flagKey, '1') } catch { /* abaikan */ }
          timer = setTimeout(() => setOfflineReady(false), 5000)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  if (!online) {
    return (
      <aside className="pwa-badge pwa-badge--offline" role="status" aria-live="polite">
        <WifiOff size={16} />
        <span>Mode offline. Semua data tugas tetap tersedia &amp; bisa diubah.</span>
      </aside>
    )
  }

  if (offlineReady) {
    return (
      <aside className="pwa-badge pwa-badge--ready" role="status" aria-live="polite">
        <CheckCircle2 size={16} />
        <span>Aplikasi siap dipakai offline.</span>
      </aside>
    )
  }

  if (installPrompt && !dismissed) {
    return (
      <aside className="pwa-badge" role="region" aria-label="Install aplikasi">
        <div className="pwa-badge-content">
          <Download size={16} />
          <span>Install <strong>StudyFlow</strong> ke perangkatmu.</span>
        </div>
        <div className="pwa-badge-actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={handleInstall}>Install</button>
          <button type="button" className="icon-btn" onClick={() => setDismissed(true)} aria-label="Tutup">
            <X size={14} />
          </button>
        </div>
      </aside>
    )
  }

  return null
}
