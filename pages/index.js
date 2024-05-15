import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import apolloClient from "@/src/setup/apolloClient";
import { gql } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ projects }) => {
  return (
    <ul>
      {projects.nodes.map(({ name, description, id }) => (
        <li key={id}>
          <p>
            <strong>{name}</strong>
          </p>
          {description && <span>{description}</span>}
        </li>
      ))}
    </ul>
  );
};

// export default function Home({ buildTimestamp }) {
//   // export default function Home() {
//   // return <p>Hello From my next.js app!</p>;
//   return <p>Hello From my next.js app! App built at: {buildTimestamp}</p>;
// }

const PROJECTS_QUERY = gql`
  query {
    projects(first: 10) {
      nodes {
        id
        name
        description
      }
    }
  }
`;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: PROJECTS_QUERY,
  });

  return {
    props: {
      projects: data.projects,
    },
  };
};
// export const getStaticProps = () => {
//   return {
//     props: {
//       buildTimestamp: Date.now(),
//       // buildTimestamp: "test",
//     },
//   };
// };

export default Home;
