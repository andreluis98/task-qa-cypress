// describe("Users Crud", () => {

//     beforeEach(() => {
//         cy.task('db:erase')
//         cy.visit('http://localhost:5173');
//     });

//     it("Deve exibir botão de criação quando listagem for vazia", () => {
//         cy.contains('No User yet.')
//     });

//     it("Deve Listar todos os usuarios", () => {
//         cy.task('db:create', {
//             name: 'Andre Luis',
//             email: 'andre.luis@pucminas.com',
//             password: 'password@123'
//         });
//         cy.get('table.RaDatagrid-table tbody tr:first td.column-name').contains('Andre Luis');
//     });

//     it("Deve Criar um novo usuario", () => {
//         cy.get('.RaCreateButton-root').click();
//         cy.get('input[id^=":r7"][name="name"]').type('Teste Nome');
//         cy.get('input[id=":rb:"][name="email"]').type('teste@example.com');
//         cy.get('input[id=":rf:"][name="password"]').type('senha123');
//         cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
//         cy.contains('Element created')
//     });

//     it("Deve atualizar um usuario existente", () => {
//         cy.task('db:create', {
//             name: 'Andre Luis',
//             email: 'andre.luis@pucminas.com',
//             password: 'password@123'
//         }).then(() => {
//             cy.get('table.RaDatagrid-table tbody tr:first').click();
//             cy.get('.RaToolbar-defaultToolbar > .MuiButton-text').should('be.visible').click(); // Verifica se o botão está visível antes de clicar
//             // Simula a edição dos campos
//             cy.get('input[id^=":r7"][name="name"]').clear().type('Novo Nome');
//             cy.get('input[id=":rb:"][name="email"]').clear().type('novo_email@example.com');
//             cy.get('input[id=":rf:"][name="password"]').clear().type('nova_senha123');
//             cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click(); // Botão para salvar a atualização
//             cy.contains('Element updated'); // Verifica se a mensagem de atualização aparece
//         });
//     });


//     it("Deve remover um usuario", () => {
//         cy.task('db:create', {
//             name: 'Andre Luis',
//             email: 'andre.luis@pucminas.com',
//             password: 'password@123'
//         });
//         cy.get('table.RaDatagrid-table tbody tr:first').click();
//         cy.get('.RaToolbar-defaultToolbar > .MuiButton-text').click();
//         cy.contains('Element deleted')
//     });

// });



describe("Users Crud", () => {

    before(() => {
        // Limpa o banco de dados antes de iniciar os testes
        cy.task('db:erase');
    });

    // after(() => {
    //     // Limpa o banco de dados após todos os testes serem concluídos
    //     cy.task('db:erase');
    // });

    beforeEach(() => {
        // Visita a aplicação antes de cada teste
        cy.visit('http://localhost:5173');
    });

    it("Deve exibir botão de criação quando listagem for vazia", () => {
        cy.contains('No User yet.');
    });

    it("Deve listar todos os usuários", () => {
        cy.task('db:create', {
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });
        cy.get('table.RaDatagrid-table tbody tr:first td.column-name').contains('Andre Luis');
    });

    it("Deve criar um novo usuário", () => {
        cy.get('.RaCreateButton-root').click();
        cy.get('input[name="name"]').type('Teste Nome');
        cy.get('input[name="email"]').type('teste@example.com');
        cy.get('input[name="password"]').type('senha123');
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
        cy.contains('Element created');
    });

    it("Deve criar um novo usuário pressionando Enter", () => {
        cy.get('.RaCreateButton-root').click();
        cy.get('input[name="name"]').type('Teste Nome');
        cy.get('input[name="email"]').type('teste@example.com');
        cy.get('input[name="password"]').type('senha123');
        cy.get('input[name="password"]').type('{enter}');
        cy.contains('Element created');
    });

    // it("Deve atualizar um usuário existente", () => {
    //     cy.task('db:create', {
    //         name: 'Andre Luis',
    //         email: 'andre.luis@pucminas.com',
    //         password: 'password@123'
    //     }).then(() => {
    //         cy.get('table.RaDatagrid-table tbody tr:first').click();
    //         cy.get('.RaToolbar-defaultToolbar > .MuiButton-text').should('be.visible').click();
    //         cy.get('input[name="name"]').clear().type('Novo Nome');
    //         cy.get('input[name="email"]').clear().type('novo_email@example.com');
    //         cy.get('input[name="password"]').clear().type('nova_senha123');
    //         cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
    //         cy.contains('Element updated');
    //     });
    // });

    it("Deve Atualizar um usuario existente ", () => {
        cy.task('db:create', {
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        })
        cy.get('table.RaDatagrid-table tbody tr:first').click();
        
        cy.get('input[name="name"]').should('be.visible').clear().type('Novo Nome');
        cy.get('input[name="email"]').should('be.visible').clear().type('novo_email@example.com');
        cy.get('input[name="password"]').should('be.visible').clear().type('nova_senha123');
        cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
        cy.contains('Element updated');
    });




    it("Deve remover um usuario", () => {
        cy.task('db:create', {
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });
        cy.get('table.RaDatagrid-table tbody tr:first').click();
        cy.get('.RaToolbar-defaultToolbar > .MuiButton-text').click();
        cy.contains('Element deleted')
    });

});


