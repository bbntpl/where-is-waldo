import styled from 'styled-components';

const PRIMARY_COLOR = '#DA84FF';
const TABLE_FONT = 'aliceblue';

export const LeaderboardContainer = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: .75%;
    z-index: 25;
    min-width: 300px;
    padding: 1px 3px;
    width: 15vw;
    max-width: 450px;
    min-height: 280px;
    border-radius: 12px;
    height: 45vh;
    background-color: #CC5CFC;
    border: 3px solid ${PRIMARY_COLOR};
    transition: opacity: 0.25 ease;
`

export const TableContainer = styled.div`
    height: 100%;
    width: 100%;
    color: ${TABLE_FONT};
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;

    table {
      border-spacing: 2px 10px;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
  
      th,
      td {
        padding: 0.5rem;
  
        :last-child {
          border-right: 0;
        }
      }
    }
`;

export const EmptyDataText = styled.p`
    display: flex;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`
