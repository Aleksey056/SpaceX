import { Card, Image, Text, Button, Modal, Center, Group, Flex } from "@mantine/core"
import type { Launch } from "../../type"

type launchDataType = {
	launchData: Launch
}

export default function CardLaunch({ launchData }: launchDataType) {

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
					<Button radius='md'>See more</Button>
				</Flex>


			</Card>

			{/* <Modal></Modal> */}
		</>
	)
}