import React from "react";
import Header from "../components/Header/Header";
import { links } from "../constance/links";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import cookies from "js-cookie";
import CardsWrapper from "../components/CardsWrapper/CardsWrapper";
import { MovieType } from "../types/movie";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

type MainPageProps = {
  movies: MovieType[];
  status: number;
};

const Index = ({ movies, status }: MainPageProps) => {
  const router = useRouter();

  console.log("movies", movies);
  console.log(status);

  useEffect(() => {
    console.log(status);
    if (status === 401 && !cookies.get("jwt")) {
      router.push("/login");
    }
  }, [router, status]);

  return (
    <div className={styles.main}>
      <Header links={links} />
      {movies && <CardsWrapper movies={movies} />}
    </div>
  );
};

export default Index;

export async function getServerSideProps(ctx: any) {
  try {
    const jwtToken = cookies.get("jwt_token");
    console.log({ authorization: jwtToken });
    const headers = {
      authorization: getCookie("jwt_token", ctx),
    };

    console.log(headers);
    const response = await axios.get(`${process.env.SERVER_URL}/movies`, {
      headers,
    });

    console.log(response);
    return {
      props: {
        movies: response.data.movies,
        status: response.status,
      },
    };
  } catch (err) {
    return {
      props: {
        movies: [],
        //@ts-expect-error
        status: err.response.status ? err.response.status : 500,
      },
    };
  }
}

// 1. Pasiruošt prieš tai rašytą backent projektą. Tuo atveju jeigu projekto nėra ar projektas yra prastos kokybės - naudoti dėstytojo kurta projektą.
// 2. Susikurti naują Next.js projektą. Rinktis, kad būtu TS sintaksė.
// 3. Susikurti header komponentą, komponentui aprašyti tipą;
// 4. Apsirašyt login formą bei daryti kreipimasi į backend.
// 5. Sėkmingu prisijungimo atveju user turi būt perkeltas į kitą puslapį, nesekmingu - atvaizduojama error žinutė;

// 6. Formos buttonui pridėti loading state;
// 7. Sekmingo pisijungimo metu duomenys turi būt išsaugomi cookie'yje;
// 8. Pagrindiniame index js puslapy padaryt fetch bei parsisiūst visus duomenis, prieš pradedant siuntima nepaniršt authorization headers;
// 9. Error atveju suhandlint error'ą;
// 10. Sekmingai parsisiuntus duomenis atvaizduoti žaidimų korteles ekrane;

// 11. Neprisijungus bandant gauti item'us user turi būt nukreiptas į login funkciją;
// 12. Applikacija pritaikyt mobile versijai;
// 13. Paspaudus ant kortelės turi atsidaryt item puslapis;
// 14. Item puslapy - item galima ištrinti paspaudus ant delete mygtuko;
// 15. Suvienodit url;
// 16. EXTRA: pridėti main puslapiui SSR fetch

// 17. Sukurti Item puslpį, jame atvaizduot duomenis;
// 18. Pridėt ištrinimo mygtuką;
// 19.EXTRA: Prieš ištrinant turi atsirast modal'as kuris paklaustu ar tikrai norim ištrint item;
// 20. Sukurti game pridėjimo formą;

// 19. Prieš ištrinant turi atsirast modal'as kuris paklaustu ar tikrai norim ištrint item;
// 20. Mobile menu
// 21. Sukurti puslapio template;
