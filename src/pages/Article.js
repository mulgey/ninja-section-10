import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useFetching } from "../hooks/useFetching";

export default function Article() {
  // Yöntem (1)
  // const parametreler = useParams();

  // Yöntem (2), we stick with that
  const { makalePath } = useParams();
  const etkileşimURLsi = `http://localhost:3000/articles/${makalePath}`;
  const { data: tekilMakale, yukleniyor, hata } = useFetching(etkileşimURLsi);
  
  const geçmiş = useHistory();

  useEffect(() => {
    if (hata) {
      // redirect
      setTimeout(() => {
        geçmiş.push('/')}, 2000) 
    }
  // "geçmiş"i sadece "kullanmadınız" uyarısı vermesin diye ekledik, fonk. yok
  }, [hata, geçmiş])

  return (
    <div>
      {/* Yöntem (1) iken aşağıdaki şekildeydi */}
      {/* Article Page - { parametreler.makalePath } */}
      <h2>Article Page - { makalePath }</h2>
      <br></br>
      {yukleniyor && <div>Yükleniyor...</div>}
      <br></br>
      {hata && <div>{hata}</div>}
      {tekilMakale && (
        <div>
          <h2>{tekilMakale.title}</h2>
          <p>By {tekilMakale.author}</p>
          <p>{tekilMakale.body}</p>
        </div>
      )}
    </div>
  )
}
