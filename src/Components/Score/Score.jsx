import React, { useState, useEffect } from 'react';

//styled components
import {
    ModalContainer,
    Modal,
    ModalTabContainer,
    ModalTab,
    ModalMainDisplay,
    RestartBtn,
    UserScores
} from './Score_Styled'

import { retrieveDataFromCloudForUserScores } from '../../js/firebase';
import { fetchUser } from '../../js/storage';
import { useTable } from 'react-table';

//Fontawesome packages
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSave, faList);

//solid save, list
export function Score({ timerResult, totalAttempts, toggleScoreResult, setIsItBeforeThePuzzle, levels }) {
    const [toggleLevelStats, setToggleLevelStats] = useState(false);

    const data = React.useMemo(
        () => retrieveDataFromCloudForUserScores(fetchUser().id)
            .map((data, i) => ({ ...data, title: levels[i].title })),
        [levels, toggleLevelStats]
    )

    const columns = React.useMemo(
        () => [
            { Header: '', accessor: 'title' },
            { Header: 'First', accessor: 'firstScore' }, // accessor refers to the prop of an object
            { Header: 'Best', accessor: 'bestScore' },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        headerGroups,
        prepareRow
    } = useTable({ columns, data });

    useEffect(() => {
        if (toggleScoreResult) { 
            document.body.style.overflow = 'hidden'; 
        }
    }, [toggleScoreResult, timerResult])
    
    function handleRestart() {
        document.body.style.overflow = 'unset'; 
        setIsItBeforeThePuzzle(true);
    }
    return (
        <ModalContainer toggle={toggleScoreResult}>
            <Modal toggle={toggleScoreResult}>
                <ModalTabContainer>
                    <ModalTab
                        onClick={() => toggleLevelStats ? setToggleLevelStats(!toggleLevelStats) : null}
                        bgColor={!toggleLevelStats ? '#B00AFF' : '#9611CE'}>
                        <FontAwesomeIcon icon={'save'} />
                    </ModalTab>
                    <ModalTab
                        onClick={() => !toggleLevelStats ? setToggleLevelStats(!toggleLevelStats) : null}
                        bgColor={toggleLevelStats ? '#B00AFF' : '#9611CE'}>
                        <FontAwesomeIcon icon={'list'} />
                    </ModalTab>
                </ModalTabContainer>
                {
                    toggleLevelStats ?
                        <ModalMainDisplay>
                            <UserScores>
                                <>
                                    <table {...getTableProps()}>
                                        <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map(column => (
                                                        <th
                                                            {...column.getHeaderProps()}
                                                        >
                                                            {column.render('Header')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {rows.map(row => {
                                                prepareRow(row)
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map(cell => {
                                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </>
                            </UserScores>
                            <RestartBtn to="/search-for-waldo-app/" onClick={() => handleRestart()}>{'Restart'}</RestartBtn>
                        </ModalMainDisplay> :
                        <ModalMainDisplay>
                            <p>{`Total duration: ${timerResult}`}</p>
                            <p>{`Total failed attempts: ${totalAttempts}`}</p>
                            <RestartBtn to="/search-for-waldo-app/" onClick={() => handleRestart()}>{'Restart'}</RestartBtn>
                        </ModalMainDisplay>
                }
            </Modal>
        </ModalContainer>
    )
}