import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
import { Button } from '@govtechsg/sgds-react';

const actions = <Button key="add">Add</Button>;
const tableDataItems = [
    {
        id: 1,
        dateStart: '22/02/2012',
        dateEnd: '23/02/2022',
        timeStart: '',
        timeEnd: ''
    },
    {
        id: 2,
        dateStart: '22/02/2012',
        dateEnd: '23/02/2022',
        timeStart: '',
        timeEnd: ''
    },
    {
        id: 3,
        dateStart: '22/02/2012',
        dateEnd: '23/02/2022',
        timeStart: '',
        timeEnd: ''
    },
    {
        id: 4,
        dateStart: '22/02/2012',
        dateEnd: '23/02/2022',
        timeStart: '',
        timeEnd: ''
    },
];

const columns = [
	{
		name: 'Date Start',
		selector: row => row.dateStart,
		sortable: true,
	},
	{
		name: 'Date End',
		selector: row => row.dateEnd,
		sortable: true,
	},
    {
		name: 'Time Start',
		selector: row => row.timeStart,
		sortable: true,
	},
    {
		name: 'Time End',
		selector: row => row.timeEnd,
		sortable: true,
	},
];

export const AddDeleteTableRows = () => {
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState(tableDataItems);

	const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows, 'name'));
			}
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</Button>
		);
	}, [data, selectedRows, toggleCleared]);

    // const actions = <Button key="add">Add</Button>;
    // const actions = React.useMemo(() => {
    //     const addRecord = () => {

    //     }
    // })

	return (
		<DataTable
			title="Desserts"
			columns={columns}
			data={data}
			selectableRows
			actions={actions}
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
		/>
	);
};

export default AddDeleteTableRows;