import React from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Profile from '../screen/Profile';
import LogoutScreen from '../screen/LogoutScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangePassword from '../screen/ChangePassword';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => (
                <DrawerContentScrollView {...props}>
                    <DrawerItem
                        label="Trang chủ"
                        onPress={() => props.navigation.navigate('Trang chủ')}
                        icon={() => (
                            <Icon name="home" size={25} color="gray" />
                        )}
                    />
                    <DrawerItem
                        label="Thông tin"
                        onPress={() => props.navigation.navigate('Thông tin')}
                        icon={() => (
                            <Icon name="vcard" size={20} color="gray" />
                        )}
                    />
                    <DrawerItem
                        label="Đổi mật khẩu"
                        onPress={() => props.navigation.navigate('Đổi mật khẩu')}
                        icon={() => (
                            <Icon name="cog" size={25} color="gray" />
                        )}
                    />
                    <DrawerItem
                        label="Đăng xuất"
                        onPress={() => props.navigation.navigate('Đăng xuất')}
                        icon={() => (
                            <Icon name="sign-out" size={25} color="gray" />
                        )}
                    />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen name="Trang chủ" component={Home} />
            <Drawer.Screen name="Thông tin" component={Profile} />
            <Drawer.Screen name="Đổi mật khẩu" component={ChangePassword} />
            <Drawer.Screen name="Đăng xuất" component={LogoutScreen} />
        </Drawer.Navigator>
    );
};

export default MyDrawer;