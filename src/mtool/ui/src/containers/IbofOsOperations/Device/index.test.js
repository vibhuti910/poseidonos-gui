/*
 *   BSD LICENSE
 *   Copyright (c) 2021 Samsung Electronics Corporation
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions
 *   are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in
 *       the documentation and/or other materials provided with the
 *       distribution.
 *     * Neither the name of Samsung Electronics Corporation nor the names of its
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *   A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 *   OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *   SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 *   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *   DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *   THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *   OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from "react";
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    wait
} from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { I18nextProvider } from "react-i18next";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../../sagas/indexSaga";
import storageReducer from "../../../store/reducers/storageReducer";
import PrivateRoute from "../../../components/PrivateRoute";
import Device from "./index";
import i18n from "../../../i18n";

jest.unmock("axios");

describe("DeviceOperations", () => {
    let wrapper;
    let history;
    let store;
    // let mock;
    beforeEach(() => {
        const sagaMiddleware = createSagaMiddleware();
        const rootReducers = combineReducers({
            storageReducer
        });
        const composeEnhancers =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = createStore(
            rootReducers,
            composeEnhancers(applyMiddleware(sagaMiddleware))
        );
        sagaMiddleware.run(rootSaga);
        const route = "/operations/Device";
        history = createMemoryHistory({ initialEntries: [route] });
    });

    const renderComponent = () => {
        wrapper = render(
            <Router history={history}>
                <I18nextProvider i18n={i18n}>
                    <Provider store={store}>
                        {" "}
                        <PrivateRoute>
                            <Device />
                        </PrivateRoute>
                    </Provider>
                </I18nextProvider>
            </Router>
        );
    };

    const deviceResponse = {
        "devices": [{
            "name": "unvme-ns-0",
            "size": 7681501126656,
            "addr": "0000:02:00.0",
            "class": "ARRAY",
            "mn": "SAMSUNG MZQLB7T6HMLA-000AZ              ",
            "sn": "S45ANY0K100220      ",
            "isAvailable": false,
            "numa": "0",
            "arrayName": "POSArray"
        }, {
            "name": "unvme-ns-1",
            "size": 7681501126656,
            "addr": "0000:03:00.0",
            "class": "ARRAY",
            "mn": "SAMSUNG MZQLB7T6HMLA-000AZ              ",
            "sn": "S45ANY0K300748      ",
            "isAvailable": false,
            "numa": "0",
            "arrayName": "POSArray"
        },
        {
            "name": "unvme-ns-2",
            "size": 7681501126656,
            "addr": "0000:05:00.0",
            "class": "ARRAY",
            "mn": "SAMSUNG MZQLB7T6HMLA-000AZ              ",
            "sn": "S45ANY0K300762      ",
            "isAvailable": false,
            "numa": "0",
            "arrayName": "POSArray"
        }, {
            "name": "unvme-ns-3",
            "size": 7681501126656,
            "addr": "0000:06:00.0",
            "class": "ARRAY",
            "mn": "SAMSUNG MZQLB7T6HMLA-000AZ              ",
            "sn": "S45ANY0K300769      ",
            "isAvailable": false,
            "numa": "0",
            "arrayName": "POSArray"
        }],
        "metadevices": [{
            "name": "uram0",
            "isAvailable": false,
            "arrayName": "POSArray",
            "displayMsg": "uram0 (used by POSArray)",
            "trimmedDisplayMsg": "uram0 (used)"
        }, {
            "name": "uram1",
            "isAvailable": true,
            "arrayName": "",
            "displayMsg": "uram1",
            "trimmedDisplayMsg": "uram1"
        }
        ]
    };

    afterEach(cleanup);

    it("should list the subsystems",
        async () => {
            const mock = new MockAdapter(axios);
            mock.onGet("/api/v1.0/get_devices/").reply(200,
                deviceResponse
            );
            renderComponent();
            const { getByText } = wrapper;
            const deviceName = await waitForElement(() => getByText("uram0"));
            expect(deviceName).toBeDefined();
        });
});