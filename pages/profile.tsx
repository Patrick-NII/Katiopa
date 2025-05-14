import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    redirect: {
      destination: `${basePath}/espace-personnel`,
      permanent: true,
    },
  };
};

export default function ProfileRedirect() {
  return null;
} 