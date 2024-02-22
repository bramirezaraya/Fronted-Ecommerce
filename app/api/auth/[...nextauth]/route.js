import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
    providers: [
      CredentialsProvider({

        name: "Credentials",
        // datos que pido para el login.
        credentials: {
          email: { label: "email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },

        //logica para poder iniciar sesion, llamando al endpoint login del backend.
         async authorize(credentials, req) {
            try {
                const response = await axios.post(`http://localhost:4000/Login`, {
                  // envio los datos de las credentials
                    password: credentials.password,
                    email: credentials.email
                });
                
                // en caso que haya algun error, enviamos el mensaje del backend.
                if (response.data.success === 0) {
                    throw new Error(response.data.message);
                }
               
    
                // estos son los datos que se guardaran en las coockies.
                return {
                    id:response.data.user,
                    email: response.data.email,
                    name:response.data.name,
                    token: response.data.token
                }
            } catch (error) {
                throw new Error(error.response.data.message || error.message);
            }
          }
      }),
    ],
    // para que la pagina del inicio de sesion sea la indicada.
    pages:{
      signIn:'/Signin'
    },
    // para almacenar el token en la session.
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token = { ...token, ...user };
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token ;
        return session;
      },
    },
})

// exportamos con los distintos metodos post y get.
export {handler as POST, handler as GET}