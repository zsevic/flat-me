import Head from "next/head";
import React, { useRef, useState } from "react";
import { ApartmentList } from "components/ApartmentList";
import { FiltersForm } from "components/FiltersForm";
import { Header } from "components/Header";

React.useLayoutEffect = React.useEffect;

const IndexPage = () => {
  const [apartmentList, setApartmentList] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [total, setTotal] = useState(null);
  const listRef = useRef();

  return (
    <div>
      <Head>
        <title>FlatMe</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Header />
      <FiltersForm
        setApartmentList={setApartmentList}
        setIsLoadingApartmentList={setIsLoadingApartmentList}
        setFilters={setFilters}
        setTotal={setTotal}
        listRef={listRef}
      />
      {total !== null && (
        <ApartmentList
          apartmentList={apartmentList}
          setApartmentList={setApartmentList}
          isLoadingApartmentList={isLoadingApartmentList}
          setIsLoadingApartmentList={setIsLoadingApartmentList}
          filters={filters}
          listRef={listRef}
          total={total}
        />
      )}
    </div>
  );
};

export default IndexPage;
