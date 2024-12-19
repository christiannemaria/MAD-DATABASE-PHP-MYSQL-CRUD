import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmployeeTasks = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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
    

    const handleViewInfo = (employee) => {
        setSelectedEmployee(employee);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.employeeImage} />
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.position}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewInfo(item)}>
                <Text style={styles.viewButtonText}>View Info</Text>
            </TouchableOpacity>
        </View>
    );

    const handleLogout = () => {
        navigation.replace('LoginPage');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.welcomeText}>Employee Management System</Text>
            <Text style={styles.infoText}>You have limited access to the system.</Text>

            <FlatList
                data={employees}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.list}
            />

            {modalVisible && selectedEmployee && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Employee Information</Text>
                            <Image source={{ uri: selectedEmployee.image }} style={styles.modalImage} />
                            <Text style={styles.modalName}>{selectedEmployee.name}</Text>
                            <Text style={styles.modalPosition}>{selectedEmployee.position}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    list: {
        width: '100%',
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 20,
    },
    employeeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#777',
    },
    viewButton: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16
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
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    modalImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalPosition: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
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
        color: '#fff',
        fontSize: 16,
    },
});

export default EmployeeTasks;