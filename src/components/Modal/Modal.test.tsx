import { render, screen } from '@testing-library/react';
import Modal from '../Modal/Modal'
import type { Launch } from '../../type';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

describe('Компонент Modal', () => {

	it('рендерит модальное окно при isOpen=true', () => {
		renderWithMantine(<Modal launchData={mockLaunch} isOpen={true} onClose={vi.fn()} />)
		expect(screen.getAllByText('Test Mission')[0]).toBeInTheDocument()
		expect(screen.getByText('Falcon 9')).toBeInTheDocument()
		expect(screen.getByAltText('Test Mission')).toHaveAttribute('src', 'test.jpg')
	})

	it('вызывает onClose при клике на кнопку закрытия', async () => {
		const mockOnClose = vi.fn()
		renderWithMantine(<Modal launchData={mockLaunch} isOpen={true} onClose={mockOnClose} />)
		const closeButton = screen.getByRole('button', { name: 'X' })
		await userEvent.click(closeButton)
		expect(mockOnClose).toHaveBeenCalled()
	})

});
