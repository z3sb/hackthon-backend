import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "../config/orm.config";
import { UserModule } from './user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "../config/jwt.config";
import { VideoModule } from './video/video.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: "1d"},
      global: true
    }),
    UserModule,
    VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule{
}
