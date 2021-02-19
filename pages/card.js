import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import { useUser } from '@auth0/nextjs-auth0'
import { LinearProgress } from '@material-ui/core'
import Nav from '../components/nav'


export default function Card({pageTitle}) {
    const [card, setCard] = useState('')
    const [loadingCondition, setLoadingCondition] = useState(true)
    const {user} = useUser()

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
            data.card.user === name && setCard(data.card)
            setLoadingCondition(false)
        } catch(error) {
            console.log("the card error is:", error)
        }
    }

    useEffect(() => {
        console.log("card", card)
        console.log("pageTitle:", pageTitle)
    }, [])
    
    user && loadingCondition && getCard(user.name)

    return (
        <>
        {loadingCondition && <div style={{position: 'fixed', top: '0', width: '-webkit-fill-available' || '-moz-available'}}><LinearProgress /></div>}
        <Nav />
        <center>
            <div className="bigCard">
                <h1 className="topic">{card.title}</h1>
                <hr />
                <input type="hidden" id="hiddennote" value={card.note} />
                {card && <div id="bigNote" className="note" dangerouslySetInnerHTML={{__html: md.render(card.note)}}></div>}
                <Link href={`/edit?title=${card._id}`}>
                  <svg className="edit" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </Link>
            </div>
        </center>
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
