import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
import { Button } from '@govtechsg/sgds-react';

const actions = <Button key="add">Add</Button>;
const tableDataItems = [
    {
        id: 1,
        reportingPoint: 'xxx',
        reportingTime: '23:30',
        actions: ''
    },
];

const columns = [
	{
		name: 'Reporting Point',
		selector: row => row.reportingPoint,
		sortable: true,
	},
	{
		name: 'Reporting Time (HH:MM)',
		selector: row => row.reportingTime,
		sortable: true,
	},
    {
		name: 'Actions',
		selector: row => row.actions,
		sortable: true,
	},
];

export const ReportingCrud = () => {
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

export default ReportingCrud;