/* -------------------------------------------------------------------------------------/
                                                                                    /
/               COPYRIGHT (c) 2019 SAMSUNG ELECTRONICS CO., LTD.                      /
/                          ALL RIGHTS RESERVED                                        /
/                                                                                     /
/   Permission is hereby granted to licensees of Samsung Electronics Co., Ltd.        /
/   products to use or abstract this computer program for the sole purpose of         /
/   implementing a product based on Samsung Electronics Co., Ltd. products.           /
/   No other rights to reproduce, use, or disseminate this computer program,          /
/   whether in part or in whole, are granted.                                         / 
/                                                                                     /
/   Samsung Electronics Co., Ltd. makes no representation or warranties with          /
/   respect to the performance of this computer program, and specifically disclaims   /
/   any responsibility for any damages, special or consequential, connected           /
/   with the use of this program.                                                     /
/                                                                                     /
/-------------------------------------------------------------------------------------/


DESCRIPTION: Hardware Container Test File
@NAME : index.test.js
@AUTHORS: Jay Sanghavi
@Version : 1.0 *
@REVISION HISTORY
[03/06/2019] [Jay] : Prototyping..........////////////////////
*/

import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { I18nextProvider } from "react-i18next";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../../sagas/indexSaga";
import headerReducer from "../../../store/reducers/headerReducer";
import hardwareOverviewReducer from "../../../store/reducers/hardwareOverviewReducer";
import hardwareHealthReducer from "../../../store/reducers/hardwareHealthReducer";
import hardwareSensorReducer from "../../../store/reducers/hardwareSensorReducer";
import hardwarePowerManagementReducer from "../../../store/reducers/hardwarePowerManagementReducer";
import waitLoaderReducer from "../../../store/reducers/waitLoaderReducer";
import configurationsettingReducer from "../../../store/reducers/configurationsettingReducer";
import alertManagementReducer from "../../../store/reducers/alertManagementReducer";
import i18n from "../../../i18n";
import Sensors from './index'
jest.unmock("axios");

describe("Sensors", () => {
  let wrapper;
  let history;
  let store;
  // let mock;
  beforeEach(() => {
    const sagaMiddleware = createSagaMiddleware();
    const rootReducers = combineReducers({
      // headerLanguageReducer,
      headerReducer,
      hardwareOverviewReducer,
      hardwareHealthReducer,
      hardwareSensorReducer,
      hardwarePowerManagementReducer,
      waitLoaderReducer,
      configurationsettingReducer,
      alertManagementReducer
    });
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
      rootReducers,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    const route = "/Hardware/Sensors";
    history = createMemoryHistory({ initialEntries: [route] });
    // mock = new MockAdapter(axios);
  });

  const renderComponent = () => {
    wrapper = render(
      <Router history={history}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            {" "}
            <Sensors />
          </Provider>
        </I18nextProvider>
      </Router>
    );
  };

  afterEach(cleanup);

  it("matches snapshot", async () => {
    const mock = new MockAdapter(axios);
    renderComponent();
    const { asFragment, getByText, getByTestId} = wrapper;
    const alertDescription = await waitForElement(() =>
    getByTestId("Sensors_Component")
  );

  const alertDescription1 = await waitForElement(() =>
  fireEvent.click(getByTestId("Sensors_Power")),
  fireEvent.click(getByTestId("Sensors_Fan")),
  fireEvent.click(getByTestId("Sensors_Temperature")), 
  );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays fan sensor table", async () => {
    window.history.pushState({}, 'Sensors', '/Fan');
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1.0/get_fan_sensor_info/').reply(200, {
      fan_sensor_info: [{
        Name: "Fan1",
        Status: {
          Health: "OK"
        },
        Reading: 10,
        ReadingUnits: "rpm"
      }, {
        Name: "Fan2",
        Status: {
          Health: "Not OK"
        },
        Reading: 10,
        ReadingUnits: "rpm"
      }]
    });
    renderComponent();
    const { asFragment, getByTestId} = wrapper;
    fireEvent.click(getByTestId("Sensors_Fan"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays power sensor table", async () => {
    window.history.pushState({}, 'Sensors', '/Power');
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1.0/get_power_sensor_info/').reply(200, {
      power_sensor_info: [{
        Name: "power1",
        Status: {
          Health: "OK"
        },
        ReadingVolts: 10,
        PowerInputWatts: 10
      }, {
        Name: "power2",
        Status: {
          Health: "Not OK"
        },
        ReadingVolts: 10,
        PowerInputWatts: 10
      }]
    });
    renderComponent();
    const { asFragment, getByTestId} = wrapper;
    fireEvent.click(getByTestId("Sensors_Power"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays temperature sensor table", async () => {
    window.history.pushState({}, 'Sensors', '/Temperature');
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1.0/get_temperature_sensor_info/').reply(200, {
      temperature_sensor_info: [{
        Name: "temperature1",
        Status: {
          Health: "OK"
        },
        ReadingCelsius: 10,
        UpperThresholdNonCritical: 10
      }, {
        Name: "temperature2",
        Status: {
          Health: "Not OK"
        },
        ReadingCelsius: 10
      }]
    });
    renderComponent();
    const { asFragment, getByTestId} = wrapper;
    fireEvent.click(getByTestId("Sensors_Temperature"));
    expect(asFragment()).toMatchSnapshot();
  });

});

 
 
