import { UrlConstant } from '../constants/url.constants';

export class HeaderModel {
  title: string;
  isMenuVisible: boolean; // true - display the menu button. false- hide the menu button
  defaultRoutingUrl: string;
  isComponent: boolean;

  constructor(
    title: string,
    isMenuVisible: boolean,
    defaultRoutingUrl: string = UrlConstant.URL_ADMIN_DASHBOARD,
    isComponent: boolean = false
  ) {
    this.title = title;
    this.isMenuVisible = isMenuVisible;
    this.defaultRoutingUrl = defaultRoutingUrl;
    this.isComponent = isComponent;
  }
}
