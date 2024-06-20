import React, { useEffect, useState } from 'react';
import { get } from 'helpers/api_helper'; // Ensure this helper function is correctly set up

const VirmentBancaire = () => {
  const [bankInfo, setBankInfo] = useState([]);

  useEffect(() => {
    // Fetch the bank information from the Laravel backend
    const fetchBankInfo = async () => {
      try {
        const response = await get('http://127.0.0.1:8000/api/banks'); // Adjust the URL as per your Laravel API endpoint
        setBankInfo(response);
      } catch (error) {
        console.error('Error fetching bank info:', error);
      }
    };

    fetchBankInfo();
  }, []);

  if (bankInfo.length === 0) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h3 className="text-success">Your order is pending</h3>
        <p className="text-info">Please choose a bank to make the payment</p>
      </div>
      <div className="row justify-content-center">
        {bankInfo.map((bank, index) => (
          <div key={index} className="col-md-8 mb-4">
            <div className="card border-dark shadow-lg h-100">
              <div className="card-body">
                <div className="text-center mb-3">
                  <h5 className="card-title mb-1 text-danger">{bank.bank_name}</h5>
                  <p className="card-text mb-0">Relevé d'Identité Bancaire</p>
                </div>
                <div className="text-center mb-3">
                  <p className="card-text">{bank.holder_name}</p>
                  <p className="card-text">Références Bancaires</p>
                </div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">Numéro de compte</td>
                      <td colSpan="3">{bank.num_rip}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Clé Rib</td>
                      <td>{bank.cle_rip}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mt-3">
                  <p className="card-text mb-0">CODE SWIFT: {bank.code_swift}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirmentBancaire;
