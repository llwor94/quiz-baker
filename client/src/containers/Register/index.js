import React, { useState, Fragment, useContext } from 'react';
import { UserCtx } from '../../App';
import ImageUpload from '../ImageUpload';
import { HugeImage } from '../../Styles/Components/Image';
import Button from '../../components/Styles/Button';
import RegisterForm from './RegisterForm';
import { ModalWrapper } from '../../Styles/Settings/CreateQuiz';
import { Wrapper, WelcomeWrapper } from '../../Styles/Register';
const Register = props => {
	const [ user, setUser ] = useContext(UserCtx);
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
