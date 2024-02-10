import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { createUser } from '../services/userAPI';
import Loading from './loading';

function Login() {
  const [nameInput, setNameInput] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setLoading(true);
    await createUser(nameInput);
    navigate('/search');
    setLoading(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setNameInput({ ...nameInput, [name]: value });
    if (value.length >= 3) {
      setIsDisable(false);
    } else setIsDisable(true);
  }

  if (loading) return <Loading />;

  return (
    <form
      action=""
    >
      <h2>TrybeTunes</h2>
      <label htmlFor="name">
        Digite seu nome:
        <input
          data-testid="login-name-input"
          id="name"
          type="text"
          name="name"
          value={ nameInput.name }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <button
        data-testid="login-submit-button"
        disabled={ isDisable }
        onClick={ (event) => handleClick(event) }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
