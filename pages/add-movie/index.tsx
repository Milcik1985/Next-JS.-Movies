import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constance/links";
import Button from "@/components/Button/Button";
import cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./addMovie.module.css";

const Index = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const addMovie = async () => {
    try {
      const newMovie = {
        imageUrl: imageUrl,
        title: title,
        genre: genre,
        rating: rating,
      };

      console.log(newMovie);

      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/movies`,
        newMovie,
        {
          headers,
        }
      );

      console.log(response);

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const areAllfieldsFilled = imageUrl && title && genre && rating;

  return (
    <div className={styles.main}>
      <Header links={links} />
      <div className={styles.container}>
        <div className={styles.blurBackground}>
          <div className={styles.content}>
            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <Button
              className={`${
                areAllfieldsFilled ? styles.validBtn : styles.invalidBtn
              }`}
              isLoading={false}
              title="Add Movie"
              onClick={addMovie}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
