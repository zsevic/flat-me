import { Divider } from "antd";
import Link from "next/link";
import React from "react";

export const Header = () => (
  <Divider orientation="left">
    <Link href="/">
      <a>FlatMe</a>
    </Link>
  </Divider>
);
