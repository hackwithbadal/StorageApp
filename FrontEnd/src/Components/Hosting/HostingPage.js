import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Group, FileButton, Text, Button } from '@mantine/core'

function HostingPage() {
    const [file, setFile] = useState()
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Group>
                    <FileButton onChange={setFile} accept="text/html">
                        {(props) => <Button variant='outline' {...props}>Upload image</Button>}
                    </FileButton>
                </Group>
                {file && (
                    <Text size="sm">
                        Picked file: {file.name}
                    </Text>
                )}
            </div>
        </div>
    )
}

export default HostingPage;