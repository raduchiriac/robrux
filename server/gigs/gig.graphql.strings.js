const GIG_CREATE = `
  mutation {
    createGig(input: {
      _userId: "193831453121",
      _providerName: "Bob Magic"
    }) {
      _id
    }
  }
`;
