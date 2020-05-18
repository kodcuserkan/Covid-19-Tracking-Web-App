import Head from 'next/head';
import Who from '../components/who'

export default function Home() {
  return (
    <div className="container">
      <Head className="header">
        <title className="title-header">Covid-19 Tracking App</title>
      </Head>

      <main className="main">
       <div className="div-1">
          <h3 className="title">
            Welcome to COVID-19 Tracking App
          </h3>
       </div> 
       <div className="div-2">
         <Who className="drop-down" />
       </div>    
      </main>

    </div>
  )
}
