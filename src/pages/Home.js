import { Link } from "react-router-dom"
import { useFetching } from "../hooks/useFetching"

// styles
import './Home.css'

export default function Home() {

  const {data: makaleler, yukleniyor, hata} = useFetching('http://localhost:3000/articles')

  return (
    <div className="home">
      <h2>Makaleler</h2>
      {yukleniyor && <div>Yükleniyor...</div>}
      {hata && <div>{hata}</div>}
      {makaleler && makaleler.map((makaleÖğesi) => (
        <div key={makaleÖğesi.id} className="card">
          <h3>{makaleÖğesi.title}</h3>
          <p>{makaleÖğesi.author}</p>
          <Link to={`/articles/${makaleÖğesi.id}`}>Read more...</Link>
        </div>
      ))}
    </div>
  )
}
