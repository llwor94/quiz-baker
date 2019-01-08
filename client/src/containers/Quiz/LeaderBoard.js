import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import { Wrapper } from '../../components/Styles/Wrappers/index';
import { StyledLeaderBoard } from '../../components/Quizzes/Quiz/leaderboard';
import blankProfile from '../../assets/blank-profile.png';

const LeaderBoard = ({ quiz, ...props }) => {
	const [ userScores, setUserScores ] = useState([]);
	useEffect(() => {
		server
			.get(`quizzes/${quiz.id}/scores`)
			.then(({ data }) => {
				console.log(data);
				setUserScores([ ...data ].sort((a, b) => b.score - a.score));
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Wrapper style={{ alignSelf: 'flex-start' }}>
			Leader Board
			{userScores.map(userScore => (
				<StyledLeaderBoard key={userScore.quiz_id} userScore={userScore} />
			))}
		</Wrapper>
	);
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	quiz: quizReducer.quiz,

	user: authReducer.user,
});

export default connect(mapStateToProps)(LeaderBoard);
