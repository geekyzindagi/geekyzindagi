import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Check if super admin already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: Role.SUPER_ADMIN },
  });

  if (existingAdmin) {
    console.log('⚠️  Super admin already exists:', existingAdmin.email);
    return;
  }

  // Create super admin
  const hashedPassword = await bcrypt.hash('Admin@123!', 12);
  
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@geekyzindagi.com',
      name: 'Super Admin',
      password: hashedPassword,
      emailVerified: new Date(),
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Super admin created:', superAdmin.email);
  console.log('');
  console.log('🔐 Login credentials:');
  console.log('   Email: admin@geekyzindagi.com');
  console.log('   Password: Admin@123!');
  console.log('');
  console.log('⚠️  IMPORTANT: Change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
