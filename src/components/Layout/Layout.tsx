import React, { PropsWithChildren } from "react";
import "./Layout.css";

export interface ILayoutProps {
  defaultPageTitle: string;
}

export default function Layout({ children, defaultPageTitle }: PropsWithChildren<ILayoutProps>) {
  return (
    <>
      <div className="header">
        <h1 className="h1">{defaultPageTitle}</h1>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}