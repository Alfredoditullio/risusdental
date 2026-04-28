import { useEffect } from 'react'

/**
 * Usado en las páginas de proyecto (/proyectos/*).
 * Desactiva overflow:hidden y cursor:none del slider global
 * mientras la página está montada, y los restaura al desmontar.
 */
export function useNormalPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('root')

    // Guardar valores anteriores
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevRootOverflow = root?.style.overflow ?? ''
    const prevBodyCursor   = body.style.cursor

    // Habilitar scroll y cursor normal
    html.style.overflow = 'auto'
    html.style.height   = 'auto'
    body.style.overflow = 'auto'
    body.style.height   = 'auto'
    body.style.cursor   = 'auto'
    if (root) {
      root.style.overflow = 'auto'
      root.style.height   = 'auto'
      root.style.cursor   = 'auto'
    }

    // Inyectar override de cursor para esta página
    const styleTag = document.createElement('style')
    styleTag.id = 'normal-page-cursor'
    styleTag.textContent = `
      .normal-page, .normal-page *, .normal-page *::before, .normal-page *::after {
        cursor: auto !important;
      }
      .normal-page a, .normal-page button { cursor: pointer !important; }
    `
    document.head.appendChild(styleTag)

    return () => {
      // Restaurar al volver al slider
      html.style.overflow = prevHtmlOverflow || 'hidden'
      html.style.height   = '100%'
      body.style.overflow = prevBodyOverflow || 'hidden'
      body.style.height   = '100%'
      body.style.cursor   = prevBodyCursor || ''
      if (root) {
        root.style.overflow = prevRootOverflow || 'hidden'
        root.style.height   = '100%'
        root.style.cursor   = ''
      }
      document.getElementById('normal-page-cursor')?.remove()
    }
  }, [])
}
