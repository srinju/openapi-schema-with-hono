import {OpenAPIHono, z} from '@hono/zod-openapi';
//we can import the inputs and outputs from the external files , we did that in ordfer for the open api schema to be made

import { createRoute } from '@hono/zod-openapi';
import { paramsSchema } from './inputs';
import { userSchema } from './outputs';
import { swaggerUI } from '@hono/swagger-ui';

//so basically we are writting our routes like this and we are descriping the inputs and outputs like that , so that the openapi schema can be generated 
//adding the swaager ui library to make the api info page 
//usually we use a language like rust to make backends where the making of the openapi schema files are fairly easy
//so that we dont have to write this complicated way of writting routes 

const app = new OpenAPIHono();

const getUserRoute = createRoute({
  method : 'get',
  path : '/user/{id}',
  request : {
    params : paramsSchema
  },
  responses : {
    200 : {
      content : {
        'application/json' : {
          schema : userSchema
        }
      },
      description : "Get the users details"
    }
  }
});

const PostUserRoute = createRoute({
  method : 'post',
  path : '/user/{id}',
  request : {
    params : paramsSchema
  },
  responses : {
    200 : {
      content : {
        'application/json' : {
          schema : userSchema
        }
      },
      description : "Get the users details"
    }
  }
});

app.openapi(getUserRoute , (c) => {
  const {id} = c.req.valid("param");
  return c.json({
    id,
    age : 20,
    name : 'Ultra - man'
  })
});

app.openapi(PostUserRoute , (c) => {
  const {id} = c.req.valid("param");
  return c.json({
    id,
    age : 20,
    name : 'Ultra - man'
  })
});

app.doc('/doc' , {
  openapi : '3.0.0',
  info : {
    version : '1.0.0',
    title : 'MY API'
  }
});

app.get('/ui' , swaggerUI({url : '/doc'}));

//so when we visit the /doc route we see our open api schema there

export default app;
