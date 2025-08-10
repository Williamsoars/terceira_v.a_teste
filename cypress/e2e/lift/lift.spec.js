import LiftPage from "../../support/page_objects/LiftPage";
const liftPage = new LiftPage();

describe("Lift Simulation Tests", () => {
  
  beforeEach(() => {
    cy.setupLift();
  });

  it("Data-driven: add riders in multiple scenarios", () => {
    const scenarios = [
      { enter: 1, expected: 1 },
      { enter: 2, expected: 2 },
      { enter: 5, expected: 3 } // capacity is 3
    ];
    scenarios.forEach(({ enter, expected }) => {
      liftPage.addRiders(enter);
      cy.checkStatus(0, expected);
      cy.setupLift(); // reset between runs
    });
  });

  it("Full edit scenario", () => {
    liftPage.addRiders(2);
    liftPage.goUp();
    liftPage.goUp();
    cy.checkStatus(2, 2);
    liftPage.goDown();
    cy.checkStatus(1, 2);
    liftPage.callFloor(0);
    cy.checkStatus(0, 2);
  });

  it("Limit checks", () => {
    liftPage.goDown(); // already at 0
    cy.checkStatus(0, 0);
    for (let i = 0; i < 10; i++) liftPage.goUp();
    cy.checkStatus(5, 0);
    liftPage.goUp(); // can't go beyond top
    cy.checkStatus(5, 0);
  });

  it("Invalid call scenarios", () => {
    liftPage.callFloor(-1);
    cy.checkStatus(0, 0);
    liftPage.callFloor(99);
    cy.checkStatus(0, 0);
  });
});
