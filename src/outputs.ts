import {z} from '@hono/zod-openapi';

//output from the route
export const userSchema = z.object({
    name : z.string().min(1).max(20).openapi({
      example : "Srinjoy"
    }),
    age : z.number().int().openapi({
      example : 20
    }),
    id : z.string().min(1).max(10).openapi({
      example : '24'
    })
  })