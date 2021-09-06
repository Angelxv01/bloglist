describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/api/testing/reset");
    const user = {
      username: "root",
      name: "root",
      password: "root",
    };
    cy.request("POST", "http://localhost:5000/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login Form is shown", () => {
    cy.contains("log in to application");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("root");
      cy.get("#password").type("root");
      cy.get("button:submit").click();

      cy.contains("root logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("root");
      cy.get("#password").type("boot");
      cy.get("button:submit").click();

      cy.get(".error")
        .should("contain", "Invalid user or password")
        .and("have.css", "border-color", "rgb(255, 30, 30)");
    });
  });

  describe.skip("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "root", password: "root" });
    });

    it("A blog can be created", () => {
      cy.contains("create").click();
      cy.get("#title").type("First cypress test");
      cy.get("#author").type("Angel");
      cy.get("#url").type("dummy");

      cy.get("form").submit();

      cy.get(".success")
        .should("contain", "a new blog First cypress test by Angel added")
        .and("have.css", "border-color", "rgb(7, 182, 7)");
    });

    it("User can like a blog", () => {
      cy.addBloglist({
        author: "Angel",
        url: "dummy",
        title: "Second test with cypress",
      });
      cy.get(".toggleShow").click();
      cy.get(".like").click();
      cy.get(".like").parent().contains("1");
    });

    it("User can delete post he created", () => {
      cy.addBloglist({
        author: "Angel",
        url: "dummy",
        title: "Third test with cypress",
      });
      cy.get(".toggleShow").click();
      cy.get(".remove").click();
      cy.contains("Third test with cypress").should("not.exist");
    });

    it("User cannot delete post he did not created", () => {
      const user = {
        username: "dummy",
        name: "dummy",
        password: "dummy",
      };
      cy.request("POST", "http://localhost:5000/api/users", user);

      cy.addBloglist({
        author: "Angel",
        url: "dummy",
        title: "Third test with cypress",
      });
      cy.contains("log out").click();

      cy.login({ username: "dummy", password: "dummy" });

      // assuming there's only one blog and dummy isn't the creator
      cy.get(".toggleShow").click();
      cy.get(".remove").should("not.exist");
    });

    it("Should see ordered post", () => {
      cy.addBloglist({
        title: "Order 3",
        likes: "1",
        author: "Angel",
        url: "dummy",
      });
      cy.addBloglist({
        title: "Order 1",
        likes: "10",
        author: "Angel",
        url: "dummy",
      });
      cy.addBloglist({
        title: "Order 2",
        likes: "5",
        author: "Angel",
        url: "dummy",
      });

      cy.get(".base").then((blogs) => {
        cy.wrap(blogs).should(
          "equal",
          blogs.sort((a, b) => b.likes - a.likes)
        );
      });
    });
  });
});
