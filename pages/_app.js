import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import 'highlight.js/styles/atelier-forest-light.css'
import { createStore } from 'redux'
import allReducers from '../reducers'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {

  const store = createStore(allReducers)

  return (
    <Provider store={store}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  )
  {/*     <Provider session={pageProps.session}> */}
{/*     </Provider> */}
    
}

export default MyApp

  /* import { Provider } from 'next-auth/client' */