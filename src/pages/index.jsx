import { Divider } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { ApartmentList } from "components/ApartmentList";
import { FiltersForm } from "components/FiltersForm";

React.useLayoutEffect = React.useEffect;

const IndexPage = () => {
  const [apartmentList, setApartmentList] = useState([]);
  const [filters, setFilters] = useState({});
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Head>
        <title>FlatMe</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Divider orientation="left">FlatMe</Divider>
      <FiltersForm
        setApartmentList={setApartmentList}
        setFilters={setFilters}
        setTotal={setTotal}
      />
      {total > 0 && (
        <ApartmentList
          apartmentList={apartmentList}
          setApartmentList={setApartmentList}
          filters={filters}
          total={total}
        />
      )}
    </div>
  );
};

export default IndexPage;
