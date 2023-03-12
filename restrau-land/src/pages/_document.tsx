import NavBar from '@/components/Navigation/NavBar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
