import React, { useState, useEffect } from "react";
import { Row, Col, Form, Label, Input, Alert } from "reactstrap";

const EditRolePermissionForm = (props) => {
  const [rolePermissions, setRolePermissions] = useState({});

  useEffect(() => {
    const rolePermissionsData = props.rolesPermissions;
    if (rolePermissionsData) {
      setRolePermissions(rolePermissionsData.rolePermissions);
    }
  }, [props.rolesPermissions]);

  useEffect(() => {

  }, [rolePermissions]);

  const handleCheckboxChange = (permission) => {
    const permissionId = permission.id;
    setRolePermissions((permissions) => {
      const updatedPermissions = { ...permissions };
      if (permissionId in updatedPermissions) {
        delete updatedPermissions[permissionId];
      } else {
        updatedPermissions[permissionId] = permissionId;
      }
      return updatedPermissions;
    });
  };

  if (!props.rolesPermissions) {
    return null;
  }

  return (
    <React.Fragment>
      {props.message && <Alert color="success">{props.message}</Alert>}

      <Form>
        <Row>
          {props.rolesPermissions.permissions &&
            props.rolesPermissions.permissions.map((permission) => (
              <Col key={permission.id} lg={3}>
                <Label check>
                  <Input
                    type="checkbox"
                    id={permission.id}
                    name="permission"
                    value={permission.name}
                    checked={rolePermissions ? permission.id in rolePermissions : ""}
                    onChange={() => handleCheckboxChange(permission)}
                  />
                  <span className="mx-2">{permission.name}</span>
                </Label>
              </Col>
            ))}
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary waves-effect" type="button" onClick={props.handleCancel}>Cancel</button>
            <button className="btn btn-primary waves-effect" type="button" onClick={() => props.handleEdit(rolePermissions)}>Save Role</button>
          </div>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default EditRolePermissionForm;
