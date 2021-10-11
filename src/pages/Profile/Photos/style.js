import styled from 'styled-components';

export const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
`;

export const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PhotoText = styled.p`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  height: 4.5em; /* Fallback for non-webkit, line-height * 2 */
  line-height: 1.5em;
  -webkit-line-clamp: 3; /* if you change this, make sure to change the fallback line-height and height */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
