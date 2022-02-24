import NextAuth from 'next-auth';
import { Cloudinary } from 'nextauth-cloudinary-provider';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    Cloudinary({
      clientId: process.env.CLOUDINARY_CLIENT_ID,
      clientSecret: process.env.CLOUDINARY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if ( !account || !account.provider ) return token;

      if ( !token[account.provider] ) {
        token[account.provider] = {};
      }

      token[account.provider].accessToken = account.access_token;

      return token;
    }
  }
})