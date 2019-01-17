import styled from 'styled-components';

export const SplashWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const SplashTitle = styled.div`
    font-size: 36px;
    font-family: 'Merienda One', cursive;
    color: ${props => props.theme.header};
`;