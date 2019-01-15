import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload';
import { LargeImage } from '../../components/Styles/Image';
import Button from '../../components/Styles/Button';
import RegisterForm from './RegisterForm';

const Register = ({ user, ...props }) => {
	const [ finished, setFinished ] = useState(false);
	if (!user) return <RegisterForm {...props} />;
	else if (!finished)
		return (
			<Fragment>
				<p>Upload Image?</p>
				<ImageUpload doneEditting={() => setFinished(true)} {...props} />
			</Fragment>
		);
	else
		return (
			<Fragment>
				<p>Welcome {user.username}!</p>
				<LargeImage src={user.img_url} />

				<Button label='Go to Quizzes?' onClick={() => props.history.push('/quizzes')} />
				<Button
					label='Create a Quiz?'
					onClick={() => props.history.push(`/quizzes/user/${user.id}`)}
				/>
			</Fragment>
		);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps)(Register);
