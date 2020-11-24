import styled from 'styled-components';

export const ProfilePictureContainer = styled.div`
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 7px solid ${props => props.theme.main};
      overflow: hidden;
`

export const NoProfileImage = styled.div`
      height: 100%;
      width: 100%;
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${props => props.theme.textAlt};
      background-color: ${props => props.theme.background};
`