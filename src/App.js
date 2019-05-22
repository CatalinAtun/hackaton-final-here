import React, { Component } from 'react';   
import './App.css';
import Map from './components/Map';
import PrincipalFooter from './components/PrincipalFooter/PrincipalFooter'
import TelephoneNav from './components/TelephoneNav/TelephoneNav'
import Notification from './components/Notification'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            app_id: "68jKP099OUN8oLgbd5Jq",
            app_code: "Rb8T_A8l4p9bEPt2eawMCA",
            startPoint: {
                lat: '',
                long: '',
            },
            endPoint: {
                lat: '',
                long: '',
            },
            updateNotifications: false,
            hideViewMap: false,
        }

        this.functionCoordUser = this.functionCoordUser.bind(this);
        this.ChangeNotifications = this.ChangeNotifications.bind(this);
        this.ChangehideViewMap= this.ChangehideViewMap.bind(this)
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            hideViewMap: true,
            updateNotifications: false,
        })
        if (navigator.geolocation) {
            console.log(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        ...this.state,
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        error: null,
                    });
                },
                (error) => {
                    // alert(error.message)
                    this.setState({
                        ...this.state,
                        error: error.message
                    })
                }
            );
        }
    }

    async functionCoordUser(start, end) {
        this.startPoint = await fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&searchtext=" + start )
            .then(data => data.json())
            .then(data => {
                return {
                    lat: data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
                    long: data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
                    address: data.Response.View[0].Result[0].Location.Address.Label,
                }
            })
        this.endPoint = await fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&searchtext=" + end)
            .then(data => data.json())
            .then(data => {
                return {
                    lat: data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
                    long: data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
                    address: data.Response.View[0].Result[0].Location.Address.Label,
                }
            })

        this.setState({
            ...this.state,
            startPoint: {
                ...this.startPoint
            },
            endPoint: {
                ...this.endPoint
            },
        })
    }

    ChangeNotifications(){
        this.setState({
            ...this.state,
            updateNotifications: true,
            hideViewMap: false
        })
    }

    ChangehideViewMap(){
        this.setState({
            ...this.state,
            hideViewMap: true,
            updateNotifications: false,
        })
    }

    render() {
        return (
            <div className="App">
                    <TelephoneNav />
                    
                {this.state.hideViewMap && <Map   

                        app_id={this.state.app_id}
                        app_code={this.state.app_code}
                        lat="-33.4489"
                        lng="-70.6693"
                        zoom="13"
                        startPoint={this.state.startPoint}
                        endPoint={this.state.endPoint}
                    />}
                    {this.state.updateNotifications &&
                        <Notification  />
                    }
                    <PrincipalFooter onSetNotifications={this.ChangeNotifications}
                    onSethideViewMap={this.ChangehideViewMap}/>
                    
                </div>
        )
    }
}
export default App;