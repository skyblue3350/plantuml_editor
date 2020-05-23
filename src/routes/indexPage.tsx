import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Image, Grid, Select, Label } from 'semantic-ui-react'
import AceEditor from 'react-ace'
// @ts-ignore
import plantumlEncoder from 'plantuml-encoder'


import ace from 'ace-builds'

export interface Props extends RouteComponentProps<{}> {
}

export interface State {
    text: string
    keybind: string
}

export default class IndexPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            text: '',
            keybind: 'none',
        }
        ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.3.3/src-min-noconflict')
    }

    render(): JSX.Element {
        const encode = plantumlEncoder.encode(this.state.text)

        return (
            <Grid columns={2} style={{height: '100%'}}>
                <Grid.Row>
                    <Grid.Column>
                        <AceEditor
                            value={this.state.text}
                            mode='plain_text'
                            theme='github'
                            width='100%'
                            height='100%'
                            keyboardHandler={this.state.keybind === 'none'? '' : this.state.keybind}
                            showPrintMargin={false}
                            enableBasicAutocompletion={true}
                            enableLiveAutocompletion={true}
                            onChange={(data, event) => this.setState({text: data})} />
                    </Grid.Column>
                    <Grid.Column>
                        <Label>Keybinding</Label>
                        <Select 
                            onChange={(event, data) => this.setState({keybind: data.value!.toString()})}
                            value={this.state.keybind}
                            options={[
                                {key: 'none', value:'none', text: 'None'},
                                {key: 'vim', value:'vim', text: 'vim'},
                                {key: 'emacs', value:'emacs', text: 'emacs'}]} />
                        <Image src={`http://localhost:8080/png/${encode}`}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
