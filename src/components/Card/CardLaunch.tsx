import { Card, Image, Text, Button, Flex } from "@mantine/core"
import type { Launch } from "../../type"
import Modal from './../Modal/Modal'
import { useReducer } from "react"

type launchDataType = {
	launchData: Launch
}

type StateType = {
	isOpen: boolean;
}

type ActionType = { type: 'open' | 'close' }

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'open':
			return {
				...state,
				isOpen: true
			}
		case 'close':
			return {
				...state,
				isOpen: false
			}
		default: return state
	}
}

export default function CardLaunch({ launchData }: launchDataType) {

	const [state, dispatch] = useReducer(reducer, { isOpen: false });

	return (
		<>
			<Card p='md' shadow="sm" padding="lg" radius="md" withBorder>
				<Flex display='flex' gap={10} direction='column'>
					<Image
						fit="contain"
						h={200}
						src={launchData.links?.mission_patch_small}
						alt={launchData.mission_name} />
					<Text
						ta='center'>
						{launchData.mission_name}
					</Text>
					<Text
						ta='center'>
						{launchData.rocket?.rocket_name}
					</Text>
					<Button radius='md' onClick={() => { dispatch({ type: 'open' }) }}>See more</Button>
				</Flex>
			</Card>
			<Modal isOpen={state.isOpen} launchData={launchData} onClose={() => dispatch({ type: 'close' })}></Modal>
		</>
	)
}