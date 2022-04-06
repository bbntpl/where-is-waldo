import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useTable } from 'react-table';

//assets
import Loading from '../../Assets/loading.gif';
import {
    validateLevelPlayed,
    getRankings
} from '../../js/firebase';

//styled components
import { LeaderboardContainer, TableContainer, EmptyDataText } from './Leaderboard_styled';

export function Leaderboard({ level }) {
    //Track selected value
    const [currentSelection, setCurrentSelection] = useState({
        option: 1,
        attempt: 'first'
    });
    const [result, setResult] = useState([]);
    const [validatePlayedOnce, setValidatedPlayedOnce] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    //Validate whether the level was played at least once
    useEffect(() => {
        const isLevelPlayedOnce = async () => await validateLevelPlayed(currentSelection.option);
        setValidatedPlayedOnce(isLevelPlayedOnce());
        setCurrentSelection(currentSelection);
    }, [])

    //Load data
    useEffect(() => {
        //active is necessary if more than two calls are expected
        let active = true;
        setIsLoading(true);
        load();
        return () => { active = false }

        async function load() {
            const res = await getRankings(currentSelection.option, currentSelection.attempt);
            if (!active) { return }
            setIsLoading(false);
            setResult(res);
        }

    }, [currentSelection])

    const data = React.useMemo(
        () => result,
        [result]
    )
    
    const columns = React.useMemo(
        () => [
            { accessor: 'index' },
            { accessor: 'username' }, // accessor refers to the prop of an object
            { accessor: `${currentSelection.attempt === 'first' ? 'firstScore' : 'bestScore'}` },
        ],
        [currentSelection]
    )
    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow
    } = tableInstance

    //options for each selection
    const options = level.map(l => {
        return ({ value: l.id, label: l.title });
    });
    const attempts = [
        { value: 'first', label: 'First Attempt' },
        { value: 'best', label: 'Best Attempt' }
    ];

    function handleChange(e) {
        const prop = typeof e.value === 'number' ? 'option' : 'attempt';
        setCurrentSelection({ ...currentSelection, [prop]: e.value });
    }
    return (
        <LeaderboardContainer>
            <Select
                onChange={handleChange}
                defaultValue={options[0]}
                options={options}
                isSearchable={false} />
            <Select
                onChange={handleChange}
                defaultValue={attempts[0]}
                options={attempts}
                isSearchable={false}
            />
            <TableContainer>
                {isLoading ? <img src={Loading} alt={'Loading...'}/> : 
                !validatePlayedOnce && !result ? 
                <EmptyDataText>No games played</EmptyDataText>
                : 
                    <>
                        <table {...getTableProps()}>
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
                }
            </TableContainer>
        </LeaderboardContainer>
    );
}