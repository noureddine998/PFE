import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../Singup/Singup';
const Login = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();   // Initialize useHistory hook

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:8000/api/login', data)
    .then(response => {
        console.log('Login successful', response.data);
        navigate('/VotingPage');  // Redirect to the DistrictList page
    })
    .catch(error => {
        console.error('Login error', error.response.data);
        // Optionally, handle errors here, such as displaying a login failure message
    });
};


  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };


	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleLogin}>
						<h1>Login to Your Account</h1>
						<input
						id="email"
						name="email"
						type="text"
						placeholder="Adresse e-mail ou numéro de tél."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						/>
						<input
						id="password"
						name="password"
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
						<button type="submit" id="login-button"><h3>Se connecter</h3></button>
					</form>
					
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
						<h3>Sing Up</h3>	
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
