import { PrismaClient } from '@prisma/client'

export const userSeed = async () => {
  const prisma = new PrismaClient()

  await prisma.user.create({
    data: {
      username: 'master',
      hashedPwd: '$2b$10$R.KRjTCXGbRTj2/fFj3u3.U/3MDwOKD1EYfHVMiNs2o3eK/xM87Wu',
      role: 'ADMIN',
    },
  })
  await prisma.user.create({
    data: {
      username: 'john_doe',
      hashedPwd: '$2b$10$vBMfy3be4cbZEBftgxDMM.nPyBUQ9xtVf9IKZGL1S1W2TbRE/i10S',
      role: 'USER',
    },
  })
}
