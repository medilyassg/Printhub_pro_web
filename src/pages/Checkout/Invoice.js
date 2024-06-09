import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { get } from 'helpers/api_helper';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    border: '1px solid #001',
  },
  header: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'normal',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
  },
  section: {
    marginBottom: 30,
    fontSize: 9,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2px',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 'solid 1px #ADD8E6',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderRight: 'solid 1px #ADD8E6',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#101481',
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#f3f3f3',
  },
  column: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  listItemContent: {
    flex: 1,
    fontSize: 10,
  },
});
const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.listItemContent}>{children}</Text>
  </View>
);

const Invoice = (props) => {
    const [CompanyInfo, setCompanyInfo] = useState(null);
    const [logoBase64, setLogoBase64] = useState("");
    const [footerBase64, setFooterBase64] = useState("");
  
    const authUser = JSON.parse(localStorage.getItem('authUser'));
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await get("http://127.0.0.1:8000/api/company-info");
          const data = response[0];
          setCompanyInfo(data);
  
          const logoResponse = await get(`http://127.0.0.1:8000/api/base64?logoFileName=${data.logo}`);
          setLogoBase64(logoResponse.base64);
          const fotterResponse = await get(`http://127.0.0.1:8000/api/base64?logoFileName=${data.printed_footer}`);
          setFooterBase64(fotterResponse.base64);
        } catch (error) {
          console.error('Error fetching company info:', error);
        }
      };
      
      fetchData();
    }, []);
  
    
  



  return (
    <Document style={{ border: '1px solid #001', margin: 20 }}>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
        {logoBase64 && <Image src={`data:image/png;base64,${logoBase64}`} style={{ width: 100, height: 60 }} />}
          <View>
            <Text style={[styles.headerText, styles.textRight]}>Invoice #1</Text>
            <Text style={styles.headerText}>Date: {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
        </View>

        {/* Company and Client Information */}
        <View style={{ flexDirection: 'row', columnGap: "80px", marginBottom: 20 }}>
          <View style={[styles.section, styles.column]}>
            <Text style={styles.bold}>{CompanyInfo && CompanyInfo.company_name}</Text>
            <Text>{CompanyInfo && CompanyInfo.address}</Text>
            <Text>Téléphone: {CompanyInfo && CompanyInfo.phone_number}</Text>
            <Text>Email: {CompanyInfo && CompanyInfo.email}</Text>
            <Text>Site: {CompanyInfo && CompanyInfo.site}</Text>
            <Text>Numéro de TVA: {CompanyInfo && CompanyInfo.tva}</Text>
            <Text>Identifiant Commun d'Entreprise: {CompanyInfo && CompanyInfo.ice}</Text>
          </View>
          <View style={[styles.section, styles.column]}>
            <Text style={styles.bold}>Client</Text>
            <Text>{authUser.user.customer ? authUser.user.customer.company_name ? authUser.user.customer.company_name : authUser.user.name + ' ' + authUser.user.last_name : ""}</Text>
            <Text>{authUser.user.address.length > 0 ? authUser.user.address[0].city + "," + authUser.user.address[0].line : ""}</Text>
            <Text>{authUser.user.city}</Text>
            <Text>{authUser.user.region}</Text>
            <Text>{authUser.user.address.length > 0 ? authUser.user.address[0].zip : ""}</Text>
            <Text>{authUser.user.country}</Text>
            <Text>Identifiant Commun d'Entreprise :{authUser.user.customer ? authUser.user.customer.ice : ""}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.bold, { width: '50%' }]}>Élément</Text>
            <Text style={[styles.tableCell, styles.bold, { width: '25%' }]}>Quantité</Text>
            <Text style={[styles.tableCell, styles.bold, { width: '25%' }]}>Total</Text>
          </View>
          {/* Render products from order */}
          {props.order && props.order.products.map((product, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={[styles.tableCell, { width: '50%' }]}>
                <Text style={[styles.bold, { color: "" }]}>{product.product.name}</Text>
                {/* Render product details */}
                {product.details && (
  <View style={{ margin: 20 }}>
    {Object.values(JSON.parse(product.details)).map((detail, index) => (
      <Text key={index}>{detail.category}: {detail.property.name}</Text>
    ))}
  </View>
)}
              </View>
              <Text style={[styles.tableCell, { width: '25%' }]}>{product.quantity}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{product.price} MAD</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 20, textAlign: 'right' }}>
  <Text style={styles.bold}>Total TTC: {props.order && props.order.total_amount} MAD</Text>
</View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text>La commande doit être effectuée directement sur le site printHub.ma</Text>
          <Text>Le service commercial</Text>
          {footerBase64 && <Image src={`data:image/png;base64,${footerBase64}`} style={{ width: 100, height: 60 }} />}
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
