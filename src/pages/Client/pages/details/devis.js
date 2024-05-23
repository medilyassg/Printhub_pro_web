import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import logoSm from "../../../../assets/images/logo-sm.png";


const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Times-Roman',
    },
    header: {
      marginBottom: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      fontSize: 10,
    },
    section: {
      marginBottom: 20, // Increased margin to add space between sections
      fontSize: 10,
    },
    table: {
      display: 'table',
      width: 800,
      margin:20
    },
    tableRow: {
      flexDirection: 'row',
      width:400
  
    },
    tableCell: {
      padding: 10,
      fontSize: 10,
      width:400
    },
    bold: {
      fontWeight: 'bold',
      fontSize:12
    },
    title: {
      fontSize: 12,
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    textCenter: {
      textAlign: 'center',
    },
    textRight: {
      textAlign: 'right',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      marginBottom: 20, // Margin to add space after the line
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
  // Create Document Component
const MyDocument = (props) => {
    return <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src={logoSm} style={{ width: '100%', height: 60 }} />
      </View>

      <View style={styles.section}>
      <Text style={styles.textRight}>Casablanca le, {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
      </View>

      <View style={styles.section}>
        <Text >A l'attention de Mr-Mrs {props.user.name} {props.user.last_name}</Text>
        <Text>
          Nous vous remercions pour votre consultation, et avons le plaisir de vous donner ci-après notre meilleure offre de prix concernant :
        </Text>
      </View>

      <View style={styles.section}>
        
        <Text style={styles.bold}> Devis : </Text> <Text style={{margin:20}}>{props.product.name}</Text>
      </View>

      <View style={styles.hr} />

      <View style={styles.section}>
        <Text style={styles.bold}>Description :</Text>
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

      <View style={styles.hr} />

      <View style={styles.section}>
        <Text style={styles.bold}>Offre :</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.bold,styles.tableCell]}>Quantité</Text>
            <Text style={[styles.bold,styles.tableCell]}>P.U.HT</Text>
            <Text style={[ styles.bold,styles.tableCell]}>Total HT</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3000</Text>
            <Text style={styles.tableCell}>0.81 Dhs</Text>
            <Text style={styles.tableCell}>{props.total}</Text>
          </View>
        </View>
      </View>

      



      <View style={styles.footer}>
        <Text>La commande doit être effectuée directement sur le site printHub.ma</Text>
        <Text>Le service commercial</Text>
        <Image src={logoSm} style={{ width: '100%', height: 40, marginTop: 10 }} />
      </View>
    </Page>
  </Document>
}



export default MyDocument;