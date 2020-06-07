import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const exist = this.findOne({ username })

    if (exist) {
      //
    }

    const user = new User()

    user.username = username
    user.password = password

    try {
      await user.save()

    } catch (error) {
      if (error.code == "23505") {
        throw new ConflictException("Username is already exists!")
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}