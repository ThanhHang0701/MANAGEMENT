const rules = {
  Boss: {
    static: [
      "dashboard-page:visit",
      "user-admin-page: list",
      "user-admin-page: create",
      "user-admin-page: edit",
      "product-page: list",
      "product-page: create",
      "product-page: edit",
      "category-page: list",
      "category-page: create",
      "repository-page: list",
      "repository-page: create",
      "repository-page: edit",
      "user-processing-page: create"
    ]
  },
  Admin: {
    static: [
      "dashboard-page:visit",
      "user-storekeeper-page: list",
      "user-storekeeper-page: create",
      "user-storekeeper-page: edit",
      "user-shipper-page: list",
      "user-shipper-page: edit",
      "user-shipper-page: create"
    ]
  },
  Storekeeper: {
    static: [
      "dashboard-page:visit",
      "product-repository-page: list",
      "import-page: list",
      "import-page: create",
      "export-page: list",
      "export-page: create",
      "order-page: list"
    ]
  }
};

export default rules;
