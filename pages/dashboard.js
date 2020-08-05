import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllElectionsData } from '../lib/elections';
import Link from 'next/link'

export default function Home({ elections }) {
  return (
    <Layout home>
      <Head>Main Page</Head>
      <ul className={utilStyles.list}>
        {elections.map(({ id, title, voteOpen, voteClose }) => (
          <li className={utilStyles.listItem} key={id}>
            {voteOpen > Date.now() ? 
              "Inactive" : (Date.now > voteClose ? 
              "Closed" :
              "Inactive")}
            <h3><Link href="/elections/[id]" as={`/elections/${id}`}><a>{title}</a></Link></h3>
            <p>{id}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps() {
  const elections = await getAllElectionsData();

  return {
    props: {
      elections
    }
  }
}
