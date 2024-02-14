import { FC, useState } from 'react';
import ExcelImporter from './ExcelImporter.tsx';
import ExcelSelectId from '@/src/components/excel/ExcelSelectId.tsx';
import ExcelTableTool from '@/src/components/excel/ExcelTableTool.tsx';

interface ExcelConcatSaveProps {}

const ExcelConcatSave: FC<ExcelConcatSaveProps> = () => {
	const [firstImportData, setFirstImportData] = useState<any[]>([]);
	const [secondImportData, setSecondImportData] = useState<any[]>([]);
	const [firstSelectId, setFirstSelectId] = useState('');
	const [secondSelectId, setSecondSelectId] = useState('');

	return (
		<div className="container">
			<div className="flex justify-between mb-4">
				{/* ! File 1 */}
				<div className="bg-sky-200 p-2">
					<h3>Upload file 1</h3>
					<ExcelImporter setData={setFirstImportData} />
					<ExcelSelectId
						data={firstImportData}
						setSelectId={setFirstSelectId}
					/>
				</div>
				{/* ! File 2 */}
				<div className="bg-sky-200 p-2">
					<h3>Upload file 2</h3>
					<ExcelImporter setData={setSecondImportData} />
					<ExcelSelectId
						data={secondImportData}
						setSelectId={setSecondSelectId}
					/>
				</div>
			</div>
			{/* ! Excel Tools */}
			<div className="flex justify-end">
				<ExcelTableTool
					firstImportData={firstImportData}
					secondImportData={secondImportData}
					firstSelectId={firstSelectId}
					secondSelectId={secondSelectId}
				/>
			</div>
		</div>
	);
};

export default ExcelConcatSave;
