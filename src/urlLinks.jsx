import React, { Component } from "react";
import './bootstrap.min.css';

export default class UrlLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [
            ],
            isEditable: false,
            value: "",
            currentid: "",
            currentValue: "",
            isSorted: false,
        };
    }


    // **** Add Url functions ****//

    onAddChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    onAddUrl = (e) => {
        e.preventDefault();
        const url = { link: "https://" + this.state.value, editMode: false, id: Date.now() };
        if (this.state.value !== "") {
            this.setState({
                urls: [...this.state.urls, url],
                value: "",
            });
        }
    }


    // ***** all functions for editing ***** //

    // set edit mode to true
    onEdit = (url) => {
        url.editMode = true;
        this.setState({
            isEditable: true,
            currentid: url.id,
            currentValue: url.link,
        });
    }

    // save the updated url to the state
    onUpdateChange = (e) => {
        this.setState({
            currentValue: e.target.value
        });
    }

    // execute the editing
    updateUrl = (id, newUrl) => {
        this.state.urls.map((url) => {
            if (url.id === id) {
                url.link = newUrl;
                url.editMode = false;
            }
        })
    }

    // call the updateUrl function and set the edit mode to false
    onUpdateUrl = (e) => {
        e.preventDefault();
        this.updateUrl(this.state.currentid, this.state.currentValue);
        this.setState({ isEditable: false });
    }


    // ***** delete url function ***** //

    onDelete = (urlId) => {
        this.setState({
            urls: [...this.state.urls].filter((url) => url.id !== urlId)
        });
    };

    onSortUrls = () => {
        if(this.state.isSorted === true){
            this.setState({
                urls: [...this.state.urls].sort((a, b) => a.link > b.link ? 1 : -1),
                isSorted: false,
            });
        }
        else{
            this.setState({
                urls: [...this.state.urls].sort((a, b) => a.link > b.link ? -1 : 1),
                isSorted: true,
            });
        }

    }

    // useEffect (() => {
    //     localStorage.setItem("urls", JSON.stringify(this.state.urls));
    // }, [this.state.urls]);

    render() {
        let urlList = this.state.urls.map((url) => {
            if (url.editMode === false) {
                return (
                    <div className="card-body">
                        <li className="list-group-item list-group-item-action active">
                            <a href={url.link}>
                                <p className="card-text">{url.link}</p>
                            </a>
                            <button onClick={() => this.onEdit(url)}>Edit</button>
                            <button onClick={() => this.onDelete(url.id)}>Remove</button>
                        </li>
                    </div>);
            }
            else {
                return (
                    <div className="card-body">
                        <li className="list-group-item list-group-item-action active">
                            <form onSubmit={this.onUpdateUrl}>
                                <input type="text"
                                    name="url"
                                    placeholder="Enter your link"
                                    value={this.state.currentValue}
                                    onChange={this.onUpdateChange}
                                    pattern="(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?" />
                                <button onClick={this.onUpdateUrl}>Update</button>
                            </form>
                        </li>
                    </div>
                );
            }
        });
        return (
            <div className="card text-white bg-secondary mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">
                    <h1>All My Links</h1>
                </div>
                <form onSubmit={this.onAddUrl}>
                    <input type="text"
                        name="url"
                        placeholder="Enter your link"
                        onChange={this.onAddChange}
                        value={this.state.value}
                        pattern="(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?" />
                    <button onClick={this.onAddUrl}>Add</button>
                    <button onClick={this.onSortUrls}>Sort</button>
                </form>
                <div className="list-group">
                    <ul>
                        {urlList}
                    </ul>
                </div>
            </div>
        );
    }
}