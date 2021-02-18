import { useUser } from '@auth0/nextjs-auth0'
import React, { useState } from 'react'
import {useRouter} from 'next/router'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import Nav from '../components/nav'

export default function create() {

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")

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


    async function createCard(event){
        const res = await fetch('/api/create', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                note: note,
                user: user.name
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
