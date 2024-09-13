import React from 'react';

import { useQueryData } from '../hooks';
import { config } from '../config';

export const Paginator: React.FC = () => {
	const { queryData, setQueryData } = useQueryData();
	const page = +(queryData.p ?? config.apiFirstPageIndex);

	return <div className="paginator">
		<button onClick={() => setQueryData({ p: Math.max(config.apiFirstPageIndex, page-1) })} disabled={ page === config.apiFirstPageIndex }>Prev</button>
		<button onClick={() => setQueryData({ p: page+1 })}>Next</button>
	</div>;
}