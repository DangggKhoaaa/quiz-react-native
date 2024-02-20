import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Profile from '../screen/Profile';
import LogoutScreen from '../screen/LogoutScreen';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Trang chủ" component={Home} />
            <Drawer.Screen name="Thông tin" component={Profile} />
            <Drawer.Screen name="Đăng xuất" component={LogoutScreen} />
        </Drawer.Navigator>
    );
};

export default MyDrawer;