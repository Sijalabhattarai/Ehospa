import NextAuth from 'next-auth/next';
// import Providers from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_NEXTAUTHSECRET,
  providers: [
    GoogleProvider({
      clientId: '498599588472-udm7s16pedts3t4nkaenfue1h7t1k0rv.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    FacebookProvider({
      clientId: '',
      clientSecret: '',
    }),
  ],
  // redirect after login
  callbacks: "/auth",


});
