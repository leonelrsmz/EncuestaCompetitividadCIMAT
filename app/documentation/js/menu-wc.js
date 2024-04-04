'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' : 'data-bs-target="#xs-components-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' :
                                            'id="xs-components-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerCheckGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerCheckGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerOpenTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerOpenTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerOpenTextCurrencyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerOpenTextCurrencyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerOpenTextNumberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerOpenTextNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerOpenTextOnehundredpcComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerOpenTextOnehundredpcComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerOpenTextYearComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerOpenTextYearComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnswerRadioGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerRadioGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BasicTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmartTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmartTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' :
                                        'id="xs-injectables-links-module-AppModule-1776d67288af29066dc932cf0d57c343df75d486675cd0f4303cefd9dad081dc89e6b4a3e5695c6740a70fe7a8169f493e75874b83c16ca83c8132a69f15aeb6"' }>
                                        <li class="link">
                                            <a href="injectables/ApiCallerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiCallerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AnswerOpenTextComponent-1.html" data-type="entity-link" >AnswerOpenTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnswerOpenTextComponent-2.html" data-type="entity-link" >AnswerOpenTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerComponent-1.html" data-type="entity-link" >ContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerComponent-2.html" data-type="entity-link" >ContainerComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddItemConfigModel.html" data-type="entity-link" >AddItemConfigModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnsweredModel.html" data-type="entity-link" >AnsweredModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerModel.html" data-type="entity-link" >AnswerModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClusterAssociation.html" data-type="entity-link" >ClusterAssociation</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinishSurveyParams.html" data-type="entity-link" >FinishSurveyParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenericTableModel.html" data-type="entity-link" >GenericTableModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupConsortium.html" data-type="entity-link" >GroupConsortium</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemModel.html" data-type="entity-link" >ItemModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/MainCompetitivenessFactors.html" data-type="entity-link" >MainCompetitivenessFactors</a>
                            </li>
                            <li class="link">
                                <a href="classes/OneModel.html" data-type="entity-link" >OneModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionBackNextModel.html" data-type="entity-link" >QuestionBackNextModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionFullResultModel.html" data-type="entity-link" >QuestionFullResultModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionModel.html" data-type="entity-link" >QuestionModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionPreviousModel.html" data-type="entity-link" >QuestionPreviousModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterModel.html" data-type="entity-link" >RegisterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReturnServiceModel.html" data-type="entity-link" >ReturnServiceModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveAnsweredQuestionParamsModel.html" data-type="entity-link" >SaveAnsweredQuestionParamsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveModel.html" data-type="entity-link" >SaveModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendShowAnswerModel.html" data-type="entity-link" >SendShowAnswerModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SmartTableModel.html" data-type="entity-link" >SmartTableModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SurveyDetailByUserIdModel.html" data-type="entity-link" >SurveyDetailByUserIdModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SurveyDetailByUserIdParams.html" data-type="entity-link" >SurveyDetailByUserIdParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SurveyDetailModel.html" data-type="entity-link" >SurveyDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableDataModel.html" data-type="entity-link" >TableDataModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInsFireBaseModel.html" data-type="entity-link" >UserInsFireBaseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSearchModel.html" data-type="entity-link" >UserSearchModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSearchReslt.html" data-type="entity-link" >UserSearchReslt</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSmartTableModel.html" data-type="entity-link" >UserSmartTableModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiCallerService.html" data-type="entity-link" >ApiCallerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemService.html" data-type="entity-link" >ItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SurveyService.html" data-type="entity-link" >SurveyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UiService.html" data-type="entity-link" >UiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidatorsService.html" data-type="entity-link" >ValidatorsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link" >ErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});