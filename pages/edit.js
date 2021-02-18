import { useUser } from '@auth0/nextjs-auth0'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import Nav from '../components/nav'

export default function Edit({pageTitle}) {

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [loadingCondition, setLoadingCondition] = useState(true)

    const {user} = useUser()

    const router = useRouter()

    const md = new MarkdownIt({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                     hljs.highlight(lang, str, true).value +
                     '</code></pre>';
            } catch (err) {console.log(err)}
          }
      
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
      });

    async function getCard(name){
      try {
          const res = await fetch('/api/readSingle', {
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id: pageTitle})
          })
          let data = await res.json()
          console.log("data:", data)
          console.log("pageTitle: ", pageTitle)
          data.card.user === name && (setTitle(data.card.title), setNote(data.card.note))
          setLoadingCondition(false)
      } catch(error) {
          console.log("the card error is:", error)
      }
    }

    user && loadingCondition && getCard(user.name)


    async function createCard(event){
        const res = await fetch('/api/updateSingle', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                note: note,
                user: user.name,
                id: pageTitle
            })
        })
        console.log({
            title: title,
            note: note,
            user: user.name
        })
        event.preventDefault()
        router.push('/')
    }

    return (
        <>
            <Nav />
            <div id="createCard">
                <input value={title} onChange={event => setTitle(event.target.value)} id="createtopic" type="text" placeholder="title" name="title" />
                <textarea value={note} onChange={event => setNote(event.target.value)} id="createnote" type="text" placeholder="note" name="note"></textarea>
                <div dangerouslySetInnerHTML={{__html: md.render(note)}} id="noteOutput"></div>
                <button onClick={createCard} type="submit" id="submit" class="btn btn-primary">Submit</button>
            </div>
            
        </>
    )
}

export async function getServerSideProps(context){

    return {
        props: {
            pageTitle: context.query.title
        }
    }
}