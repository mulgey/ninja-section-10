import './App.css'
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';

// page components
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Article from './pages/Article';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          {/* Thanks to "NavLink" rather than the "Link", our CSS for the active element works*/}
          {/* Thanks to "exact", the "/" route doesn't interfere the others*/}
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Thanks to "Switch", the route only accepts one at a time*/}
        <Switch>
          {/* Thanks to "exact", the "/" route doesn't interfere the others*/}
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          {/* "makalePath" Article.js içerisinde useParams() hook ile kullanıldı */}
          <Route path='/articles/:makalePath'>
            <Article />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App
