import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Nav from '../components/nav'
import styles from '../styles/Home.module.css'
import Minicard from '../components/card'
import { useSelector } from 'react-redux'
import { LinearProgress } from '@material-ui/core'

export default function Home() {

  const {user, error, isLoading} = useUser()
  const [cards, setCards] = useState()
  const [loadingCondition, setLoadingCondition] = useState(true)

  const selectedCard = useSelector(state => state.selection)

  console.log("user:", user)


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
      setLoadingCondition(false)
    }
    catch(error) {
      console.log({error: error, user: user})
    }
  }

  useEffect(() => {
    console.log('cards:', cards)
  }, [])
  user && loadingCondition && getCards(user.name)

  async function DeleteCard(){
    const res = await fetch('/api/deleteSingle', {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: selectedCard})
    })
    let deleted = await res.json()
    console.log("deleted:", deleted)
    user && getCards(user.name)
  }

  selectedCard && DeleteCard()

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
        {loadingCondition && <div style={{position: 'fixed', top: '0', width: '-webkit-fill-available' || '-moz-available'}}><LinearProgress /></div>}
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