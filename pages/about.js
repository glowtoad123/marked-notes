import Link from 'next/link'
import React from 'react'
import styles from '../styles/about.module.css'

export default function About() {
    return (
        <div>
            <div className={styles.titleContainer}>
                <img className={styles.titlePic} src="/markednotes.svg" alt="markednotes icon" />
                <h1 className={styles.titleText}>Markednotes</h1>
            </div>
            <div className={styles.featureContainerContainer}>
                <div className={styles.featureContainer}>
                    <img className={styles.carouselPic} src="https://firebasestorage.googleapis.com/v0/b/studythat-1407a.appspot.com/o/creation.jpeg?alt=media&token=605570d9-7287-4776-b69a-054366f8b965" />
                    <p className={styles.description}>create study notes using markdown</p>
                </div>
                <Link href="/api/auth/login"><div className={styles.enter}><button className={styles.enterText}>Enter</button></div></Link>
            </div>

            <br />
            <br />

            <div className={styles.footerContainer}>
                <h1 className={styles.footerText}>Made using NextJS + MongoDB + Vercel</h1>
            </div>
        </div>
    )
}
