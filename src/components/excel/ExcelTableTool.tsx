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
			<div className="container">
				<button
					type="button"
					className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					onClick={addTable}
				>
					View the results
				</button>

				<div className="flex justify-end">
					<button
						type="button"
						className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						onClick={exportToExcel}
					>
						Export to Excel
					</button>
				</div>
				<h1 className="text-3xl font-bold underline text-center text-cyan-500 decoration-cyan-500">
					Excel List
				</h1>

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
