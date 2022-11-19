import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import UniversalCookie from 'universal-cookie';
import axios from 'axios';
import { Button, Checkbox } from '@mantine/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Files() {
    function SetName(item) {
        const name = item.split('/')
        return name[name.length - 1];
    }
    function FilterFile(item) {
        const file = item.split('.');
        // console.log(file[file.length - 1])
        return file[file.length - 1]
    }
    const Cookie = new UniversalCookie();
    const myCookie = Cookie.get("jwt");
    const [Img, setImg] = React.useState([]);
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
                <div className='w-1/4'>
                    <div>
                        <h1>Filter by type</h1>
                    </div>
                    <div className='list-none ml-9 mt-3'>
                        <li>{<Checkbox size='md' label='Images' />}</li>
                        <li>{<Checkbox size='md' label='png' />}</li>
                        <li>{<Checkbox size='md' label='pdf' />}</li>
                        <li>{<Checkbox size='md' label='exe' />}</li>
                        <li>{<Checkbox size='md' label='pptx' />}</li>
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {
                        Img.map((item) => {
                            return (
                                <div key={item} className='relative w-48 m-5'>
                                    <div>
                                        <img src={`http://localhost:3001/files/${item}`} alt="loading" className='w-screen h-32' />
                                        <h1>{SetName(item)}</h1>
                                        {/* <i>{FilterFile(item)}</i> */}
                                    </div>
                                    <div className='flex self-center justify-between text-center'>
                                        <a href={`http://localhost:3001/files${item}`} target="_blank"><Button radius='md' variant='subtle' color='blue'>View</Button></a>
                                        <Button type radius='md' variant='subtle' color='green'>Download</Button>
                                    </div>
                                    <div className='text-center self-center'>
                                        <Button color='red' radius='md' variant='subtle' className='hover:bg-red-600 hover:text-white'>{<DeleteOutlineIcon />}Delete</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Files