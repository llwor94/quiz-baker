import React, { useState, createContext } from 'react';
import server from 'server';

export const AuthCtx = createContext();

const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState(undefined);

	const login = user => {
		localStorage.setItem('user', JSON.stringify(user));
		server.defaults.headers.common['Authorization'] = user.token;
		setUser(user.user);
	};

	const logout = () => {
		delete server.defaults.headers.common['Authorization'];
		localStorage.removeItem('user');
		setUser('');
	};

	const editUser = user => {
		console.log(user);
		localStorage.setItem('user', JSON.stringify(user));
		setUser(user.user);
	};
	return (
		<AuthCtx.Provider value={{ user: user, login: login, logout: logout, editUser: editUser }}>
			{children}
		</AuthCtx.Provider>
	);
};

export default AuthProvider;
