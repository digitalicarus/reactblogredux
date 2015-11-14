"use strict";

import React        from 'react';
import Reflux       from 'reflux';
import { Router, Link }       from 'react-router';

import Actions      from 'appRoot/actions';
import SessionStore from 'appRoot/stores/sessionContext';
 
export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session'),
		Router.History
	],
	logOut: function () {
		Actions.logOut();
		// from the navigation mixin
		this.history.pushState('/');
	},
	search: function () {
		var searchVal = this.refs.search.getDOMNode().value;
		Actions.search(searchVal);
	},
	render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
					<input 
						ref="search" 
						type="search" 
						placeholder="search" 
						defaultValue={this.state.initialQuery}
						onChange={this.search} />
						{
							this.state.session.loggedIn ? 
								(<Link to="/post/create">
									Hello {this.state.session.username}, write something!
								</Link>) : 
								<Link to="/users/create">Join</Link>
						}
						{
							this.state.session.loggedIn ? 
								<a onClick={this.logOut}>Log Out</a> :
								<Link to="/login">Log In</Link> 
						} 
				</section>
			</header> 
		);
	}
});

