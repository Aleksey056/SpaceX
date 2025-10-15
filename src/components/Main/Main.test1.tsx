import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Main from './Main';

// Мокаем хук getListAPI
vi.mock('../../hooks/useListAPI', () => ({
	default: vi.fn(),
}));

import getListAPI from '../../hooks/useListAPI';

describe('Main component', () => {
	it('отображает список запусков из getListAPI', () => {
		// Мокируем возвращаемое значение хука
		(getListAPI as vi.Mock).mockReturnValue({
			listLaunches: [
				{
					mission_name: 'Test Mission 1',
					rocket: { rocket_name: 'Falcon 9' },
					links: { mission_patch_small: 'test1.jpg' },
					details: 'Details 1',
				},
				{
					mission_name: 'Test Mission 2',
					rocket: { rocket_name: 'Falcon Heavy' },
					links: { mission_patch_small: 'test2.jpg' },
					details: 'Details 2',
				},
			],
		});

		render(<Main />);

		// Проверяем, что названия миссий отображаются
		expect(screen.getByText('Test Mission 1')).toBeInTheDocument();
		expect(screen.getByText('Test Mission 2')).toBeInTheDocument();
	});
});
