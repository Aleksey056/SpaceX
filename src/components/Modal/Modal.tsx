import { Box, Button, Card, Flex, Group, Image, Text } from "@mantine/core"
import type { Launch } from "../../type"
import { createPortal } from "react-dom";

type ModalPropsType = {
	launchData: Launch
	onClose: () => void;
	isOpen: boolean
}

const Modal = ({ launchData, onClose, isOpen }: ModalPropsType) => {
	const modalElement = document.getElementById('modal')

	if (!isOpen || !modalElement) return null

	return createPortal(
		(
			<Box
				pos="fixed"
				top={0}
				left={0}
				right={0}
				bottom={0}
				bg="rgba(0,0,0,0.5)"
				style={{ zIndex: 1 }}
				onClick={onClose}

			>
				<Card
					padding="lg"
					pos='fixed'
					top="50%"
					left="50%"
					style={{
						zIndex: 2,
						overflow: 'auto',
						maxHeight: '90vh',
						maxWidth: '50%',
						transform: "translate(-50%, -50%)",
					}}
					onClick={e => e.stopPropagation()}

				>

					<Flex display='flex' gap={10} direction='column' style={{ height: '100%' }}>
						<Group justify='space-between'>
							<Text fw={500}>{launchData.mission_name}</Text>
							<Button variant="white" color="gray" size='xl' onClick={onClose}>X</Button>
						</Group>
						<Image
							ta='center'
							fit="contain"
							h={200}
							src={launchData.links?.mission_patch_small}
							alt={launchData.mission_name} />
						<Box style={{ overflowY: 'auto', flexGrow: 1, paddingRight: 10 }}>
							<Box pb='md'>
								<Text fw={500}>Mission name:</Text>
								<Text c="dimmed"> {launchData.mission_name}</Text>
							</Box>
							<Box pb='md'>
								<Text fw={500}>Rocket name:</Text>
								<Text c="dimmed"> {launchData.rocket?.rocket_name}</Text>
							</Box>

							<Box pb='md'>
								<Text fw={500}>Details:</Text>
								<Text c="dimmed">{launchData.details}</Text>
							</Box>
						</Box>


					</Flex>
				</Card>
			</Box >

		), modalElement
	)

}

export default Modal