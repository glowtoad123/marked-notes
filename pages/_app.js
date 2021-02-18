import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import 'highlight.js/styles/atelier-forest-light.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
  {/*     <Provider session={pageProps.session}> */}
{/*     </Provider> */}
    
}

export default MyApp

  /* import { Provider } from 'next-auth/client' */