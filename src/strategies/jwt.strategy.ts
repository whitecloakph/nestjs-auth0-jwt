import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Auth0Config } from '../dto/auth0.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH0_CONFIG') config: Auth0Config) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.issuer}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config.audience,
            issuer: `${config.issuer}`,
            algorithms: ['RS256'],
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}
