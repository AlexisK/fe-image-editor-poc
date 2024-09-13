import React from 'react';

export type QueryData = Record<string, string|number|boolean|null>;
export interface QueryDataContextStructure {
	queryData: QueryData,
	setQueryData: (newData: setQueryData, shouldPush?: boolean) => void,
	shallowNavigate: (newPath: string) => void,
}

export const QueryDataContext = React.createContext<QueryDataContextStructure>({
	queryData: {},
	setQueryData: (_) => {},
	shallowNavigate: (_) => {},
});


// sacrificing lists of data in query for convenient query string API, using browser native for speedup and to omit react-router-dom bugs. Also native API routing usage demo
export const QueryDataContextProvider: React.FC = ({children}) => {
	React.useEffect(() => {
		const posStateEventHandler = ev => {
			setQueryData(getQueryDict());
		};
		window.addEventListener('popstate', posStateEventHandler);
		return () => window.removeEventListener('popstate', posStateEventHandler);
	}, []);

	const [queryData, setQueryDataObj] = React.useState(getQueryDict);

	
	const shallowNavigate = React.useCallback((newPath: string, shouldPush: boolean = false) => {
		if ( shouldPush ) {
			window.history.pushState(null, document.title, newPath);
		} else {
			window.history.replaceState(null, document.title, newPath);
		}
	}, [document.title]);
	
	const setQueryData = React.useCallback((data: QueryData, shouldPush?: boolean) => {
		const url = new URL(window.location.href);
		const newQuery = {...queryData, ...data};
		let keys = Object.keys(newQuery);
		keys.forEach(k => {
			if ( newQuery[k] === null || newQuery[k] === undefined ) {
				delete newQuery[k];
			}
		});
		keys = Object.keys(newQuery);
		
		if ( !keys.length ) {
			shallowNavigate(url.pathname, shouldPush);
		} else {
			shallowNavigate(`${url.pathname}?${keys.map(k => `${k}=${encodeURIComponent(newQuery[k])}`).join('&')}`, shouldPush);
		}
		
		setQueryDataObj(newQuery);
	}, [queryData, document.title]);


	return <QueryDataContext.Provider value={{queryData, setQueryData, shallowNavigate}}>{children}</QueryDataContext.Provider>;
}

export function getQueryDict() {
	const url = new URL(window.location.href);
	const result = {};
	for(let [k,v] of url.searchParams.entries()) {
		result[k] = v;
	}
	return result as QueryData;
}