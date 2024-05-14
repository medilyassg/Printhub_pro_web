import { useState } from 'react';

const usePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState({
    browseUsers: false,
    browseRoles: false,
    browsePermissions: false,
    browseCustomers: false,
    browseCommands: false,
    updateRole:false,
    deletRole:false,
    editRolePermissions:false,
    createRole:false,
    updateUser:false,
    deleteUser:false,
    createUser:false,
    browseCategory:false,
    updateCategory:false,
    deleteCategory:false,
    createCategory:false,
    browseSubCategory:false,
    updateSubCategory:false,
    deleteSubCategory:false,
    createSubCategory:false,
    browseProduct:false,
    updateProduct:false,
    deleteProduct:false,
    createProduct:false,
    browseProperty:false,
    updateProperty:false,
    deleteProperty:false,
    createProperty:false,
    createProprieteCategorie:false,
    browseProprieteCategorie:false,
    deleteProprieteCategorie:false,
    updateProprieteCategorie:false,

    // Add more permissions as needed
  });

  // Function to check if the authenticated user has the required permissions
  const checkUserPermissions = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser.user && authUser.user.permissions) {
      const permissions = authUser.user.permissions;
      setHasPermissions({
        browseUsers: permissions.some(permission => permission.name === "browse user"),
        browseRoles: permissions.some(permission => permission.name === "browse role"),
        browsePermissions: permissions.some(permission => permission.name === "browse permission"),
        browseCustomers: permissions.some(permission => permission.name === "browse customer"),
        browseCommands: permissions.some(permission => permission.name === "browse command"),
        updateRole:permissions.some(permission => permission.name === "update role"),
        deletRole:permissions.some(permission => permission.name === "delete role"),
        editRolePermissions:permissions.some(permission => permission.name === "edit role permissions"),
        createRole:permissions.some(permission => permission.name === "create role"),
        updateUser:permissions.some(permission => permission.name === "update user"),
        deleteUser:permissions.some(permission => permission.name === "delete user"),
        createUser:permissions.some(permission => permission.name === "create user"),
        browseCategory:permissions.some(permission => permission.name === "browse category"),
        updateCategory:permissions.some(permission => permission.name === "update category"),
        deleteCategory:permissions.some(permission => permission.name === "delete category"),
        createCategory:permissions.some(permission => permission.name === "create category"),
        browseSubCategory:permissions.some(permission => permission.name === "browse sub category"),
        updateSubCategory:permissions.some(permission => permission.name === "update sub category"),
        deleteSubCategory:permissions.some(permission => permission.name === "delete sub category"),
        createSubCategory:permissions.some(permission => permission.name === "create sub category"),
        browseProduct:permissions.some(permission => permission.name === "browse product"),
        updateProduct:permissions.some(permission => permission.name === "update product"),
        deleteProduct:permissions.some(permission => permission.name === "delete product"),
        createProduct:permissions.some(permission => permission.name === "create product"),
        browseProperty:permissions.some(permission => permission.name === "browse property"),
        updateProperty:permissions.some(permission => permission.name === "update property"),
        deleteProperty:permissions.some(permission => permission.name === "delete property"),
        createProperty:permissions.some(permission => permission.name === "create property"),

        browseProprieteCategorie:permissions.some(permission => permission.name === "browse Propriete Categorie"),
        updateProprieteCategorie:permissions.some(permission => permission.name === "update Propriete Categorie"),
        deleteProprieteCategorie:permissions.some(permission => permission.name === "delete Propriete Categorie"),
        createProprieteCategorie:permissions.some(permission => permission.name === "create Propriete Categorie"),
          });
    }
  };

  return { hasPermissions, checkUserPermissions };
};

export default usePermissions;
