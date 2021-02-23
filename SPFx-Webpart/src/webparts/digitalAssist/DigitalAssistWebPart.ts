import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DigitalAssistWebPartStrings';
import DigitalAssist from './components/DigitalAssist';
import { IDigitalAssistProps } from './components/IDigitalAssistProps';
import {  graph} from '@pnp/graph';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IDigitalAssistWebPartProps {
  description: string;
}

export default class DigitalAssistWebPart extends BaseClientSideWebPart<IDigitalAssistWebPartProps> {

  protected async onInit(): Promise<any> {

  
    graph.setup({
      spfxContext: this.context
    });

    
  }

 
  

  private graphClient: any = null;



  public async getOrganizationalUsers(): Promise<any> {
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const returnUsers = await this.graphClient
        .api(`users`)
        .version('v1.0')
        //.top(100)
        //.filter(`startswith(DisplayName, '${searchString}') or startswith(mail, '${searchString}')`)
        .get();
      return returnUsers;
    } catch (error) {
      throw new Error('Error on search users');
    }
  }

  public render(): void {
    const element: React.ReactElement<IDigitalAssistProps> = React.createElement(
      DigitalAssist,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
