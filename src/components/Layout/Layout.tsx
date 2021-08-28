import React, { PropsWithChildren } from "react";
import "./Layout.css";
import useSearch from "./../../components/Search/useSearch";
import Search from "./../../components/Search/Search";

export interface ILayoutProps {
  defaultPageTitle: string;
}

export default function Layout({ children, defaultPageTitle }: PropsWithChildren<ILayoutProps>) {

  const searchProps = useSearch();


  return (
    <>
      <div className="header">
        <h1 className="h1">{defaultPageTitle}</h1>
      </div>
      <div className="search">
        <Search {...searchProps} />
      </div>
      <div>
        {children}
      </div>
    </>
  )
}