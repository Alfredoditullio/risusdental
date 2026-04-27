export interface SlideData {
  id: number
  label: string
  headlineTop: string
  headlineMiddle?: string   // optional third line → triggers stacked-left layout
  headlineBottom: string
  subtitle: string
  accentColor: string
  /** CSS gradient for the full background */
  bgGradient: string
  shape: 'tooth' | 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus' | 'none'
  ctaText: string
  /** Path to portrait photo — triggers photo-left / text-right layout */
  photo?: string
  /** Professional license number shown as floating badge on the photo */
  matricula?: string
  /** Long biography / body text shown below the name */
  bio?: string
}

export const WHATSAPP_URL =
  'https://wa.me/5491100000000?text=Hola!%20Quiero%20pedir%20un%20turno%20en%20Risus%20Dental'

export const slides: SlideData[] = [
  {
    id: 1,
    label: 'Inicio',
    headlineTop: 'ODONTOLOGIA',
    headlineMiddle: 'CON',
    headlineBottom: 'AMOR',
    subtitle: 'En niños, adolescentes y adultos\nAcompaño el desarrollo de tu sonrisa',
    accentColor: '#EC3B79',
    bgGradient:
      'linear-gradient(135deg, #1E8ED0 0%, #9B59B6 20%, #EC3B79 45%, #FAB0EA 65%, #F39C12 85%, #E6F020 100%)',
    shape: 'tooth',
    ctaText: 'PEDIR TURNO',
  },
  {
    id: 2,
    label: 'Sobre Mí',
    headlineTop: 'RODRIGO',
    headlineBottom: 'MELO',
    subtitle: 'Esp. en ortodoncia y estética facial',
    bio: 'Desde los 12 años supo que quería ser odontólogo. Criado en Zárate, se formó en la UBA y convirtió esa vocación temprana en una carrera construida con estudio, pasión y mucha sensibilidad. Realizó posgrados en Ortodoncia y en Estética Facial, y desarrolló Go Smile, su propia línea de alineadores. Trabaja con brackets convencionales, autoligado y tecnología de avanzada — siempre al servicio de una sonrisa que sea tuya de verdad.\n\nHoy es docente de Clínica en la UBA y en la Universidad Interamericana, porque cree que enseñar es también una forma de cuidar. En su tiempo libre lo encontrás sobre patines. Cree en las energías, en los vínculos y en que la salud empieza por sentirse escuchado. Su prioridad no es el diente: es la persona que lo tiene.',
    accentColor: '#1E8ED0',
    bgGradient:
      'linear-gradient(135deg, #FAB0EA 0%, #EC3B79 25%, #1E8ED0 50%, #6DD5FA 75%, #FAB0EA 100%)',
    shape: 'icosahedron',
    ctaText: 'PEDIR TURNO',
    photo: '/rodrigo.webp',
    matricula: 'M.N 111111',
  },
  {
    id: 3,
    label: 'Servicios',
    headlineTop: 'CADA',
    headlineBottom: 'DETALLE',
    subtitle:
      'Estetica dental. Ortodoncia. Limpieza. Blanqueamiento. Tratamientos personalizados para vos.',
    accentColor: '#FAB0EA',
    bgGradient:
      'linear-gradient(135deg, #E6F020 0%, #6DD5FA 20%, #FAB0EA 45%, #EC3B79 70%, #9B59B6 100%)',
    shape: 'none',
    ctaText: 'VER SERVICIOS',
  },
  {
    id: 4,
    label: 'Galería',
    headlineTop: 'GALERÍA',
    headlineBottom: '',
    subtitle: 'Sonrisas que transforman vidas.',
    accentColor: '#FAB0EA',
    bgGradient:
      'linear-gradient(135deg, #9B59B6 0%, #EC3B79 30%, #FAB0EA 55%, #1E8ED0 80%, #E4FC2D 100%)',
    shape: 'none',
    ctaText: 'PEDIR TURNO',
  },
  {
    id: 5,
    label: 'Proyectos',
    headlineTop: 'MIS',
    headlineBottom: 'PROYECTOS',
    subtitle: 'Marcas y comunidades que nacieron de la misma vocación.',
    accentColor: '#6DD5FA',
    bgGradient:
      'linear-gradient(135deg, #0f2a4a 0%, #1E8ED0 25%, #6DD5FA 50%, #9B59B6 75%, #EC3B79 100%)',
    shape: 'none',
    ctaText: 'VER MÁS',
  },
  {
    id: 6,
    label: 'Comunidad',
    // id stays 6 — array index is what matters for navigation
    headlineTop: 'LO DICEN',
    headlineBottom: 'ELLOS',
    subtitle: 'Reseñas reales, reels y la comunidad que nos eligió.',
    accentColor: '#9B59B6',
    bgGradient:
      'linear-gradient(135deg, #1a0533 0%, #2d1b69 25%, #1E8ED0 55%, #0f2a4a 80%, #1a0533 100%)',
    shape: 'none',
    ctaText: 'VER COMUNIDAD',
  },
  {
    id: 7,
    label: 'Contacto',
    headlineTop: 'TE',
    headlineBottom: 'ESPERO',
    subtitle:
      'Recoleta, Buenos Aires. Turnos por WhatsApp. Atendemos con obras sociales y prepagas.',
    accentColor: '#EC3B79',
    bgGradient:
      'linear-gradient(135deg, #EC3B79 0%, #FAB0EA 25%, #F39C12 50%, #E6F020 75%, #6DD5FA 100%)',
    shape: 'none',
    ctaText: 'PEDIR TURNO',
  },
]
