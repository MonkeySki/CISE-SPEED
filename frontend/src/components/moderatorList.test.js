import { render, screen } from "@testing-library/react";
import App from "../App"
import userEvent from "@testing-library/user-event";

describe("Testing moderatorList.js", () => {

    it("Render ModeratorList page", async () => {
        render(
            <App />
        );
        const user = userEvent;
        const navigateCreatePage = screen.getByRole("link", { name: /Moderator/i })
        await user.click(navigateCreatePage);

        const moderatorPage = screen.getByRole("heading", { name: "Articles to be moderated" })

        expect(moderatorPage).toBeInTheDocument();
    })

    it("Modertor page article fields present", async()=>{
        render(<App/>);

        const user = userEvent;
        const navigateCreatePage = screen.getByRole("link", { name: /Moderator/i })
        await user.click(navigateCreatePage);

        const title = screen.getByRole("columnheader", { name: "Title" })
        const author = screen.getByRole("columnheader", { name: "Author" })
        const year = screen.getByRole("columnheader", { name: "Year" })

        expect(title).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(year).toBeInTheDocument();
    })
})