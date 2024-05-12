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
        // Add more permissions as needed
      });
    }
  };

  return { hasPermissions, checkUserPermissions };
};

export default usePermissions;
