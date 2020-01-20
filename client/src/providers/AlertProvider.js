import React, {Component} from 'react';
import {AlertList} from 'react-bs-notifier';

export const AlertContext = React.createContext();

class AlertProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            info: this.info,
            success: this.success,
            warning: this.warning,
            error: this.error,
            clearAlerts: this.clearAlerts,
            setHoldState: this.setHoldState,
            setSingleAlertStatus: this.setSingleAlertStatus
        };
    }

    info = msg => this.setState({newAlert: {type: 'info', message: msg}});
    success = msg => this.setState({newAlert: {type: 'success', message: msg}});
    warning = msg => this.setState({newAlert: {type: 'warning', message: msg}});
    error = msg => this.setState({newAlert: {type: 'danger', message: msg}});

    setHoldState = value => this.setState({hold: value});
    setSingleAlertState = value => this.setState({singleAlert: value});

    onDismissedAlert(alert) {
        let alerts = this.state.alerts;
        // Find the index of the alert that was dismissed
        const idx = alerts.indexOf(alert);

        if (idx >= 0) {
            alerts = [...alerts.slice(0, idx), ...alerts.slice(idx + 1)];

            this.setState({
                alerts: alerts
            });
        }
        if (!alerts.length) {
            this.handleRemovedAlerts();
        }
    }

    handleInsertedAlert() {
        this.setState({
            newAlert: null,
            hasAlerts: true
        });
    }

    handleRemovedAlerts() {
        this.setState({
            hasAlerts: false
        })
    }

    clearAlerts() {
        this.setState({alerts: []});
        this.handleRemovedAlerts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const lastAlertId = Math.max.apply(Math, this.state.alerts.map(item => item.id));
        const lastAlert = this.state.alerts.find(alert => alert.id === lastAlertId);
        const updateLock = this.state.updateLock;
        const newAlert = !!this.state.newAlert;
        const lastAlertOk =
            this.state.alerts.length === 0 ||
            (this.state.alerts.length === 1 && this.state.alerts.findIndex(x => x.id === lastAlertId) > -1);

        if (!lastAlertOk && this.state.singleAlert) {
            this.setState({
                alerts: [lastAlert]
            });
        }

        if (!updateLock && newAlert) {
            const alertType = this.state.newAlert.type
                .replace('info', 'Informação')
                .replace('success', 'Sucesso')
                .replace('warning', 'Alerta')
                .replace('danger', 'Erro');

            const newAlert = {
                id: new Date().getTime(),
                type: this.state.newAlert.type,
                headline: alertType,
                message: this.state.newAlert.message
            };

            if (this.state.singleAlert) {
                this.setState({
                    alerts: [newAlert],
                    updateLock: true
                });
            } else {
                this.setState({
                    alerts: [...this.state.alerts, newAlert],
                    blUpdateLock: true,
                });
            }
            this.handleInsertedAlert();
        }
    }

    render() {
        return (
            <AlertContext.Provider value={this.state}>
                <AlertList
                    position={"top-right"}
                    alerts={this.state.alerts}
                    timeout={this.state.hold ? 0 : 2000}
                    dismissTitle={'Fechar'}
                    onDismiss={this.onDismissedAlert.bind(this)}
                />
                {this.props.children}
            </AlertContext.Provider>
        );
    }
}

export default AlertProvider;