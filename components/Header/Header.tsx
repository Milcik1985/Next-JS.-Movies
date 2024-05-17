import React from "react";
import styles from "./Header.module.css";
import { links } from "../../constance/links";

type LinkType = {
  id: number;
  title: string;
  href: string;
};

type HeaderProps = {
  links: LinkType[];
};

const Header = ({ links }: HeaderProps) => {
  return (
    <div className={styles.main}>
      <h1 className={styles.headerName}>Best Movie Recommendations Site</h1>
      <nav>
        <ul className={styles.links}>
          {links.map((link) => {
            return (
              <a href={link.href} key={link.id}>
                {link.title}
              </a>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
