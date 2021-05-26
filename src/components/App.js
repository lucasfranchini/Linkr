import GlobalStyle from '../styles/globalStyles';
import LogInPage from "./sign/LogInPage"
import SignUpPage from "./sign/SignUpPage"
import TimeLinePage from "./timeLine/TimeLinePage"

import {BrowserRouter, Switch, Route } from 'react-router-dom'
import { useState } from "react";
import UserContext from '../contexts/UserContext'
import PostContext from '../contexts/UserContext'




export default function App() {
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  return (
	<UserContext.Provider value={{user, setUser}}>
		<BrowserRouter>
			<GlobalStyle />
			<Switch>
				<Route path="/" exact>
					<LogInPage />
				</Route>
				<Route path="/signup" exact>
					<SignUpPage />
				</Route>
				<PostContext.Provider value={{postsData, setPostsData}}>
					<Route path="/timeline" exact>
						<TimeLinePage />
					</Route>
				</PostContext.Provider>
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
  );
}