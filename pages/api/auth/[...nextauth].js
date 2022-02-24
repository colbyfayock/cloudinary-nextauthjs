import NextAuth from 'next-auth';

export default NextAuth({
  secret: process.env.SECRET,
  debug: true,
  providers: [
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
        return {
          id: profile.sid,
          email: profile.sub
        }
      },
      clientId: process.env.CLOUDINARY_CLIENT_ID,
      clientSecret: process.env.CLOUDINARY_CLIENT_SECRET,
      client: {
        // Cloudinary oAuth uses `client_secret_post` where Open ID by default uses client_secret_basic
        // https://github.com/panva/node-openid-client/blob/main/docs/README.md#new-clientmetadata-jwks-options
        token_endpoint_auth_method: 'client_secret_post'
      }
    },
  ],
  callbacks: {
    async jwt(token, user, account = {}, profile, isNewUser) {
      console.group('jwt');
      console.log('token', token);
      console.log('user', user);
      console.log('account', account);
      console.log('profile', profile);
      console.groupEnd('jwt');
      if ( account.provider && !token[account.provider] ) {
        token[account.provider] = {};
      }

      if ( account.accessToken ) {
        token[account.provider].accessToken = account.accessToken;
      }

      if ( account.refreshToken ) {
        token[account.provider].refreshToken = account.refreshToken;
      }

      return token;
    },
  }
})