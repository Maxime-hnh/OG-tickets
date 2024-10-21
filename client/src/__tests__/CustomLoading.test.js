import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import {expect} from '@jest/globals';
import CustomLoading from "../_components/CustomLoading";

describe('CustomLoading Component', () => {
    it('renders the loading overlay with correct properties', () => {
        render(
            <MantineProvider>
                <CustomLoading />
            </MantineProvider>
        );

        const overlay = screen.getByTestId('custom-loading-overlay');
        expect(overlay).toBeInTheDocument();

        expect(overlay).toHaveStyle('--lo-z-index: 1000');
    });
});