class LiftPage {
  visit() {
    cy.visit("src/liftApp.html");
  }

  addRiders(n) {
    cy.get("#riders").clear().type(n);
    cy.get("#addRiders").click();
  }

  goUp() {
    cy.get("#goUp").click();
  }

  goDown() {
    cy.get("#goDown").click();
  }

  callFloor(floor) {
    cy.get("#callFloor").clear().type(floor);
    cy.get("#callBtn").click();
  }

  getStatus() {
    return cy.get("#status");
  }
}

export default LiftPage;
