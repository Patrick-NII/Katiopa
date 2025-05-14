import NextAuth, { DefaultSession, Session, User, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      subscription?: {
        planId: string;
        isActive: boolean;
      };
    } & DefaultSession['user']
  }
}

// Vérification des variables d'environnement
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

console.log('Vérification des variables d\'environnement:', requiredEnvVars);

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`La variable d'environnement ${key} est manquante`);
    throw new Error(`La variable d'environnement ${key} est manquante`);
  }
}

// Vérification de la connexion à la base de données
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Connexion à la base de données réussie');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw new Error('Impossible de se connecter à la base de données');
  }
}

checkDatabaseConnection();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Tentative de connexion avec les identifiants:', { email: credentials?.email });
          
          if (!credentials?.email || !credentials?.password) {
            console.error('Email ou mot de passe manquant');
            throw new Error("Veuillez entrer votre email et votre mot de passe");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          console.log('Utilisateur trouvé:', user ? 'Oui' : 'Non');

          if (!user) {
            console.error('Utilisateur non trouvé');
            throw new Error("Aucun utilisateur trouvé avec cet email");
          }

          if (!user.password) {
            console.error('Mot de passe manquant dans la base de données');
            throw new Error("Erreur de configuration du compte");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log('Mot de passe valide:', isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Erreur lors de l\'autorisation:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (!token.subscription) {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: { subscription: true }
          });
          if (dbUser?.subscription) {
            token.subscription = {
              planId: dbUser.subscription.planId,
              isActive: dbUser.subscription.isActive
            };
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.subscription) {
          session.user.subscription = token.subscription as {
            planId: string;
            isActive: boolean;
          };
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('Tentative de connexion:', { 
          user: user?.email, 
          account: account?.type, 
          profile: profile?.email 
        });
        
        if (account?.type === 'credentials') {
          return true;
        }
        
        if (!profile?.email) {
          console.error('Email manquant dans le profil');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  debug: false,
  events: {
    async signIn({ user }) {
      console.log('Utilisateur connecté:', user.email);
    },
    async signOut({ token }) {
      console.log('Utilisateur déconnecté:', token.email);
    },
    async createUser({ user }) {
      console.log('Nouvel utilisateur créé:', user.email);
    }
  }
};

export default NextAuth(authOptions); 