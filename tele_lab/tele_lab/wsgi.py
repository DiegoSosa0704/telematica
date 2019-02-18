"""import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import TeleLab from './components/TeleLab'
import NotFound from './components/NotFound'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={TeleLab}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

WSGI config for tax_duitama project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tele_lab.settings")

application = get_wsgi_application()
