import Web from "./index";

describe("<Web />", () => {
  it("should render and display expected content", () => {
    cy.mount(<Web />);
    cy.get("h1").contains("Cryptocurrency Realtime price");
  });
});
