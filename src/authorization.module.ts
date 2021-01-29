import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Auth0Config } from './dto/auth0.config';

@Module({})
export class AuthorizationModule {
    static register(auth0Config: Auth0Config): DynamicModule {
        return {
            module: AuthorizationModule,
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            providers: [
                {
                    provide: 'AUTH0_CONFIG',
                    useValue: auth0Config,
                },
                JwtStrategy,
            ],
            exports: [PassportModule, JwtStrategy],
        };
    }
}
