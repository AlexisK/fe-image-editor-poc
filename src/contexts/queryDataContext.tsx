import React from 'react';
export const QueryDataContext = React.createContext({queryData: {}, setQueryData: () => {}});

export type QueryData = Record<string, string|number|boolean|null>;


// sacrificing lists of data in query for convenient query string API, using browser native for speedup and to omit react-router-dom bugs
export const QueryDataContextProvider: React.FC = ({children}) => {
	const url = new URL(window.location.href);

	const [queryData, setQueryDataObj] = React.useState(() => {
		const result = {};
		for(let [k,v] of url.searchParams.entries()) {
			result[k] = v;
		}
		return result as QueryData;
	});
	
	const setQueryData = React.useCallback((data: QueryData) => {
		const newQuery = {...queryData, ...data};
		const keys = Object.keys(newQuery);
		
		if ( !keys.length ) {
			window.history.replaceState(null, document.title, url.pathname);
		} else {
			window.history.replaceState(null, document.title, `${url.pathname}?${keys.map(k => `${k}=${encodeURIComponent(newQuery[k])}`).join('&')}`);
		}
		
		setQueryDataObj(newQuery);
	}, [queryData, url.pathname, document.title]);


	return <QueryDataContext.Provider value={{queryData, setQueryData}}>{children}</QueryDataContext.Provider>;
}