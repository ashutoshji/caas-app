import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
import { Button } from '@govtechsg/sgds-react';

const actions = <Button key="add">Add</Button>;
const tableDataItems = [
    {
        id: 1,
        machinerySet: 'vbbb',
        quantity: '9',
        workingHeight: '678'
    },
];

const columns = [
	{
		name: 'Machinery Set',
		selector: row => row.machinerySet,
		sortable: true,
	},
	{
		name: 'Quantity',
		selector: row => row.quantity,
		sortable: true,
	},
    {
		name: 'Working Height',
		selector: row => row.workingHeight,
		sortable: true,
	},
];

export const MachineryFile = () => {
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
			title=""
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

export default MachineryFile;