import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    // https://next-auth.js.org/v3/configuration/providers#using-a-custom-provider
    {
      id: 'cloudinary',
      name: 'Cloudinary',
      type: 'oauth',
      authorization: 'https://oauth.cloudinary.com/oauth2/auth',
      token: 'https://oauth.cloudinary.com/oauth2/token',
      userinfo: 'https://oauth.cloudinary.com/userinfo',
      profile(profile) {
        console.log('profile', profile)
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: null
        }
      },
      clientId: process.env.CLOUDINARY_CLIENT_ID,
      clientSecret: process.env.CLOUDINARY_CLIENT_SECRET
    },
  ],
})