import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import UniversalCookie from 'universal-cookie';
import axios from 'axios';
import { Button, Select, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PreviewImg from '../../assets/images/PreviewPhoto.jpg'

function Files() {
    function SetName(item) {
        const name = item.split('/');
        return name[name.length - 1];
    }
    function SetExtension(item) {
        const ext = item.split('.')
        return ext[ext.length - 1]
    }

    const Cookie = new UniversalCookie();
    const myCookie = Cookie.get("jwt");

    const [Img, setImg] = React.useState([]);
    const [FilterType, setfilterType] = React.useState('all');
    const [SearchQ, setSearchQ] = React.useState('')

    useEffect(() => {
        axios({
            url: "http://localhost:3001/fileupload",
            method: "get",
            headers: {
                "authorization": myCookie
            }
            // }).then((res) => console.log(res.data.fileArray));
        }).then((res) => setImg(res.data.fileArray));
    }, [])
    return (
        <>
            <section>
                <Navbar />
            </section>
            <section className='flex'>
                <div className='w-1/4 m-5'>
                    <div>
                        <div className='m-4'>
                            <Input
                                icon={<IconSearch />}
                                placeholder="Search Here"
                                variant='filled'
                                onChange={(e) => setSearchQ(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Select
                            label="Filter by type"
                            placeholder="Filter"
                            defaultValue='all'
                            className='m-4'
                            onChange={(e) => setfilterType(e)}
                            data={[
                                { value: 'all', label: 'all' },
                                { value: 'jpg', label: 'jpg' },
                                { value: 'png', label: 'png' },
                                { value: 'pdf', label: 'pdf' },
                                { value: 'docx', label: 'docx' },
                                { value: 'pptx', label: 'pptx' },
                                { value: 'exe', label: 'exe' },
                                { value: 'xlsx', label: 'xlsx' },
                                { value: 'jpeg', label: 'jpeg' },
                            ]}
                        />
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {
                        Img.map((item) => {
                            if (FilterType === 'all') {
                                if (SetName(item).includes(SearchQ)) {
                                    return (
                                        <div className='w-64 p-5'>
                                            <div>
                                                <img src={`http://localhost:3001/files${item}`} alt='loading' onError={(e) => e.target.src = 'https://cdn.dribbble.com/users/2454123/screenshots/7466307/1234_4x.jpg'} className='w-screen h-36' />
                                            </div>
                                            <div className='self-center text-center bg-slate-300 font-bold'>
                                                {SetName(item)}<br></br>
                                            </div>
                                            <div className=''>
                                                <div className='flex flex-wrap justify-around'>
                                                    <a href={`http://localhost:3001/files${item}`} target={null}><Button radius='md' variant='subtle' color='blue'>View</Button></a>
                                                    <Button type radius='md' variant='subtle' color='green'>Download</Button>
                                                </div>
                                                <div className='self-center text-center'>
                                                    <Button color='red' radius='md' variant='subtle' className='hover:bg-red-600 hover:text-white'>{<DeleteOutlineIcon />}Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            else if (FilterType === SetExtension(item)) {
                                if (SetName(item).includes(SearchQ)) {
                                    return (
                                        <>
                                            <div className='w-64 p-5'>
                                                <div>
                                                    <img src={`http://localhost:3001/files${item}`} onError={(e) => e.target.src = 'https://cdn.dribbble.com/users/2454123/screenshots/7466307/1234_4x.jpg'} alt='loading' className='w-screen h-36' />
                                                </div>
                                                <div className='self-center text-center bg-slate-300 font-bold'>
                                                    {SetName(item)}
                                                </div>
                                                <div className=''>
                                                    <div className='flex flex-wrap justify-around'>
                                                        <a href={`http://localhost:3001/files${item}`} target={null}><Button radius='md' variant='subtle' color='blue'>View</Button></a>
                                                        <Button type radius='md' variant='subtle' color='green'>Download</Button>
                                                    </div>
                                                    <div className='self-center text-center'>
                                                        <Button color='red' radius='md' variant='subtle' className='hover:bg-red-600 hover:text-white'>{<DeleteOutlineIcon />}Delete</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            }
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Files