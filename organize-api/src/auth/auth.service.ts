import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OrganizerService } from "src/organizer/organizer.service";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/create-auth.input";
import { compareSync } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";

@Injectable()
export class AuthService {
  constructor(
    private readonly organnizer: OrganizerService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput): Promise<any> {
    const _user = await this.organnizer.findOne(loginInput?.username.toLowerCase());
    const _checkPassword = compareSync(loginInput?.password, _user?.password);

    if (!_checkPassword) {
      throw new UnauthorizedException();
    }

    const client = new GraphQLClient(`${process.env.CMS_ADMIN_GRAPHQL}`);
    const mutation = `
    mutation {
      login(loginInput:{
        username:"${process.env.BIGBANG_USERNAMEB}"
        password:"${process.env.BIGBANG_PASSWORD}"
      }) {
        access_token
      }
    }
    `;

    const _resultLogin: any = await client.request(mutation);
    const _resultUpdateCmsToken = await this.organnizer.updateToken(
      _user?.uuid,
      _resultLogin?.login?.access_token
    );

    const _data = {
      name: _user?.name,
      lastname: _user?.lastname,
      organize_uid: _user?.organize_uid,
    };
    const payload = { sub: _data, uuid: _user.uuid };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string): Promise<any> {
    const user = await this.organnizer.findOne(username);

    return user;
  }
}
