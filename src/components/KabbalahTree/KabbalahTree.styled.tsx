import styled from 'styled-components';

export const KabbalahTreeContainerStyled = styled.div`
  visibility: visible;

  .sephirot-container > svg.path.beth {
    position: absolute;
    top: 2.5rem;
    left: 24rem;
    z-index: -1;
  }

  .sephirot-container > svg.path.aleph {
    position: absolute;
    right: 24rem;
    top: 2.5rem;
    z-index: -1;
  }
`;
