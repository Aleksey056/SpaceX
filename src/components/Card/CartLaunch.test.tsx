import { render, screen, fireEvent } from '@testing-library/react';
import CardLaunch from '../Card/CardLaunch';
import type { Launch } from '../../type';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';

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

	it('Открытие модалки при нажатии на кнопку "See more"', () => {
		renderWithMantine(<CardLaunch launchData={mockLaunch} />);
		const button = screen.getByRole('button', { name: /See more/i })
		expect(button).toBeInTheDocument()
		fireEvent.click(button);
		expect(screen.getByText('Test details')).toBeInTheDocument();
	});
});
