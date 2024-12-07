import styled from 'styled-components';

export type PathPosition = {
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
};

export const PathContainer = styled.div<PathPosition>`
  position: absolute;
  width: 10rem;
  z-index: -1;
  top: ${({ $top }) => $top || 'unset'};
  left: ${({ $left }) => $left || 'unset'};
  right: ${({ $right }) => $right || 'unset'};
  bottom: ${({ $bottom }) => $bottom || 'unset'};
`;
