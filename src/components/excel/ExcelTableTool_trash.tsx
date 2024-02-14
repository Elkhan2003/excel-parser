import { FC, useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelTableToolProps {
	firstImportData: any[];
	secondImportData: any[];
	firstSelectId: string;
	secondSelectId: string;
}

const ExcelTableTool: FC<ExcelTableToolProps> = ({
	firstImportData,
	secondImportData,
	firstSelectId,
	secondSelectId
}) => {
	const [concatTables, setConcatTables] = useState<any[][]>([]);
	const [selectColumnName, setSelectColumnName] = useState<
		{ index: number; value: string }[]
	>([]);
	const [renameHeaderColumn, setRenameHeaderColumn] = useState<
		{ index: number; value: string }[]
	>([]);

	const addTable = () => {
		if (firstSelectId && secondSelectId) {
			const mergedData: any[] = firstImportData.map((firstItem) => {
				const matchingSecondItem = secondImportData.find(
					(secondItem) =>
						secondItem[secondSelectId] === firstItem[firstSelectId]
				);
				if (matchingSecondItem) {
					const { [secondSelectId]: id, ...restSecondItem } =
						matchingSecondItem;
					return { ...firstItem, ...restSecondItem };
				} else {
					return firstItem;
				}
			});

			const newData: any[][] = [...concatTables, mergedData];

			setConcatTables(newData);
		} else {
			alert('Выберите колонку!');
		}
	};

	const selectColumnNameIndex = (e: string, index: number) => {
		const updatedSelectColumnName = [...selectColumnName];
		const existingIndex = updatedSelectColumnName.findIndex(
			(item) => item.index === index
		);

		if (existingIndex !== -1) {
			updatedSelectColumnName.splice(existingIndex, 1, { index, value: e });
			setSelectColumnName(updatedSelectColumnName);
		} else {
			setSelectColumnName([...selectColumnName, { index, value: e }]);
		}
	};

	const setRenameHeaderColumnIndex = (e: string, index: number) => {
		const updatedHeaderColumn = [...renameHeaderColumn];
		const existingIndex = updatedHeaderColumn.findIndex(
			(item) => item.index === index
		);

		if (existingIndex !== -1) {
			updatedHeaderColumn.splice(existingIndex, 1, {
				index,
				value: e
			});
			setRenameHeaderColumn(updatedHeaderColumn);
		} else {
			setRenameHeaderColumn([...renameHeaderColumn, { index, value: e }]);
		}
	};

	const exportToExcel = () => {
		if (firstSelectId && secondSelectId) {
			const mergedData: any[] = firstImportData.map((firstItem) => {
				const matchingSecondItem = secondImportData.find(
					(secondItem) =>
						secondItem[secondSelectId] === firstItem[firstSelectId]
				);
				if (matchingSecondItem) {
					const { [secondSelectId]: id, ...restSecondItem } =
						matchingSecondItem;
					return { ...firstItem, ...restSecondItem };
				} else {
					return firstItem;
				}
			});

			const worksheet = XLSX.utils.json_to_sheet(mergedData);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
			XLSX.writeFile(workbook, 'new_file.xlsx');
		} else {
			alert('Выберите колонку!');
		}
	};

	return (
		<>
			<div>
				<h3>ExcelTableTool</h3>
				<button
					type="button"
					className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br active:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					onClick={addTable}
				>
					Add
				</button>

				<div className="flex justify-end">
					<button
						type="button"
						className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br active:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						onClick={exportToExcel}
					>
						Export to Excel
					</button>
				</div>
				<h1 className="text-3xl font-bold underline text-center text-purple-500 decoration-purple-600">
					Hello world!
				</h1>

				{concatTables.map((item: any[], index) => (
					<div key={index} className="flex justify-start">
						<div>
							<label
								htmlFor="ExcelImportSelect"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Select an option
							</label>
							<select
								id="ExcelImportSelect"
								className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								disabled={item.length === 0}
								defaultValue=""
								onChange={(e) => selectColumnNameIndex(e.target.value, index)}
							>
								<option value="" disabled>
									Выберите колонку
								</option>
								{item.length > 0 && (
									<>
										{Object.keys(concatTables[0][0]).map((key, index) => (
											<option key={index} value={key}>
												{key}
											</option>
										))}
									</>
								)}
							</select>
						</div>
						<div>
							<label
								htmlFor={`renameHeaderColumn${index}`}
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Rename Header Column
							</label>
							<input
								type="text"
								id={`renameHeaderColumn${index}`}
								className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								defaultValue=""
								onChange={(e) =>
									setRenameHeaderColumnIndex(e.target.value, index)
								}
							/>
						</div>
					</div>
				))}

				{concatTables.length > 0 && (
					<table className="table">
						<thead>
							<tr>
								{Object.keys(concatTables[0][0]).map((key) => (
									<th key={key}>{key}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{concatTables[0].map((row, rowIndex) => (
								<tr key={rowIndex}>
									{Object.values(row).map((value: any, colIndex) => (
										<td key={colIndex}>{value}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};
export default ExcelTableTool;
