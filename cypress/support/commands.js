import LiftPage from './page_objects/LiftPage';
const liftPage = new LiftPage();

Cypress.Commands.add("setupLift", () => {
  liftPage.visit();
});
Cypress.Commands.add("checkStatus", (expectedFloor, expectedRiders) => {
  liftPage.getStatus().should("contain", `Floor: ${expectedFloor}`)
                     .and("contain", `Riders: ${expectedRiders}`);
});
