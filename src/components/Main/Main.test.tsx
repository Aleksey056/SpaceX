import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Main from '../Main/Main'
import { MantineProvider } from '@mantine/core';

const renderWithMantine = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>
			{ui}
		</MantineProvider>
	);
}

vi.mock('../../hooks/useListAPI', () => ({
	default: () => ({
		listLaunches: [
			{ mission_name: 'Mission 1' },
			{ mission_name: 'Mission 2' },
			{ mission_name: 'Mission 3' },
		],
	}),
}))

describe('Компонент Main', () => {
	it('Отрисовывает карточки запусков из списка', () => {
		renderWithMantine(<Main />)
		expect(screen.getByText('Mission 1')).toBeInTheDocument()
		expect(screen.getByText('Mission 3')).toBeInTheDocument()
	})
})
