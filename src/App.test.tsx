import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import {mocked} from "ts-jest/utils";
import {getUsers} from "./getUsers";
import App from './App';
import userEvent from "@testing-library/user-event";

jest.mock('./getUsers');
const mockGetUser = mocked(getUsers, true);

describe('when everything is OK', () => {
    beforeEach(async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
    })

    //--------------------------- getBy ---------------------------
    test('should render the App component without crashing', () => {
        render(<App/>);
        //screen.debug();
    });

    test('should select the children that is being passes to the CustomInput component', () => {
        screen.getAllByText(/input/)
        //screen.getByText(/input/)
        //screen.getByText('input:')
        //expect(screen.getByText('input:')).toBeInTheDocument();
    });

    test('should select the input element by its role', () => {
        screen.getAllByRole('textbox');
        expect(screen.getAllByRole('textbox').length).toEqual(1);
    });

    test('should select a label element by its text', () => {
        screen.getAllByLabelText('input:');
    });

    test('should select a label element by its placeholder', () => {
        screen.getAllByPlaceholderText('insert');
    });

    test('should select a input by its id', () => {
        screen.getByTestId('search');
    });

    //--------------------------- queryBy ---------------------------
    test('should select the input element by its role with queryByRole', () => {
        expect(screen.queryAllByRole('textbox')[0]).toBeInTheDocument();
    });

    test('should not find the role "whatever" in our component', () => {
        expect(screen.queryByRole('whatever')).toBeNull();
    });
})

describe('when the component fetches the user successfully', () => {
    beforeEach(() => {
        mockGetUser.mockClear();
    });

    test('should call getUser once', async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1))
    });

    //--------------------------- findBy ---------------------------
    test('should render the username passed', async () => {
        mockGetUser.mockImplementationOnce(() => Promise.resolve({
            id: '1',
            name: 'john'
        }));
        render(<App/>);
        expect(screen.queryByText(/username/)).toBeNull()
        expect(await screen.findByText(/username/)).toBeInTheDocument()
    })
})

describe('when the user enters some text in the input element', () => {

    test('should display the text in the screen', async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalled())

        expect(screen.getByText(/You typed: .../))

        /*fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'David'
            }
        })*/

        await userEvent.type(screen.getByRole('textbox'),'David');

        expect(screen.getByText(/You typed: David/))
    });
})
