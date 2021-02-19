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
  const newPageLoadingState = useSelector(state => state.newPage)

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
        {!user && <div style={{textAlign: 'center', padding: '10px', width: '80%', backgroundColor: '#F5F5F5', boxShadow: 'rgb(0 0 0 / 25%) 4px 4px 4px'}}><h1 id="getStarted">
          Have no study notes? Press the
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
            </path>
          </svg> 
          Icon to Sign in or signup if you do not have an account. If You are SignedIn press the
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z">
            </path>
          </svg>
          Icon to create a study note. To logout, press the 
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
            </path>
          </svg> 
          Icon again.
          </h1>
          </div>
        }
        {loadingCondition && <div style={{position: 'fixed', top: '0', width: '-webkit-fill-available' || '-moz-available'}}><LinearProgress /></div>}
        {newPageLoadingState && <div style={{position: 'fixed', top: '0', width: '-webkit-fill-available' || '-moz-available'}}><LinearProgress /></div>}
        {user && <p style={{backgroundColor: '#253855', fontSize: '32px', position: 'fixed', top: '0', marginTop: '0', color: '#F5F5F5', width: 'max-content', padding: '10px', borderRadius: '12px'}}>Here are your notes {user.name}!</p>}
        {user && cards && cards.cards.length === 0 && <div style={{textAlign: 'center', padding: '10px', width: '80%', backgroundColor: '#F5F5F5', boxShadow: 'rgb(0 0 0 / 25%) 4px 4px 4px'}}><h1 id="getStarted">
          Have no study notes? Press the 
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z">
            </path>
          </svg>
          Icon to create a study note. To logout, press the 
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
            </path>
          </svg> 
          Icon again.
          </h1>
          </div>}
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