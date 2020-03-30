import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './views/Home';
import Details from './views/Details';
import Admin from './views/Admin';
import Compose from './views/Compose';


const App: React.FC<AppProps> = () => { // to strong type this functional component to be React safe set type to React.FC<AppProps>. 
	// FC stands for functional component
	// AppProps is interface for FC (put interfaces @ bottom of file)
	return (
		<BrowserRouter>
		<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/details/:id'>
					<Details />
				</Route>
				<Route exact path='/admin/:id'>
					<Admin />
				</Route>
				<Route exact path='/compose'>
					<Compose />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

interface AppProps {} // this component receives no props so leave props object blank

export default App;

// // all boilerplate template below

// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

// export default App;
