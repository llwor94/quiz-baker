import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import { Wrapper } from '../../components/Styles/Wrappers/index';
import { StyledLeaderBoard } from '../../components/Quizzes/Quiz/leaderboard';

import styled from 'styled-components';

let LeaderboardWrapper = styled(Wrapper)`
	position: absolute;
	top: 0;
	left: -250px;
	@media (max-width: 977px) {
		display: none;
	}
`;

const LeaderBoard = ({ quiz, ...props }) => {
	const [ userScores, setUserScores ] = useState([]);
	useEffect(() => {
		server
			.get(`quizzes/${quiz.id}/scores`)
			.then(({ data }) => {
				setUserScores(
					[ ...data ].filter(quiz => quiz.score).sort((a, b) => b.score - a.score),
				);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<LeaderboardWrapper style={{ position: 'absolute', top: '0', left: '-250px' }}>
			Leader Board
			{userScores.length ? (
				userScores.map(userScore => (
					<StyledLeaderBoard key={userScore.username} userScore={userScore} />
				))
			) : (
				<p style={{ fontSize: '12px' }}>No users have taken this quiz yet.</p>
			)}
		</LeaderboardWrapper>
	);
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	quiz: quizReducer.quiz,

	user: authReducer.user,
});

export default connect(mapStateToProps)(LeaderBoard);
