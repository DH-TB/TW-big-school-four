import React, {Component} from 'react';
import {Input, Card} from 'antd';
import './less/app.less'

class App extends Component {
    render() {
        return (
            <div>
                <Card className='app'>
                    <Input/>
                </Card>
            </div>
        );
    }
}

export default App;
