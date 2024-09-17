import dynamic from 'next/dynamic'

const Login = dynamic(
  () => import('./components/mainpage'),
  { ssr: false }
)


export default async function Home() {
  return (
    <main>
      <Login></Login>
    </main>
  );
}