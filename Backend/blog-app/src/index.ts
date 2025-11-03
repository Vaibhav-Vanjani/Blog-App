// import { Hono } from 'hono';

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// app.post('/getBody',async (c)=>{
//   const body = await c.req.json();
//   return c.json({
//     success:true,
//     message:body,
//   })
// })

// app.post('/header',async (c) => {
//     const header = c.req.header();
//      return c.json({
//       success:true,
//       message:header["kdsjkdj"],
//     })
// })

// app.post('/signup',async (c) => {
//     const body =await c.req.json();

//     const isZodValidated = signupSchema.safeParse(body);
//     if(!isZodValidated.success){
//       return c.json({
//         success:false,
//         message: isZodValidated.error.issues[0],
//       },400);
//     }

//     // Role.any();

//     // const session = await account.listSessions();
//     // console.log("session",session); 
    
//     // await signup(body);
//     // const user = await account.get([userID:])/

//      return c.json(await account.createEmailPasswordSession({
//             email: body.email, 
//             password: body.password
//         }))
// })

// app.post('/login',async (c) => {
//     const body =await c.req.json();

//     const isZodValidated = signupSchema.safeParse(body);
//     if(!isZodValidated.success){
//       return c.json({
//         success:false,
//         message: isZodValidated.error.issues[0],
//       },400);
//     }

//     await signup(body);

//      return c.json({
//       success:true,
//       message:"Success"
//     })
// })

// export default app
