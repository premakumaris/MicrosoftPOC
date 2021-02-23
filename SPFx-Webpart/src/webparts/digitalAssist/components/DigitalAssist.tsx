import * as React from 'react';
import styles from './DigitalAssist.module.scss';
import { IDigitalAssistProps } from './IDigitalAssistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IMember } from '../Interfaces/IMember';
import { IDigitalAssistState } from '../Interfaces/IDigitalAssistState';
import { FocusZone, FocusZoneDirection, List } from "office-ui-fabric-react";
import AllMembers from "./AllMembers";
import {  graph} from '@pnp/graph';
import { MSGraphClient } from '@microsoft/sp-http';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';
import { DefaultButton, PrimaryButton, Callout} from 'office-ui-fabric-react';
import { HttpClient, SPHttpClient, HttpClientConfiguration, HttpClientResponse, ODataVersion, IHttpClientConfiguration, IHttpClientOptions, ISPHttpClientOptions } from '@microsoft/sp-http';

export default class DigitalAssist extends React.Component<IDigitalAssistProps,IDigitalAssistState> {

  constructor(props: IDigitalAssistProps) {
    super(props);
    this.state = {
      teamMembers:[],
      email:"",
      filteredUser: []
    };

    graph.setup({
      spfxContext: this.props.context
    });
    this.getUserDetials = this.getUserDetials.bind(this);
  }


  public async componentWillMount() {
    const users: any = await this.getOrganizationalUsers();
    const OrgUsers: IMember[] = users.value;
    this.setState({
      teamMembers: OrgUsers
    })
  }

  private graphClient: any = null;
  public async getOrganizationalUsers(): Promise<IMember[]> {
    try {
      this.graphClient = await this.props.context.msGraphClientFactory.getClient();
     return await this.graphClient
        .api('/users')
        .version('v1.0')
        //.top(100)
        //.filter(`startswith(DisplayName, '${searchString}') or startswith(mail, '${searchString}')`)
        .get();
    } catch (error) {
      throw new Error('Error on search users');
    }
  }

  protected functionUrl: string = "https://demofunctionsprema.azurewebsites.net/api/GetAdUsers?code=zQnYHuW6Jnh2CTUPNAj2TFVHGd2g6F4iModprRCdllXY3Ht41tNQWQ==";    
  protected async getUserDetailsUsingAzureFunction(): Promise<any> {
      const requestHeaders: Headers = new Headers();
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");

      const postOptions: IHttpClientOptions = {
        headers: requestHeaders,
        body: `{name: 'Azure'}`
      };

      let responseText: string = "";
      let resultMsg: HTMLElement = document.getElementById("responseContainer");    
        this.props.context.httpClient.post(this.functionUrl, HttpClient.configurations.v1, postOptions).then((response: HttpClientResponse) => {    
         response.json().then((responseJSON: any) => {    
            if (response.ok) {    
                resultMsg.style.color = "white";    
            } else {    
                resultMsg.style.color = "red";    
            }    
    
            resultMsg.innerText = responseJSON.name;    
          })    
          .catch ((response: any) => {    
            let errMsg: string = `WARNING - error when calling URL ${this.functionUrl}. Error = ${response.message}`;    
            resultMsg.style.color = "red";    
            console.log(errMsg);    
            resultMsg.innerText = errMsg;    
          });    
      });    

      return responseText;
  }
     

  private getUserDetials(){ 
    let userDetials: IMember[] = this.state.teamMembers;
    let user: IMember[] = userDetials.filter(user => user.mail === this.state.email);
    if(user.length > 0)
    {
      this.setState({
        filteredUser: user
      });
    }
  }


  public render(): React.ReactElement<IDigitalAssistProps> {
    let pagedItems: any[] = this.state.teamMembers;

    return (
      <div className={ styles.digitalAssist }>
        <div className={ styles.container }>
          <b>Organizational Users</b>
            <FocusZone direction={FocusZoneDirection.vertical}>
              <List
                id="allToolsAndSitesList"
                items={pagedItems}
                onRenderCell={AllMembers}
              />
              {this.state.teamMembers.length === 0 &&
              <div>
              <p>
              There are no items to show. 
                </p>
            </div>
              }
            
            </FocusZone>
            <div>
              <br></br>
            </div>
            <div>
            <b> Get User Informatio</b>
            <TextField title="Email"  id="email" placeholder="Enter user email ID" 
                 value={this.state.email} borderless={true} 
                 onChange={(ev: React.FormEvent<HTMLInputElement>, newValue?: string) =>
                  this.setState({email:newValue})
                 }
                 />
            <PrimaryButton text="Get User Info" type="submit" onClick={this.getUserDetials}   />
            <FocusZone direction={FocusZoneDirection.vertical}>
              <List
                id="allToolsAndSitesList1"
                items={this.state.filteredUser}
                onRenderCell={AllMembers}
              />
              {this.state.filteredUser.length === 0 &&
              <div>
              <p>
              There are no items to show. 
                </p>
            </div>
              }
              </FocusZone>
            </div>
            {/* <div id="responseContainer">Test1</div>   */}
        </div>
      </div>
    );
  }
}
