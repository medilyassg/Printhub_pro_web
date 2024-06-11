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
    <div className="container">
      {bankInfo.map((bank, index) => (
        <div key={index} className="card border-dark mb-4 shadow-sm mx-auto" style={{ maxWidth: '50%    ' }}>
          <div className="card-body text-center">
            <h5 className="card-title text-danger">{bank.bank_name}</h5>
            <p className="card-text">{bank.holder_name}</p>
          </div>
          <table className="table table-sm table-bordered mb-0">
            <tbody>
              <tr>
                <td className="font-weight-bold">Numéro de compte</td>
                <td>{bank.num_rip}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Clé Rib</td>
                <td>{bank.cle_rip}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Code Swift</td>
                <td>{bank.code_swift}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default VirmentBancaire;
