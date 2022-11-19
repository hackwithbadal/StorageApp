import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Group, Text, useMantineTheme, Button, } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconCross } from '@tabler/icons';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import UniversalCookie from 'universal-cookie';

function Upload(props) {
  const theme = useMantineTheme();
  const [UploadFiles, setUploadFile] = useState([]);
  const [ErrorUpload, setErrorUpload] = useState();
  const [ServerResp, setServerResp] = useState('');
  const PushFiles = async (e) => {
    try {
      e.preventDefault();
      const Cookie = new UniversalCookie();
      const ServerCookie = Cookie.get("jwt");
      await axios({
        method: "post",
        url: "http://localhost:3001/fileupload",
        data: UploadFiles,
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": ServerCookie
        }
      }).then((resp) => {
        alert(resp.data.message)
        setUploadFile(false);
      })
      // }).then((resp) => setServerResp(resp.data.message))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section>
        <Navbar />
      </section>
      <div className='m-16'>
        <section>
          <Dropzone
            onDrop={(files) => setUploadFile(files)}
            onReject={(files) => setErrorUpload(files)}
            maxSize={3 * 1024 ** 2}
            accept={MIME_TYPES}
            name="files"
            {...props}
          >
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload
                  size={50}
                  stroke={1.5}
                  name="files"
                  color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={50}
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={50} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </section>
        <section className='flex'>
          <div>
            {
              UploadFiles ? (
                <div>
                  <h1 className='text-gray-500'>Accepted Files</h1><br />
                  {
                    UploadFiles.map((img) => {
                      return (
                        <div key={img.size}>
                          <h2 className='p-1'>{img.path}{<DoneAllIcon className='text-blue-700' />}</h2>
                        </div>
                      )
                    })
                  }
                </div>
              ) : null
            }
          </div>
          <div className='p-3.5'>
            {
              ErrorUpload ? (
                <div className='ml-10 text-red-500'>
                  <h1>Rejected Files(Size exceed)</h1>
                  {
                    ErrorUpload.map((item) => {
                      return (
                        <div key={item.size}>
                          <h2>{item.path}(<IconCross />)</h2>
                        </div>
                      )
                    })
                  }
                </div>
              ) : null
            }
          </div>
          <div className='ml-8 m-5'>
            <Button onClick={PushFiles} className='hover:bg-orange-500 hover:text-yellow-50' color="orange" variant='outline' radius="md">
              Upload
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Upload;