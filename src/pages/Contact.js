import { useLocation } from "react-router-dom"

export default function Contact() {

  // ?sonrasi için ilk tetikleyiciyi başlattık
  const queryZinciri = useLocation().search;
  // ? sonrasını standart metodun içine yerleştirerek bütünden çıkardık
  const queryParametresi = new URLSearchParams(queryZinciri);
  // içinden "name" anahtarı için değeri aldık
  const hitapİsmi = queryParametresi.get('name');

  return (
    <div>
      {/* çıkardığımız "hitapİsmini"ni istediğimiz yerde kullandık */}
      <h2>Hey dostum {hitapİsmi}..!! Contact us and we'll get it sorted out..!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  )
}
