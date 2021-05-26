import GlobalStyle from '../styles/globalStyles';
import LogInPage from "./sign/LogInPage"
import SignUpPage from "./sign/SignUpPage"
import CreatePost from "./post/CreatePost";

import {BrowserRouter, Switch, Route } from 'react-router-dom'
import { useState } from "react";
import UserContext from '../contexts/UserContext'
import Header from './Header';



export default function App() {
  const [user, setUser] = useState(null);
  
  return (
	<UserContext.Provider value={{user, setUser}}>
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
				<Route path="/timeline" exact>
					<CreatePost />
				</Route>
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
  );
}