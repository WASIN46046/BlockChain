import '../styles/globals.css'; 
const Noop = ({children}) => <>{children}</>

function App({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default App;