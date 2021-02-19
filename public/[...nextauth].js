`import 'mongodb'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.Email({
            /* server: {
                port: 587,
                host: 'smtp.office365.com',
                secure: true,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                },
            }, */
            server: process.env.EMAIL_SERVER,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              },
            from: process.env.EMAIL_FROM,
        })
    ],
    databse: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options)`