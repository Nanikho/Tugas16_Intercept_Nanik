/// <reference types="cypress"/>

//const { interceptors } = require("undici-types");

    describe('Login Feature',() => {
        it('User Login with Valid credentials',() => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
            cy.get('[name="username"]').type('Admin');
            cy.get('[name="password"]').type('admin123');

            cy.intercept("GET","**/employees/action-summary").as("actionsummary");
            cy.intercept("GET","**/web/index.php/core/i18n/messages").as("actionmessages");
            cy.intercept("GET","**/web/index.php/api/v2/dashboard/shortcuts").as("actionshortcuts");
            cy.intercept("GET","**/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc").as("actionbuzzfeed");
            cy.intercept("GET","**/web/index.php/api/v2/dashboard/employees/subunit").as("actionsubunit");
            cy.intercept("GET","**/web/index.php/api/v2/dashboard/employees/locations").as("actionlocations");
            cy.intercept("POST","**web/index.php/events/push").as("actionpush");

            cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
            cy.wait("@actionsummary").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
             });
            cy.wait("@actionmessages").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(304);
            });
            cy.wait("@actionshortcuts").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
            });
            cy.wait("@actionbuzzfeed").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
            });
            cy.wait("@actionsubunit").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
            });
            cy.wait("@actionlocations").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
            });
            cy.wait("@actionpush").then((intercept) => {
                expect(intercept.response.statusCode).to.equal(200);
            });
            //cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
        });


    it('User Login with Invalid Username',() => {
         cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
         cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
         cy.get('[name="username"]').type('Admim');
         cy.get('[name="password"]').type('admin123');
         cy.intercept("GET","**/web/index.php/core/i18n/messages").as("actionmessages");
         cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
         cy.wait("@actionmessages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });
         // cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    })
    // it('User Login with Invalid Password',() => {
    //      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //      cy.get('[name="username"]').type('Admin');
    //      cy.get('[name="password"]').type('admin124');
    //      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    //      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    // })
    // it('User Forgot Your Password',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
    //     cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password')
    // })
    // it('User Reset Password with valid Username',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
    //     cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password')
    //     cy.get('[name="username"]').type('Admin');
    //     cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset').click();
    //     cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password link sent successfully')
    // })
    // it('User Reset Password with Invalid Username',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
    //     cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password')
    //     cy.get('[name="username"]').type('Admin');
    //     cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset').click();
    //     cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password link sent successfully')
    // })
    // it('User Access Linkedin OrangeHRM',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]').should('have.attr', 'href', 'https://www.linkedin.com/company/orangehrm/mycompany/').click();
    // })
    // it('User Access Facebook OrangeHRM',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('a[href="https://www.facebook.com/OrangeHRM/"]').should('have.attr', 'href', 'https://www.facebook.com/OrangeHRM/').click();
    // })
    // it('User Access Twitter OrangeHRM',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('a[href="https://twitter.com/orangehrm?lang=en"]').should('have.attr', 'href', 'https://twitter.com/orangehrm?lang=en').click();
    // })
    // it('User Access Youtube OrangeHRM',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]').should('have.attr', 'href', 'https://www.youtube.com/c/OrangeHRMInc').click();
    // })
    // it('User Access Website OrangeHRM',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //     cy.get('a[href="http://www.orangehrm.com"]').should('have.attr', 'href', 'http://www.orangehrm.com').click();
    // })

})