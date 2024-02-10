import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../types';
import Loading from './loading';
import { getUser } from '../services/userAPI';

function Header() {
  const [userName, setUserName] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);

  const getUserName = async () => {
    setIsLoading(true);
    const recoveredUser = await getUser();
    setUserName(recoveredUser);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserName();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <header data-testid="header-component">
      <h4 data-testid="header-user-name">{userName?.name}</h4>
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
    </header>
  );
}

export default Header;
