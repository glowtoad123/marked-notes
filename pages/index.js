import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Nav from '../components/nav'
import styles from '../styles/Home.module.css'
import Minicard from '../components/card'

export default function Home() {

  const {user, error, isLoading} = useUser()
  const [cards, setCards] = useState()


  async function getCards(id){
    try {
      const res = await fetch("/api/read", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: id})
      })
      let data = await res.json()
      setCards(data)
      console.log("data", data)
    }
    catch(error) {
      console.log({error: error, user: user})
    }
  }

  useEffect(() => {
    user && getCards(user.name)
    console.log('cards:', cards)
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>



  /* console.log("emailSH", emailSH) */
  
  return (
    <div className={styles.container}>
      <Nav />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user && <p>Welcome {user.name}! <a style={{color: 'blue'}} href="/api/auth/logout">Logout</a></p>}
        <div id="cardHolder">{cards && cards.cards.map(card => <Minicard id={card._id} title={card.title} note={card.note} />)}</div>
        <a href="/api/auth/login">Login</a>
        
      </main>
    </div>
  )
}


/* export async function getStaticProps(){

  const emailServerHost = process.env.EMAIL_SERVER_USER

  return {
    props: {
      emailSH: emailServerHost
    },
  }
} */