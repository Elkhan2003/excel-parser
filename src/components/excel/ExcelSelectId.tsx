import { FC } from 'react';

interface DataType {
	data: any[];
	setSelectId: (data: any) => void;
}

const ExcelSelectId: FC<DataType> = ({ data, setSelectId }) => {
	return (
		<>
			<div className="container">
				<label
					htmlFor="ExcelImportSelect"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Select an option
				</label>
				<select
					id="ExcelImportSelect"
					className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					disabled={data.length === 0}
					defaultValue=""
					onChange={(e) => setSelectId(e.target.value)}
				>
					<option value="" disabled>
						Выберите колонку
					</option>
					{data.length > 0 && (
						<>
							{Object.keys(data[0]).map((key, index) => (
								<option key={index} value={key}>
									{key}
								</option>
							))}
						</>
					)}
				</select>
			</div>
		</>
	);
};
export default ExcelSelectId;
