import React from "react";
import {render, screen} from "@testing-library/react";
import Pokemon from "./Pokemon";
import {mocked} from "ts-jest/utils";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("when the users enters a valid pokemon name", () => {
    test("should show the pokemon abilities of that pokemon", async () => {
        const abilities = [
            {
                ability: {
                    name: "Test ability 1",
                    url: "https://ability.com/ability1"
                }
            },
            {
                ability: {
                    name: "Test ability 2",
                    url: "https://ability.com/ability2"
                }
            }
        ]

        mockedAxios.get.mockResolvedValueOnce({data: {abilities}});
        render(<Pokemon/>);

        await userEvent.type(screen.getByRole("textbox"), "ditto");
        await userEvent.click(screen.getByRole("button"))

        const returnedAbilities = await screen.findAllByRole("listitem");
        expect(returnedAbilities).toHaveLength(2);
    })
});

describe("when the users enters a invalid pokemon name", () => {
    test("should show the an error in the screen", async () => {

        mockedAxios.get.mockRejectedValueOnce(new Error());
        render(<Pokemon/>);

        await userEvent.type(screen.getByRole("textbox"), "invalid-pokemon-name");
        await userEvent.click(screen.getByRole("button"))

        const message = await screen.findByText(/something went wrong/);
        expect(message).toBeInTheDocument();
    })
})