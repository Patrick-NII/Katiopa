import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const testAccounts = [
  {
    email: 'free@test.com',
    password: 'Free123!',
    firstName: 'Thomas',
    lastName: 'Martin',
    planId: 'free',
    childAccounts: [
      {
        firstName: 'Lucas',
        lastName: 'Martin',
        dateOfBirth: new Date('2015-05-15'),
      }
    ]
  },
  {
    email: 'pro@test.com',
    password: 'Pro123!',
    firstName: 'Sophie',
    lastName: 'Dubois',
    planId: 'pro',
    childAccounts: [
      {
        firstName: 'Emma',
        lastName: 'Dubois',
        dateOfBirth: new Date('2016-03-20'),
      }
    ]
  },
  {
    email: 'proplus@test.com',
    password: 'ProPlus123!',
    firstName: 'Marc',
    lastName: 'Bernard',
    planId: 'pro_plus',
    childAccounts: [
      {
        firstName: 'Léa',
        lastName: 'Bernard',
        dateOfBirth: new Date('2014-08-10'),
      },
      {
        firstName: 'Hugo',
        lastName: 'Bernard',
        dateOfBirth: new Date('2016-11-25'),
      },
      {
        firstName: 'Julie',
        lastName: 'Bernard',
        dateOfBirth: new Date('2015-04-30'),
      }
    ]
  }
];

async function createTestAccounts() {
  console.log('🚀 Début de la création des comptes de test...');
  
  try {
    console.log('🗑️  Nettoyage de la base de données...');
    
    // Supprimer les données existantes
    await prisma.childAccount.deleteMany({});
    console.log('✅ Comptes enfants supprimés');
    
    await prisma.subscription.deleteMany({});
    console.log('✅ Abonnements supprimés');
    
    await prisma.user.deleteMany({});
    console.log('✅ Utilisateurs supprimés');

    console.log('🏗️  Création des nouveaux comptes...');

    // Créer les nouveaux comptes
    for (const account of testAccounts) {
      const { email, password, firstName, lastName, planId, childAccounts } = account;
      
      console.log(`\n👤 Création du compte pour ${firstName} ${lastName}...`);
      
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('✅ Mot de passe hashé');

      // Créer l'utilisateur avec son abonnement
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          subscription: {
            create: {
              planId,
              startDate: new Date(),
              isActive: true,
            }
          }
        }
      });
      console.log('✅ Utilisateur créé avec son abonnement');

      // Créer les comptes enfants associés
      console.log(`👶 Création de ${childAccounts.length} compte(s) enfant(s)...`);
      for (const child of childAccounts) {
        await prisma.childAccount.create({
          data: {
            ...child,
            parentId: user.id
          }
        });
      }
      console.log('✅ Comptes enfants créés');

      console.log('\n📝 Résumé du compte :');
      console.log(`Email: ${email}`);
      console.log(`Mot de passe: ${password}`);
      console.log(`Plan: ${planId}`);
      console.log(`Nombre de comptes enfants: ${childAccounts.length}`);
      console.log('-----------------------------------');
    }

    console.log('\n🎉 Tous les comptes de test ont été créés avec succès !');
    console.log('\nVous pouvez maintenant vous connecter avec :');
    console.log('FREE  - free@test.com / Free123!');
    console.log('PRO   - pro@test.com / Pro123!');
    console.log('PRO+  - proplus@test.com / ProPlus123!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des comptes :', error);
    throw error;
  } finally {
    console.log('\n👋 Déconnexion de la base de données...');
    await prisma.$disconnect();
  }
}

createTestAccounts()
  .catch((error) => {
    console.error('❌ Erreur fatale :', error);
    process.exit(1);
  }); 