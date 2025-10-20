import bcrypt from "bcryptjs";

class UserModel {
  static async userExists(prisma, email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async createUser(prisma, email, password) {
    const hashedPassword = await this.hashPassword(password);
    return await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }
}

export default UserModel;