import GlobalStyle from '../styles/globalStyles';
import LogInPage from "./sign/LogInPage"
import SignUpPage from "./sign/SignUpPage"

import {BrowserRouter, Switch, Route } from 'react-router-dom'
import { useState } from "react";
import UserContext from '../contexts/UserContext'
import Header from './Header';



export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
	  
	<UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
		<BrowserRouter>
			<GlobalStyle />
			<Header/>
			<Switch>
				<Route path="/" exact>
					<LogInPage />
				</Route>
				<Route path="/signup" exact>
					<SignUpPage />
				</Route>
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
  );
}