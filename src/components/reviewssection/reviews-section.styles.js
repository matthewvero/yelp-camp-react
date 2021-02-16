import styled from 'styled-components';

export const ReviewsSectionSlide = styled.div`
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 20px;
      box-sizing: border-box;
      &.reviewSection-enter {
		opacity: 0;
	}
	&.reviewSection-enter-active {
            transition: all 200ms ease-out;
		opacity: 1;
	}
	&.reviewSection-exit {
            opacity: 1;
	}
	&.reviewSection-exit-active {
            transition: all 200ms ease-out;
		opacity: 0;
      }
`;

export const ReviewSectionGrid = styled.div`
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 9fr;
      gap: 10px;
      box-sizing: border-box;
`;