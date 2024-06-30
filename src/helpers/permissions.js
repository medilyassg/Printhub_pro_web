import { useState } from 'react';

const usePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState({
    browseUsers: false,
    createUser: false,
    updateUser: false,
    deleteUser: false,

    browseRoles: false,
    createRole: false,
    updateRole: false,
    deleteRole: false,

    browseCustomers: false,
    createCustomer: false,
    updateCustomer: false,
    deleteCustomer: false,

    browseCategory: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,

    browseSubCategory: false,
    createSubCategory: false,
    updateSubCategory: false,
    deleteSubCategory: false,

    browseProduct: false,
    createProduct: false,
    updateProduct: false,
    deleteProduct: false,

    browseProperty: false,
    createProperty: false,
    updateProperty: false,
    deleteProperty: false,

    browseProprieteCategorie: false,
    createProprieteCategorie: false,
    updateProprieteCategorie: false,
    deleteProprieteCategorie: false,

    browseOrders: false,
    browseTransactions: false,

    manageCompanyInfo: false,
    managePaymentsCredentials: false,

    browseBank: false,
    createBank: false,
    updateBank: false,
    deleteBank: false,
  });

  // Function to check if the authenticated user has the required permissions
  const checkUserPermissions = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser.user && authUser.user.permissions) {
      const permissions = authUser.user.permissions;
      setHasPermissions({
        browseUsers: permissions.some(permission => permission.name === "browse user"),
        createUser: permissions.some(permission => permission.name === "create user"),
        updateUser: permissions.some(permission => permission.name === "update user"),
        deleteUser: permissions.some(permission => permission.name === "delete user"),

        browseRoles: permissions.some(permission => permission.name === "browse role"),
        createRole: permissions.some(permission => permission.name === "create role"),
        updateRole: permissions.some(permission => permission.name === "update role"),
        deleteRole: permissions.some(permission => permission.name === "delete role"),

        browseCustomers: permissions.some(permission => permission.name === "browse costumer"),
        createCustomer: permissions.some(permission => permission.name === "create costumer"),
        updateCustomer: permissions.some(permission => permission.name === "update costumer"),
        deleteCustomer: permissions.some(permission => permission.name === "delete costumer"),

        browseCategory: permissions.some(permission => permission.name === "browse category"),
        createCategory: permissions.some(permission => permission.name === "create category"),
        updateCategory: permissions.some(permission => permission.name === "update category"),
        deleteCategory: permissions.some(permission => permission.name === "delete category"),

        browseSubCategory: permissions.some(permission => permission.name === "browse sub category"),
        createSubCategory: permissions.some(permission => permission.name === "create sub category"),
        updateSubCategory: permissions.some(permission => permission.name === "update sub category"),
        deleteSubCategory: permissions.some(permission => permission.name === "delete sub category"),

        browseProduct: permissions.some(permission => permission.name === "browse product"),
        createProduct: permissions.some(permission => permission.name === "create product"),
        updateProduct: permissions.some(permission => permission.name === "update product"),
        deleteProduct: permissions.some(permission => permission.name === "delete product"),

        browseProperty: permissions.some(permission => permission.name === "browse property"),
        createProperty: permissions.some(permission => permission.name === "create property"),
        updateProperty: permissions.some(permission => permission.name === "update property"),
        deleteProperty: permissions.some(permission => permission.name === "delete property"),

        browseProprieteCategorie: permissions.some(permission => permission.name === "browse Propriete Categorie"),
        createProprieteCategorie: permissions.some(permission => permission.name === "create Propriete Categorie"),
        updateProprieteCategorie: permissions.some(permission => permission.name === "update Propriete Categorie"),
        deleteProprieteCategorie: permissions.some(permission => permission.name === "delete Propriete Categorie"),

        browseOrders: permissions.some(permission => permission.name === "browse orders"),
        browseTransactions: permissions.some(permission => permission.name === "browse transactions"),

        manageCompanyInfo: permissions.some(permission => permission.name === "manage Company Info"),
        managePaymentsCredentials: permissions.some(permission => permission.name === "manage Payments Credetiels"),

        browseBank: permissions.some(permission => permission.name === "browse Bank"),
        createBank: permissions.some(permission => permission.name === "create Bank"),
        updateBank: permissions.some(permission => permission.name === "update Bank"),
        deleteBank: permissions.some(permission => permission.name === "delete Bank"),
      });
    }
  };

  return { hasPermissions, checkUserPermissions };
};

export default usePermissions;
