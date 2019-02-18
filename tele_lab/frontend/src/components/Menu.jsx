import React from 'react'
import {Input, Menu, Container} from 'semantic-ui-react'


const MenuExampleInputs = () => (
    <Menu>
        <Container>
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item position='right'>
                <Input action={{type: 'submit', content: 'Go'}} placeholder='Navigate to...'/>
            </Menu.Item>
        </Container>
    </Menu>
)

export default MenuExampleInputs