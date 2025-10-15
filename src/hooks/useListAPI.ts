import { useEffect, useReducer } from 'react'
import type { Launch } from '../type'

type StateType = {
	listLaunches: Launch[]
}

type ActionType = {
	type: 'get_list', payload: Launch[]
}

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'get_list':
			return { ...state, listLaunches: action.payload }
		default:
			return state
	}
}

function getListAPI() {
	const [state, dispatch] = useReducer(reducer, { listLaunches: [] })

	useEffect(() => {
		const fetchFunc = async () => {
			const response = await fetch('https://api.spacexdata.com/v3/launches?launch_year=2020');
			const resJson = await response.json();
			console.log(resJson)
			dispatch({
				type: 'get_list',
				payload: resJson,
			});
		};
		fetchFunc();
	}, []);

	return state
}

export default getListAPI