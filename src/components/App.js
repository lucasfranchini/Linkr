import GlobalStyle from '../styles/globalStyles';
import LogInPage from "./sign/LogInPage"
import SignUpPage from "./sign/SignUpPage"
import FilteredPosts from "./FilteredPosts/FilteredPosts";

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
				<Route path="/my-posts" exact>
					<FilteredPosts/>
				</Route>
				<Route path="/my-likes" exact>
					<FilteredPosts/>
				</Route>
				<Route path="/user/:id" exact>
					<FilteredPosts/>
				</Route>
				<Route path="/hashtag/:hashtag" exact>
					<FilteredPosts/>
				</Route>
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
  );
}