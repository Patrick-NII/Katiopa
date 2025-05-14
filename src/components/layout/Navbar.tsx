import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

const router = useRouter();
const menuItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Apprentissage', href: '/apprentissage' },
  { label: 'Jeux', href: '/jeux' },
  { label: 'Espace personnel', href: `${router.basePath}${ROUTES.PERSONAL_SPACE}` },
]; 