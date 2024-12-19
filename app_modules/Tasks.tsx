import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import axios from 'axios';

// Get device dimensions
const { width } = Dimensions.get('window');
const isTabletOrLarger = width >= 768;

const HomePage = () => {
  const navigation = useNavigation(); // Use the hook to get navigation object
  const [modalVisible, setModalVisible] = useState(false);
  const [viewInfoModalVisible, setViewInfoModalVisible] = useState(false); // State for View Info modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [refreshData, setRefreshData] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ name: '', position: '', image: '', email: '', phone: '' }); // State for employee form
  const [employees, setEmployees] = useState([
          { id: '1', name: 'CHRISTIAN JAQUE NEMARIA', position: 'Front-end/Back-end Web Developer', image: 'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/470575676_2049665318879016_4563781141201727469_n.jpg?stp=c8.26.169.169a_dst-jpg_p200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHfcUa0ZiRiAmp4w-wb_-JY3xsJ7nkEuN3fGwnueQS43dS5QIo-YMhm1B8ssreZmLtBisxgKmKVkY7hwDNClUwS&_nc_ohc=j9azeSl-SwUQ7kNvgF3jNsX&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=AC93lmPKnTUiFqGXKNj5oVK&oh=00_AYDSh_3wNWwe6C1ljZlJbfPEymTjDg-xqpmhFNgvlpHj_Q&oe=67696234' },
          { id: '2', name: 'JAYRALD ANGCAP', position: 'Front-end/Back-end Web Developer', image: 'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-6/441335362_360627913655193_9146102859858421880_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeF-Bftt5EldAQLCfiR4GAOnHiHdXKaL7-keId1cpovv6TNSdYLfeKiplOExxRNrcdeoMjufmEtbX8pw-jMg4-yu&_nc_ohc=tztgYO_icHEQ7kNvgHlWdQj&_nc_zt=23&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=APhtSKCOpgwFSUq0fdKOn4u&oh=00_AYBxP83fpNx92nmD3lTH9Y-2h0x2ZvI32etitSYkWJJy6A&oe=67695C6B' },
          { id: '3', name: 'ALHAIDA ULA', position: 'Web Designer', image: 'https://pics.craiyon.com/2023-09-25/103d99738957493a8e279bced4120860.webp' },
          { id: '4', name: 'ANGEL KAYE BACONG', position: 'Web Designer', image: 'https://scontent-mnl1-2.xx.fbcdn.net/v/t1.15752-9/462638397_474734698554901_5849722043871620222_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHVOYt_b1Cw92edoTFzmeJuNGrbp8Vcvt00atunxVy-3QrChXZPXVZ2FI6eeG_sI5PsE85xnQhUsZpSVnbVSWru&_nc_ohc=ihKHD2OfvFIQ7kNvgFHo5G2&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&oh=03_Q7cD1QEfRzYshjJSn5wbDJVeVvoteugBu1o0P6FY23ztKivHqQ&oe=678201DD' },
          { id: '5', name: 'GILBERT GALLEGA', position: 'Front-end Developer', image: 'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/351489545_217901307763481_8577635116998410411_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEdpJnJsQRl0p2DgZ9eWUvixo6NAmYHivTGjo0CZgeK9EZeRIaMJFndDlafr--fETsCMW9aA7srn6YEpLmGjS6P&_nc_ohc=v_dYhK9M5BkQ7kNvgEWPHAg&_nc_zt=24&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=AvzTUKRbINX7agiNqu8HRRL&oh=00_AYCSEvc8bGn18mP0XG427IX3_3MiDZbcxyilUyH0ztbf_A&oe=67696090' },
          { id: '6', name: 'RENZ CADAYONA', position: 'Back-end Developer', image: 'https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/378321785_1374456766818996_2956290090837491404_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeEF3CYr8mzNxc5tnM4BUpThXCvBJJHeFRRcK8Ekkd4VFD-IpbQYueKWMvs6D2V7ITM4a3yMLq9cRVR2sTjr4nyD&_nc_ohc=kdeTT97tCh4Q7kNvgHIIu48&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=A-xz7ob65eszPtDqS49Nnml&oh=00_AYCDCadfvn-LUQEYcQLqWgib44TISVs2_7hUYEf3eLAFJw&oe=67697D6A' },
          { id: '7', name: 'WINNIE LORICHE', position: 'Web Designer', image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t39.30808-6/463145109_559092580009474_4358100960630991051_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeE72i9E7T3vCgUjlLERHVUpGNz1alBfPUYY3PVqUF89Roi3hkJnZ-Kbd54_pdKNxFihBZrYdFMkuHQT6IqpTikP&_nc_ohc=qARAJsGTor8Q7kNvgFgz-6z&_nc_zt=23&_nc_ht=scontent.fmnl9-1.fna&_nc_gid=AF2LLFbJuZjE2Y0eQ4fF68V&oh=00_AYBjzTZn-DQ6vPMvy0otJPXbPSAXKfE4dJvPhq-3gLQVRQ&oe=67698394' },
          { id: '8', name: 'EMELIO ALICAYA', position: 'UI/UX Designer', image: 'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/429570871_785529836957640_3240873305683850193_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeE0GL85E8Sl1zDVzpDvK0FxeF8HoBtYBo54XwegG1gGjierkZSnMmkL_ND-7W1aLOOkFDAaz81njStdVJtha_k-&_nc_ohc=qH24xgpxGGAQ7kNvgFX0XGk&_nc_zt=23&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=ANRmQNwacg3aP554jxZB0iU&oh=00_AYCpHqYxP0zt_Mt_5n465vDJlk9Su9IQ6yvdRMPd9AWdag&oe=6769824A' },
          { id: '9', name: 'PROCEJAY ONGUE', position: 'Full-stack Developer', image: 'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/468754938_599834129368701_696706513089714405_n.jpg?stp=c0.0.600.600a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFaKZpRlwUud7EnMe76Q5ddFMTKD9VjZGQUxMoP1WNkZIxLnwP4hjSLoFwOTYl-0y-GTWOb51OVE67DqY72eHQa&_nc_ohc=ErDwQSV56KwQ7kNvgFk7pA6&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=AjqArfzrvZMoVmOmaHw8mDb&oh=00_AYBkRxfq69ljV4XJVNMH3iZfEqhQmhdfTVxm04SKJY41Lg&oe=676983C7' },
          { id: '10', name: 'LESTER MHOKTAR ISMAEL', position: 'Front-end Developer', image: 'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/460803353_910654067788634_5301930002031259509_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG20UCMMHNkP2jZygdHEx6ZJ8ky6p2puTgnyTLqnam5ODwo7oST_Qw-4vFKTRlsT19SIlBeM3ORAa5ZSaDuN6Me&_nc_ohc=koOS0VxpzCEQ7kNvgGTJuPw&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=A6zqtuigxGdXkj-_NH4BHro&oh=00_AYDUz41H2NAHCUgWoWkDEna-x0tPPEXJq8yH1AYk8Kvy7Q&oe=676983D3' },
          { id: '11', name: 'GUEL SALUD', position: 'Web Designer', image: 'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/441486916_1040131194787726_1757587353289613912_n.jpg?stp=c0.24.720.720a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGsXlvBLnUBr8HFzOaUQcy_141e9vjwCsDXjV72-PAKwC0nsfvSNfPTP2TfGNwUo-dVCeC0T0g5CSjh2vOpFBDK&_nc_ohc=izpEee2soycQ7kNvgEMB6-o&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=AjmBtDLCwO0i0fjEyRhjqsk&oh=00_AYDM0c4W0cakPLZzKChNkbpHa8t5kTHGRN7RYGcQJ7H-UA&oe=6769936D' },
      ]);


  


const HandleFormSubmit = async () => {
  
};    

  
  const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

  const handleFormChange = (field, value) => setEmployeeForm({ ...employeeForm, [field]: value });

  const handleFormSubmit = async () => {
    if (!employeeForm.name || !employeeForm.position || !employeeForm.email || !employeeForm.phone) {
      alert("Please fill in all fields.");
      console.log("Form validation failed: Missing required fields.");
      return;
    }
  
    const url = "http://localhost:3000/databases/index.php";
    console.log("Request URL:", url);
  
    const employeeData = {
      EmpName: employeeForm.name,
      EmpPosition: employeeForm.position,
      EmpImage: employeeForm.image,
      EmpEmail: employeeForm.email,
      EmpPhone: employeeForm.phone,
    };
    console.log("Data to be sent:", employeeData);
  
    try {
      const response = await axios.post(url, employeeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response from PHP:", response.data);
      setEmployeeForm({ name: '', position: '', image: '', email: '', phone: '' });
      setModalVisible(false);
      setRefreshData(true);
      alert("Employee saved successfully!");
    } catch (error: any) {  // Explicitly typing error as 'any'
      console.error("Error saving employee:", error);
  
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };


  const handleDeleteEmployee = (id) => setEmployees(employees.filter(employee => employee.id !== id));
  
  const handleViewInfo = () => setViewInfoModalVisible(true);
  const currentEmployee = selectedEmployee || employees[0];

  const handleLogout = () => {
    // Navigate back to the Login page
    navigation.replace('LoginPage'); 
  };

  const handleEditEmployee = () => {
    const updatedEmployees = employees.map(emp => 
      emp.id === employeeForm.id ? { ...emp, ...employeeForm } : emp
    );
    setEmployees(updatedEmployees);
    setModalVisible(true);
    setEmployeeForm({ name: '', position: '', image: '', email: '', phone: '' });
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>GROUP7IM</Text>
      </View>

      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
        <Text style={styles.mainText}>EMPLOYEE MANAGEMENT SYSTEM</Text>


        {modalVisible && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Edit Employee</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={employeeForm.name}
          onChangeText={(text) => handleFormChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          value={employeeForm.position}
          onChangeText={(text) => handleFormChange('position', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={employeeForm.image}
          onChangeText={(text) => handleFormChange('image', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={employeeForm.email}
          onChangeText={(text) => handleFormChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={employeeForm.phone}
          onChangeText={(text) => handleFormChange('phone', text)}
        />
        <Button title="Save" onPress={handleEditEmployee} />
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

        {/* Employee Card Section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image source={{ uri: currentEmployee.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{currentEmployee.name}</Text>
              <Text style={styles.cardDescription}>{currentEmployee.position}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.viewButton} onPress={handleViewInfo}>
                <Text style={styles.viewButtonText}>View Info</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEmployee(currentEmployee.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => { setEmployeeForm(currentEmployee); setModalVisible(true); }}>
              <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> 

        {/* View Info Modal */}
        {viewInfoModalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={viewInfoModalVisible}
            onRequestClose={() => setViewInfoModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Employee Details</Text>
                <Image source={{ uri: currentEmployee.image }} style={styles.modalImage} />
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Name:</Text> {currentEmployee.name}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Position:</Text> {currentEmployee.position}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Email:</Text> {currentEmployee.email || 'N/A'}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Phone:</Text> {currentEmployee.phone || 'N/A'}</Text>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setViewInfoModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Modal Button for Adding Employee */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>

       
         {/* Modal Component for Employee Form */}
         {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Employee</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={employeeForm.name}
                  onChangeText={(text) => handleFormChange('name', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Position"
                  value={employeeForm.position}
                  onChangeText={(text) => handleFormChange('position', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Image URL"
                  value={employeeForm.image}
                  onChangeText={(text) => handleFormChange('image', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={employeeForm.email}
                  onChangeText={(text) => handleFormChange('email', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={employeeForm.phone}
                  onChangeText={(text) => handleFormChange('phone', text)}
                />
                
                <Button title="Save" onPress={handleFormSubmit} />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

            {/* Employee List Section */}
        <View style={styles.listContainer}>
          {employees.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() => handleEmployeeSelect(item)}
            >
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemDescription}>{item.position}</Text>
            </TouchableOpacity>
          ))}
        </View>
          
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  editButton: {
    backgroundColor: 'orange', // Color of the button
  padding: 5,
  borderRadius: 5,
  width: 80, // Same width as the delete button
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 5,
  },
  editButtonText: {
    color: '#fff',
  fontSize: 14,
  },
  
  logoutButton: {
  position: 'absolute', // Place the button using absolute positioning
  right: 20, // Position it from the right edge
  top: 10, // Position it slightly from the top
  backgroundColor: 'red',
  paddingVertical: 5, // Reduce vertical padding
  paddingHorizontal: 10, // Adjust horizontal padding
  borderRadius: 5,
  },
  logoutButtonText: {
  color: 'white', 
  fontSize: 14, // Make the text size smaller
  },
  listContainer:{
    marginTop: 20,
  },
  listItem:{
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemTitle:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDescription:{
    fontSize: 14,
    color: '#555',
  },

    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color:'skyblue',
    },
    content: {
      marginTop: 20,
    },
    mainText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color:'skyblue',   },
      cardContainer: {
      alignItems: 'center',
      marginBottom: 20,
      fontStyle: 'italic',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
      width: '100%',
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: 14,
      color: '#555',
    },
    actionButtons: {
      flexDirection: 'row',
    },
    viewButton: {
      backgroundColor: 'skyblue',
      padding: 5,
      borderRadius: 5,
      marginRight: 5,
    },
    viewButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, 
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    addButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight:'bold',
    },
    modalContainer: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center', 
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 5,
    },
    modalLabel: {
      fontWeight: 'bold',
    },
    modalCloseButton: {
      backgroundColor: '#6200ea',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    modalCloseButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      width: '100%',
    },
});

export default HomePage; 