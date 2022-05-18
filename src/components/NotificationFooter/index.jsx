import Link from "next/link";
import React from "react";

export const NotificationFooter = () => (
  <div>
    <small>
      Aktiviranjem obaveštenja, slažete sa FlatMe{" "}
      <Link href="/terms-and-conditions" passHref>
        <a target="_blank" rel="noopener noreferrer">
          Uslovima korišćenja
        </a>
      </Link>{" "}
      i{" "}
      <Link href="/privacy-policy" passHref>
        <a target="_blank" rel="noopener noreferrer">
          Politikom privatnosti
        </a>
      </Link>
      .
    </small>
  </div>
);
