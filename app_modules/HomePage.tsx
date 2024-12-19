import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define a type for User
interface User {
    email: string;
    password: string;
    role: 'admin' | 'employee';
}

const LoginPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>(''); // Type email as string
    const [password, setPassword] = useState<string>(''); // Type password as string
    const [users, setUsers] = useState<User[]>([]); // Initialize users state as empty array
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Type currentUser state
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // State for toggling between login and registration

    // Load users from a temporary source (if you cannot use AsyncStorage)
    useEffect(() => {
        // Example of a mock list of users, you can load it from other sources if needed
        const savedUsers = [
            { email: 'admin@example.com', password: 'admin123', role: 'admin' },
            { email: 'employee@example.com', password: 'employee123', role: 'employee' },
        ];
        setUsers(savedUsers);
    }, []);

    // Handle User Login
    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('All fields are required for login!');
            return;
        }

        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            Alert.alert(`Welcome ${user.role}!`);
            navigation.navigate('Tasks');
        } else {
            Alert.alert('Invalid email or password');
        }
    };

    // Handle User Logout
    const handleLogout = () => {
        setCurrentUser(null); // Clear current user
        setEmail(''); // Clear email input
        setPassword(''); // Clear password input
        Alert.alert('You have successfully logged out.');
    };

    // Handle User Registration
    const handleRegistration = () => {
        if (!email || !password) {
            Alert.alert('All fields are required for registration!');
            return;
        }

        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
            Alert.alert('Email is already registered. Please log in.');
        } else {
            const newUser: User = { email, password, role: 'employee' }; // Default to 'employee' role
            setUsers([...users, newUser]); // Add new user to the users array
            Alert.alert('Registration successful! Please log in.');
            setIsRegistering(false); // Switch back to login view
            setEmail('');
            setPassword('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {currentUser ? (
                <View style={styles.innerContainer}>
                    <Text style={styles.headerText}>
                        Welcome, {currentUser.role}!
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.innerContainer}>
                    <Text style={styles.headerText}>
                        {isRegistering ? 'Register' : 'Login'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={isRegistering ? handleRegistration : handleLogin}
                    >
                        <Text style={styles.buttonText}>
                            {isRegistering ? 'Register' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => setIsRegistering(!isRegistering)}
                    >
                        <Text style={styles.linkText}>
                            {isRegistering
                                ? 'Already have an account? Login'
                                : 'Don’t have an account? Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b3b3b',
        marginBottom: 20,
        textAlign: 'center',
    },
    innerContainer: {
        width: '80%',
        maxWidth: 350,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    button: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#4caf50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
    },
    linkText: {
        color: '#4caf50',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginPage;
