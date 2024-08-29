import { Helmet } from 'react-helmet';

function Home(){

    return(
        <>
         <Helmet>
          <title>{`Stock and Fin - Stock Analytics, Screender, and more`}</title>
          <meta name="description" content={`Stock and Fin - Stock Analytics, Screender, and more`} />
        </Helmet>
        <main>
        <h1>Home</h1>
        </main>
         
        </>
    )

}

export default Home;