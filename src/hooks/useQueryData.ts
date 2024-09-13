import React from 'react';
import { QueryDataContext } from "../contexts";

export const useQueryData = () => {
	return React.useContext(QueryDataContext);
}
