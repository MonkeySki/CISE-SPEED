import { render, screen } from "@testing-library/react";
import App from "../App"
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("Testing Create", () => {

    it("Render Create Article Page", async () => {
        render(
            <App />
        );
        const user = userEvent;
        const navigateCreatePage = screen.getByRole("link", { name: /Create New Article/i })
        await user.click(navigateCreatePage);

        const submisionPage = screen.getByRole("heading", { name: "Submit an Article" })

        expect(submisionPage).toBeInTheDocument();
    })

    it("User input in text fields", async () => {
        render(<App />);

        const user = userEvent;
        const navigateCreatePage = screen.getByRole("link", { name: /Create New Article/i })
        await user.click(navigateCreatePage);

        const submisionPage = screen.getByRole("textbox", { name: "Title" });
        await user.type(submisionPage, "Test Title");
        expect(submisionPage).toHaveValue("Test Title");
    })

    it("Submit with claim strength", async () => {
        render(<App />);

        const user = userEvent;
        const navigateCreatePage = screen.getByRole("link", { name: /Create New Article/i })
        await user.click(navigateCreatePage);

        const submisionPage = screen.getByRole('combobox',{name: "Claim Strength"});
        expect(submisionPage).toHaveValue('Strongly Agree');

        expect(screen.getByRole('option', { name: 'Strongly Agree' }).selected).toBe(true)
    })
})