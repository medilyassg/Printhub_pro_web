import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import "../../../../assets/scss/datatables.scss";
import { useState } from "react";


import usePermissions from "helpers/permissions";




const TransactionsTable = (props) => {
    const [modal_products, setmodal_products] = useState(false);
    const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
    useEffect(() => {
        checkUserPermissions();

    }, [])

    const downloadInvoice = (invoiceUrl) => {
        if (!invoiceUrl) {
            console.error('Invoice URL is null or undefined');
            return;
        }
    
        // Construct the full URL for downloading the invoice
        const fullUrl = `http://127.0.0.1:8000/storage/${invoiceUrl}`;
    
        // Create a link element
        const link = document.createElement('a');
        link.href = fullUrl;
        link.setAttribute('download', `invoice_${invoiceUrl.split('/').pop()}`);
        // Append the link to the body
        document.body.appendChild(link);
        // Programmatically trigger the click event to start the download
        link.click();
        // Remove the link from the DOM once the download is completed
        link.parentNode.removeChild(link);
    };
    
    

    

    const data = {
        columns: [
            {
                label: "Id",
                field: "id",
                sort: "asc",
                width: 150,
            },
            {
                label: "Order Id",
                field: "order_id",
                sort: "asc",
                width: 150,
            },
            {
                label: "Payment Method",
                field: "payment_method",
                sort: "asc",
                width: 150,
            },
            {
                label: "Amount",
                field: "amount",
                sort: "asc",
                width: 150,
            },
            {
                label: "Status",
                field: "status",
                width: 150,
            },
            {
                label: "Invoice",
                field: "invoice",
                width: 150,
            },
        ],
        rows: props.transactions?.map(trans => ({
            id: trans.id,
            order_id:trans.order_id,
            payment_method:trans.payment_method,
            amount:trans.amount,
            status: (
                <div className="d-flex align-items-center">
                  {trans.status === 'failed' ? (
                    <span className="badge rounded-pill bg-danger">{trans.status}</span>
                  ) : trans.status === 'completed' ? (
                    <span className="badge rounded-pill bg-success">{trans.status}</span>
                  ) : (
                    <span className="badge rounded-pill bg-primary">{trans.status}</span>
                  )}
                </div>
              ),
              invoice: trans.invoice ? (
                <button className="btn btn-primary btn-sm" onClick={() => downloadInvoice(trans.invoice)}>
                    Download Invoice
                </button>
            ) : (
                <span>No Invoice</span>
            ),
        }))
    };


    document.title = "Orders Table";

    return (
        <React.Fragment>
            
            <MDBDataTable responsive bordered data={data} />
        </React.Fragment>
    );
};

export default TransactionsTable;
