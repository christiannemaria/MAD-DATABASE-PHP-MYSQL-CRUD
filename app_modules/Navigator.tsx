import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import EmployeeTasks from './EmployeeTasks';
import Tasks from './Tasks';
import LoginPage from './HomePage';


const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            {/* <Stack.Screen name='login' component={HomePage} /> */}
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name='Tasks' component={Tasks} />
            <Stack.Screen name="EmployeeTasks" component={EmployeeTasks} />
        </Stack.Navigator>
    );
}

export default Navigator;

