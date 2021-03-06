import React from "react"
import { Link } from "gatsby"
import { TypographyStyle } from "react-typography"

import { default as typography, rhythm, scale } from "./typography"

const Layout = ({ location, title, author, children }) => {
  const rootPath = `${__PATH_PREFIX__}/blog/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        {title}
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link to={`/blog/`}>{title}</Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <TypographyStyle typography={typography} />
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, {author}{" "}
      </footer>
    </div>
  )
}

export default Layout
