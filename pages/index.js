import { Inter } from "next/font/google";
import apolloClient from "@/src/setup/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ projects }) => {
  return (
    <ul>
      {projects.nodes.map(({ name, description, id, fullPath }) => (
        <li key={id}>
          <p>
            <strong>{name}</strong>
          </p>
          {description && <span>{description}</span>}
          <div>
            <Link href={`/project/${fullPath}`}>Details</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

const PROJECTS_QUERY = gql`
  query {
    projects(first: 10) {
      nodes {
        id
        name
        description
        fullPath
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

export default Home;
