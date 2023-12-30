// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'at-secret',
//     });
//   }

//   validate(payload: any) {
//     return payload;
//   }
// }
