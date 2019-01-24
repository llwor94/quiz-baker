import React, { useEffect, useState, createContext, Fragment } from 'react';
import server from './utils/server';

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
		localStorage.setItem('user', JSON.stringify(user));
		setUser(user);
	};
	return (
		<AuthCtx.Provider value={{ user: user, login: login, logout: logout, editUser: editUser }}>
			{children}
		</AuthCtx.Provider>
	);
};

export default AuthProvider;
