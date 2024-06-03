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

const MyDocument = (props) => {
  const [CompanyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("http://127.0.0.1:8000/api/company-info");
        const data = response[0];
        setCompanyInfo(data);
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
          <Image src={CompanyInfo ? `http://127.0.0.1:8000/storage/${CompanyInfo.logo}` : ""} style={{ width: 100, height: 60 }} />
          <View>
            <Text style={[styles.headerText, styles.textRight]}>Devis #1</Text>
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
            <Text>{props.user.customer ? props.user.customer.company_name ? props.user.customer.company_name : props.user.name + ' ' + props.user.last_name : ""}</Text>
            <Text>{props.user.address.length > 0 ? props.user.address[0].city + "," + props.user.address[0].line : ""}</Text>
            <Text>{props.user.city}</Text>
            <Text>{props.user.region}</Text>
            <Text>{props.user.address.length > 0 ? props.user.address[0].zip : ""}</Text>
            <Text>{props.user.country}</Text>
            <Text>Identifiant Commun d'Entreprise :{props.user.customer ? props.user.customer.ice : ""}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.bold, { width: '50%' }]}>Élément</Text>
            <Text style={[styles.tableCell, styles.bold, { width: '25%' }]}>Quantité</Text>
            <Text style={[styles.tableCell, styles.bold, { width: '25%' }]}>Total</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { width: '50%' }]}>
              <Text style={[styles.bold, { color: "" }]}>{props.product.name}</Text>
              {props.properties &&
                <div style={{ margin: 20 }}>
                  {Object.keys(props.properties).map((categoryId) => (
                    <ListItem key={categoryId}>
                      {props.properties[categoryId].category}: {props.properties[categoryId].property.name}
                    </ListItem>
                  ))}
                </div>
              }
            </View>
            <Text style={[styles.tableCell, { width: '25%' }]}>{props.product.quantity}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{props.total}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>La commande doit être effectuée directement sur le site printHub.ma</Text>
          <Text>Le service commercial</Text>
          <Image src={CompanyInfo && `http://127.0.0.1:8000/storage/${CompanyInfo.printed_footer}`} style={{ width: '100%', height: 40, marginTop: 10 }} />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
