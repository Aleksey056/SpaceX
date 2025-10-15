import { render, screen } from '@testing-library/react';
import CardLaunch from '../Card/CardLaunch';
import type { Launch } from '../../type';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

const mockLaunch: Launch = {
	mission_name: 'Test Mission',
	rocket: { rocket_name: 'Falcon 9' },
	links: { mission_patch_small: 'test.jpg' },
	details: 'Test details'
};

const renderWithMantine = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>
			{ui}
		</MantineProvider>
	);
}

beforeEach(() => {
	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal');
	document.body.appendChild(modalRoot);
});

afterEach(() => {
	const modalRoot = document.getElementById('modal');
	if (modalRoot) modalRoot.remove();
});

describe('CardLaunch', () => {
	it('Рендер карточки с данными о запусках', () => {
		renderWithMantine(<CardLaunch launchData={mockLaunch} />);
		expect(screen.getByText('Test Mission')).toBeInTheDocument();
		expect(screen.getByText('Falcon 9')).toBeInTheDocument();
	});

	it('Открытие модалки при нажатии на кнопку "See more"', async () => {
		renderWithMantine(<CardLaunch launchData={mockLaunch} />);
		expect(screen.queryByText('Test details')).not.toBeInTheDocument();
		const button = screen.getByRole('button', { name: /see more/i })
		expect(button).toBeInTheDocument()
		await userEvent.click(button);
		expect(screen.getByText('Test details')).toBeInTheDocument();
	});
});
