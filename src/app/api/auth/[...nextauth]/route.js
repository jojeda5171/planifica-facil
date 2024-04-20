import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/db"



export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password", placeholder: "*****" },
        },
        async authorize(credentials, req) {
          console.log("Credentials: ",credentials);

          const userFound = await prisma.usuario.findUnique({
            where: {
                email: credentials.email,
                password: credentials.password
            }
          })
  
          console.log("Usuario encontrado: ",userFound);
          
          if (!userFound) throw new Error("Usuario no encontrado!");
          
          //const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
  
          //if (!matchPassword) throw new Error('Wrong password')
  
          return userFound;
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
    }
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };
  