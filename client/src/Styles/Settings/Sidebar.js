import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  margin-right: 20px;
  text-align: center;
  position: absolute;
  top: 12px;
  left: 60px;

  h4 {
    margin: 5px auto;
  }
`;

export const ProfileButtonWrapper = styled.div`
  /* display: none; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  position: absolute;
  top: 0;
  left: -210px;
	opacity: 0;
  /* display: ${props => props.display && "none"}; */
`;
