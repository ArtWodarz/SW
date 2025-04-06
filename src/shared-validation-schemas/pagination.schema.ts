import { z } from 'zod';

export const limit = z.number().min(0).max(200).default(50);
export const offset = z.number().min(0).default(0);
