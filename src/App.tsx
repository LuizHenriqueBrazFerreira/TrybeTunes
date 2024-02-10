import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';
import NotFound from './components/notFound';
import { Layout } from './components/layout';
import { Profile } from './components/profile';
import { Favorites } from './components/favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
