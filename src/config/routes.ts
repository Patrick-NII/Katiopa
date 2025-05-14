export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SUBSCRIPTION: {
    PLANS: '/subscription/plans',
    CHECKOUT: '/subscription/checkout',
    SUCCESS: '/subscription/success',
    CANCEL: '/subscription/cancel',
  },
  LEARNING_POOL: {
    INDEX: '/apprentissage',
    PROGRESS: '/apprentissage/progression',
    COURSES: '/apprentissage/cours',
  },
  GAMES: {
    INDEX: '/jeux',
    CREATE: '/jeux/creer',
  },
  CREATE: {
    COURSE: '/creer/cours',
    GAME: '/creer/jeu',
  },
  PERSONAL_SPACE: '/espace-personnel',
  SETTINGS: '/parametres',
  SANDBOX: '/apprentissage', // Route pour le bac à sable
} as const;