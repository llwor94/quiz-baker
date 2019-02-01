import React, { useState, useContext } from 'react';

import { AuthCtx } from '../../Auth';

import ImageUpload from '../ImageUpload';
import RegisterForm from './RegisterForm';

import { HugeImage } from '../../Styles/Components/Image';
import { Button } from '../../Styles/Components/Button';
import { ModalWrapper } from '../../Styles/Settings/CreateQuiz';
import { Wrapper, WelcomeWrapper } from '../../Styles/Register';

const Register = props => {
	const { user } = useContext(AuthCtx);
	const [ finished, setFinished ] = useState(false);

	if (!user) return <RegisterForm {...props} />;
	else if (!finished)
		return (
			<ModalWrapper>
				<Wrapper>
					<p>Choose a profile picture!</p>
					<ImageUpload doneEditting={() => setFinished(true)} {...props} />
				</Wrapper>
			</ModalWrapper>
		);
	else
		return (
			<WelcomeWrapper>
				<h1>Welcome {user.username}!</h1>
				<HugeImage src={user.img_url} />
				<div>
					<p>What would you like to do first? </p>
					<Button label='Go to Quizzes?' onClick={() => props.history.push('/quizzes')} />
					<span className='or'>or</span>
					<Button
						label='Create a Quiz?'
						onClick={() => props.history.push(`/user/settings`)}
					/>
				</div>
			</WelcomeWrapper>
		);
};

export default Register;
