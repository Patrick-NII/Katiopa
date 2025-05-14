// Liste des indices d'avatars disponibles
const AVAILABLE_AVATAR_INDICES = [
  6, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
  45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57, 58, 59
];

// Fonction pour obtenir un avatar aléatoire
export function getRandomAvatar(): string {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_AVATAR_INDICES.length);
  const avatarNumber = AVAILABLE_AVATAR_INDICES[randomIndex];
  return `/avatars/PlaygroundImage${avatarNumber}.png`;
}

// Fonction pour obtenir tous les avatars disponibles
export function getAllAvatars(): string[] {
  return AVAILABLE_AVATAR_INDICES.map(index => `/avatars/PlaygroundImage${index}.png`);
} 