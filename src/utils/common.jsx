import { Button, Space } from "antd";
import Link from "next/link";
import React from "react";
import { DOMAIN_URL } from "constants/config";

export const rowGutter = { xs: 8, sm: 16, md: 24, lg: 32 };

const action = (
  <Space direction="vertical">
    <Button size="small" type="primary">
      <Link href={`${DOMAIN_URL}/app`} passHref>
        <a className="links">Pronađi stan</a>
      </Link>
    </Button>
  </Space>
);

export const commonProps = {
  showIcon: true,
  action,
};
