import React from 'react';
import { useState, useEffect } from 'react'
import LOGO from '../../assets/images/logo.png';
import { Input, Avatar, Drawer, Button, Menu, PasswordInput, Image, Text } from '@mantine/core';
import { IconSearch, IconAlertOctagon, IconAt, IconKeyboard } from '@tabler/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UniversalCookies from 'universal-cookie';
import { adddata } from '../../redux/UserSlice';
import { loginState } from '../../redux/IsloginSlice'
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home';

function Navbar({ OnTextChange }) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openProfile, setOpenProfile] = useState(false)
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.islogin.value);
    const ProfileData = useSelector((state) => state.userdata.value);
    const navigate = useNavigate();
    // useEffect(() => {

    // }, [])
    const SignIn = () => {
        axios
            .post('http://localhost:3001/login',
                { email, password }
            )
            .then(((response) => {
                if (response.data.message === 'Successfully') {
                    dispatch(adddata(response.data));
                    dispatch(loginState(true))
                    const Cookie = new UniversalCookies();
                    Cookie.set('jwt', response.data.token, { path: '/' })
                    navigate('/dashboard');
                }
                alert(response.data.message);
            }));
    }
    return (
        <>
            <div className='flex justify-between bg-gray-600 p-5'>
                <div>
                    <Link to='/'><img className=' h-20 w-20' src={LOGO} alt="logo" /></Link>
                </div>
                {loginData ? (
                    <div>
                        <ul className='flex p-4'>
                            <li className='px-2 cursor-pointer self-center'>
                                <IconAlertOctagon color='white' onClick={() => setOpenDrawer(true)} />
                            </li>
                            <li className='px-2'>
                                {/* <Avatar component={Link} src={null} alt="userprofile" to="/profile" radius="xl" /> */}
                                <Avatar src={null} className='cursor-pointer' alt="userprofile" onClick={() => setOpenProfile(true)} radius="xl" />

                            </li>
                        </ul>
                    </div>) : ''
                }
                {
                    loginData ? ('') : (
                        <div>
                            <ul className='flex p-4'>
                                <li className='px-2 cursor-pointer self-center'>
                                    <Menu shadow="lg" width={260}>
                                        <Menu.Target>
                                            <Button className='text-white bg-transparent hover:text-yellow-400 hover:bg-transparent' variant='light'>Sign In</Button>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Label>Login</Menu.Label>
                                            <Input
                                                icon={<IconAt />}
                                                placeholder="Your email"
                                                onChange={(e) => SetEmail(e.target.value)}
                                            />
                                            <PasswordInput
                                                placeholder="Password"
                                                icon={<IconKeyboard />}
                                                description="Password must include at least one letter, number and special character"
                                                withAsterisk
                                                className='py-6'
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Button className='font-bold' variant="light" fullWidth color="orange" radius="xs" onClick={SignIn}>
                                                Login
                                            </Button>
                                        </Menu.Dropdown>
                                    </Menu>
                                </li>
                                <li className='px-2'>
                                    <Button component={Link} to='/register' color="yellow" variant='filled' radius="xl" size="md">
                                        Create new account
                                    </Button>
                                </li>
                            </ul>
                        </div>)}
            </div>
            <hr style={{ width: "50%" }} />
            {
                loginData ? (
                    <div>
                        <ul className='flex flex-wrap p-4 bg-gray-600 text-white'>
                            <li className='mx-4 text-yellow-300 rounded-lg'><Button component={Link} to="/dashboard" variant="subtle" color="dark">
                                Dashboard
                            </Button></li>
                            <li className='mx-4 text-yellow-300 rounded-lg'><Button component={Link} to='/hosting' variant="subtle" color="dark">
                                Hosting
                            </Button></li>
                            <li className='mx-4 text-yellow-300 rounded-lg'><Button component={Link} to='/files' variant="subtle" color="dark">
                                Files
                            </Button></li>
                            <li className='mx-4 text-yellow-300 rounded-lg'><Button component={Link} to='/upload' variant="subtle" color="dark">
                                Upload
                            </Button></li>
                            <li className='mx-4 text-yellow-300 rounded-lg'><Button component={Link} to='/suggestions' variant="subtle" color="dark">
                                Suggestions
                            </Button></li>
                        </ul>
                        < div >
                            <Drawer
                                opened={openDrawer}
                                onClose={() => setOpenDrawer(false)}
                                title="Notifications"
                                padding="xl"
                                size="md"
                                position='right'
                            >
                                Notifications
                                {/* Drawer content */}
                            </Drawer>

                        </div>
                        < div >
                            <Drawer
                                opened={openProfile}
                                onClose={() => setOpenProfile(false)}
                                // title="Notifications"
                                padding="xl"
                                size="md"
                                position='right'
                            ><div>
                                    <section>
                                        <div className='flex flex-nowrap '>
                                            <div>
                                                <Avatar src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80" className='cursor-pointer h-16 w-16' alt="userprofile" radius="xl" />
                                            </div>
                                            <div className='p-2'>
                                                <Text weight={700}>{ProfileData.UserInfo.name}</Text>
                                                <p><Text className='hover:text-blue-300' component={Link} to='/profile'>View full profile</Text></p>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div>
                                            <div>Email:<Text weight={700}>{ProfileData.UserInfo.email}</Text></div>
                                            <div>Address:<Text weight={700}>{ProfileData.UserInfo.addr}</Text></div>
                                            <div>Number:<Text weight={700}>{ProfileData.UserInfo.number}</Text></div>
                                            <div>Join Us On:<Text weight={700}>{ProfileData.UserInfo.date}</Text></div>
                                        </div>
                                    </section>
                                    <section className='mt-5'>
                                        <div>
                                            <Button radius='md' variant='outline' className='hover:bg-blue-600 hover:text-white' onClick={() => dispatch(loginState(false))}>Logout</Button>
                                        </div>
                                    </section>
                                </div>
                            </Drawer>

                        </div>
                    </div>) : ''
            }
            {/* {
                islogin?(
                    
                ):""
            } */}

        </>
    )
}

export default Navbar;