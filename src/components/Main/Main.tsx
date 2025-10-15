import getListAPI from '../../hooks/useListAPI'
import { SimpleGrid } from '@mantine/core'
import CardLaunch from '../Card/CardLaunch'

export default function Main() {
	const { listLaunches } = getListAPI()

	return (
		<SimpleGrid cols={3}>
			{listLaunches.map((launch) => (
				<CardLaunch key={launch.mission_name} launchData={launch} />
			))}
		</SimpleGrid>
	)
}