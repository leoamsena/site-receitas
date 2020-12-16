// https://docs.cypress.io/api/introduction/api.html

describe("Registro e login de usuário", () => {
    const email =
        Math.random()
        .toString(36)
        .substring(7) + "leo@leo.com";
    it("Registro", () => {
        cy.visit("/");
        cy.get("#btnLogin").click();
        cy.get("#mudar-registro-login").click();
        cy.get("#nome-input").type("Nome completo");
        cy.get("#email-input").type(email);
        cy.get("#password-input").type("1");

        cy.get("#btn-logar-registrar").click();
        cy.wait(1000);
        cy.get(".toast-body").contains("Registrado com sucesso");
    });
});