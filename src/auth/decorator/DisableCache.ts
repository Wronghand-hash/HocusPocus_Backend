/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const NoCache = () => SetMetadata('ignoreCaching', true);
