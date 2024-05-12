import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";

import "../../../../src/assets/scss/datatables.scss";
import {
  Col
} from "reactstrap";

const CostumerTable = (props) => {
  const [filterType, setFilterType] = useState("all"); // State for selected filter type

  // Define the columns based on the customer type
  const columns = [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 150,
    },
    {
      label: "Phone Number",
      field: "phone_number",
      sort: "asc",
      width: 150,
    },
  ];

  // Additional columns for professional customers
  const professionalColumns = [
    {
      label: "Company Name",
      field: "company_name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Industry Sector",
      field: "industry_sector",
      sort: "asc",
      width: 150,
    },
    {
      label: "Company Size",
      field: "company_size",
      sort: "asc",
      width: 150,
    },
    {
      label: "ICE",
      field: "ice",
      sort: "asc",
      width: 150,
    },
  ];

  // Rows data filtered by type
  const filteredRows = props.costumers.filter((customer) => {
    if (filterType === "all") return true; // Show all customers
    return customer.type === filterType;
  });

  // Generate rows based on filtered customers
  const rows = filteredRows.map((customer) => {
    const rowData = {
      id: customer.user.id,
      name: customer.user.name,
      email: customer.user.email,
      phone_number: customer.user.phone_number,
    };

    // Additional data for professional customers
    if (customer.type === "professional") {
      rowData.company_name = customer.company_name;
      rowData.industry_sector = customer.industry_sector;
      rowData.company_size = customer.company_size;
      rowData.ice = customer.ice;
    }

    return rowData;
  });

  // Combine columns based on customer type
  const data = {
    columns: [...columns, ...(filteredRows.some((c) => c.type === "professional") ? professionalColumns : [])],
    rows: rows,
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <React.Fragment>
<Col className="col-2 d-flex flex-column  my-2">
        <label htmlFor="filterType" className="form-label me-2">
          Filter by Type:
        </label>
        <select
          id="filterType"
          className="form-select"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="professional">Professional</option>
          <option value="particular">Particular</option>
        </select>
        </Col>
      <MDBDataTable responsive bordered data={data} />
    </React.Fragment>
  );
};

export default CostumerTable;
