import React, { useEffect, useState, useContext } from 'react';
import server from '../../utils/server';
import { QuizCtx } from '../../pages/Quiz';
import { ProfileIcon } from '../../Styles/Components/Image';
import { Wrapper, UserWrapper, User } from '../../Styles/Quiz/LeaderBoard';
const Leaderboard = () => {
	const [ userScores, setUserScores ] = useState([]);
	const [ quiz, setQuiz ] = useContext(QuizCtx);
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
		<Wrapper>
			Leader Board
			{userScores.length ? (
				userScores.map(userScore => (
					<UserWrapper>
						<User>
							<ProfileIcon src={userScore.img_url} />
							<span>{userScore.username}</span>
						</User>
						<div>{userScore.score}</div>
					</UserWrapper>
				))
			) : (
				<p style={{ fontSize: '12px' }}>No users have taken this quiz yet.</p>
			)}
		</Wrapper>
	);
};

export default Leaderboard;
