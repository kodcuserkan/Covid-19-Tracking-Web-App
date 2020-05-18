import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Who extends Component {

    state = {
        countries: [],
        dropdownOpen: false,
        ddTitle: "Lütfen ülke seçiniz",
        summary:{},
        global: {},
        selectedCountryInfo: {
            Country: "Ülke bilgisi girilmedi",
            NewConfirmed: "",
            NewDeaths: "",
            NewRecovered: "",
            TotalConfirmed: "",
            TotalDeaths: "",
            TotalRecovered: ""

        }
    }

    componentDidMount() {
        this.getData();
        this.getSummary();
    }

    getData = async () => {
        await this.getCountries();
    }

    getCountries = async () => {
        const countryList = [];
        await fetch('https://api.covid19api.com/countries').then(d => d.json())
            .then(country => countryList.push(country.map(name => name.Country)))
            .catch(err => console.log("Hata: ", err));
        this.setState({ countries: countryList[0].sort() })
    }

    getSummary = async () => {
        await fetch(`https://api.covid19api.com/summary`).then(d => d.json())
                .then(c => this.setState({
                    summary: c,
                    global: c.Global,
                }))
                .catch(err => console.log("Hata: ", err));
    }

    getOneCountry = name => {

        const list = this.state.summary;

        if (name !== "Lütfen ülke seçiniz" && name != undefined) {

            const selectedCountry = list != undefined ?  list.Countries.find((selected) => selected.Country === name) : {};
            this.setState({
                selectedCountryInfo: selectedCountry
            });
        }

    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    onSelect = (e) => {
        e.preventDefault();

        let choosed = e.target.innerHTML

        if (choosed === "Antarctica") choosed = "Antartica";

        this.setState({ ddTitle: choosed })

        this.getOneCountry(choosed);

    }

    render() {

        const { countries, dropdownOpen, summary, ddTitle, global, selectedCountryInfo } = this.state;
        return (

            <div className="div-who">

                <div className="dropdown-div">
                    <Dropdown isOpen={dropdownOpen} toggle={this.toggle} >
                        <DropdownToggle color="primary" style={{ width: "100%", fontSize:"1rem" }} caret>
                            {ddTitle}
                        </DropdownToggle>

                        <DropdownMenu onClick={(e) => this.onSelect(e)}>
                            <DropdownItem divider />

                            {countries.map((ulke, i) => {
                                return <DropdownItem key={i} style={{ fontSize:"1rem" }} >{ulke}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="result-div singleCountry">
                    <div className="info country_name"><span>Country Name : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.Country : "Bilgi bulunamadı"}</div>
                    <div className="info new_confirmed"><span>New Confirmed : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.NewConfirmed : ""}</div>
                    <div className="info new_deaths"><span>New Deaths : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.NewDeaths : ""}</div>
                    <div className="info new_recovered"><span>New Recovered : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.NewRecovered : ""}</div>
                    <div className="info total_confirmed"><span>Total Confirmed : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.TotalConfirmed : ""}</div>
                    <div className="info total_deaths"><span>Total Deaths : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.TotalDeaths : ""}</div>
                    <div className="info total_recovered"><span>Total Recovered : </span>{selectedCountryInfo != undefined ? selectedCountryInfo.TotalRecovered : ""}</div>
                </div>
                <div className="result-div global">
                    <div className="info country_name"><span>GLOBAL</span></div>
                    <div className="info new_confirmed"><span>New Confirmed : </span>{global != undefined ? global.NewConfirmed : ""}</div>
                    <div className="info new_deaths"><span>New Deaths : </span>{global != undefined ? global.NewDeaths : ""}</div>
                    <div className="info new_recovered"><span>New Recovered : </span>{global != undefined ? global.NewRecovered : ""}</div>
                    <div className="info total_confirmed"><span>Total Confirmed : </span>{global != undefined ? global.TotalConfirmed : ""}</div>
                    <div className="info total_deaths"><span>Total Deaths : </span>{global != undefined ? global.TotalDeaths : ""}</div>
                    <div className="info total_recovered"><span>Total Recovered : </span>{global != undefined ? global.TotalRecovered : ""}</div>
                </div>
            </div>
        )
    }
}

export default Who