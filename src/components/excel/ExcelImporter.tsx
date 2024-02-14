import { FC } from 'react';
import * as XLSX from 'xlsx';

interface DataType {
	setData: (data: any[]) => void;
}

const ExcelImporter: FC<DataType> = ({ setData }) => {
	const handleFileUpload = (e: any) => {
		const reader = new FileReader();
		reader.readAsBinaryString(e.target.files[0]);
		reader.onload = (e: any) => {
			const data = e.target.result;
			const workbook = XLSX.read(data, { type: 'binary' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const parsedData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

			if (parsedData.length > 0) {
				const headers = parsedData[0];
				const formattedData = parsedData
					.slice(1)
					.reduce((acc: any[], row: any) => {
						const obj: any = {};
						let allNull = true;
						headers.forEach((header: any, index: number) => {
							if (row[index] !== undefined && row[index] !== null) {
								allNull = false;
							}
							obj[header] = row[index] !== undefined ? row[index] : null;
						});
						if (!allNull) {
							acc.push(obj);
						}
						return acc;
					}, []);
				setData(formattedData);
			} else {
				setData([]);
			}
		};
	};

	return (
		<div className="container">
			<input
				className="p-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="file_input"
				type="file"
				accept=".xlsx, .xls"
				onChange={handleFileUpload}
			/>
		</div>
	);
};

export default ExcelImporter;
