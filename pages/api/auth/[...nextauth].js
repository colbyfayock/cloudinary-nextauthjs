import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  secret: process.env.SECRET,
  debug: true,
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
      wellKnown: 'https://oauth.cloudinary.com/.well-known/openid-configuration',
      authorization: { params: { scope: 'upload' } },
      idToken: false,
      checks: ['pkce', 'state'],
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
      clientSecret: process.env.CLOUDINARY_CLIENT_SECRET,
      client: {
        token_endpoint_auth_method: 'client_secret_post'
      }
    },
  ],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('fire signin Callback');
			return true;
		},
		async redirect({ url, baseUrl, ...rest }) {
      console.group('redirect');
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      console.log('rest', rest);
      console.groupEnd('redirect');
			return baseUrl;
		},
		async session({ session, user, token }) {
			console.log('fire SESSION Callback');
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log('fire jwt Callback');

			console.log({ token, user, account, profile, isNewUser });
			return token;
		},
	},
})