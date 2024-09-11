/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly jwtService: JWTService) {
//     super(
//       {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         passReqToCallback: true,
//         secretOrKey: process.env.SECRETORKEY,
//       },
//       // async (req, payload, next) => await this.verify(req, payload, next),
//     );
//     // passport.use(this);
//   }

//   public async validate(payload: any, req: any, done) {
//     const user = await this.jwtService.validateUser(req);
//     if (!user) {
//       return done(new UnauthorizedException(), false);
//     }
//     done(null, user);
//   }
// }
