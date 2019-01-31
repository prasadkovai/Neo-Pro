import React, { Component } from 'react'
import { TreeView } from '@progress/kendo-react-treeview';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import product from '../Grid/datatwo.json';
import { Segment, Button } from "semantic-ui-react";

import { DropDownList } from '@progress/kendo-react-dropdowns';

import TopMenu from '../layout/TopMenu';
//import Button from 'react-materialize/lib/Button';

class node extends Component {
    Type = [
        { text: 'Neo', id: 1 }
    ];
    constructor(props) {
        super(props);

        // this.state.ser_name =neo
        this.state = {
            ServerID:"a290bf69-4cb3-4be4-94d4-80eb5ac66b2d",
            ser_name: '',
            value: { text: 'Neo', id: 1 },
            tree: [ ],

            gridData: product,
            selItem: '',
            selItemArray: []
        };

        this.onItemClick = this.onItemClick.bind(this)
        this.pageChange = this.pageChange.bind(this);
        this.iconClassName = this.iconClassName.bind(this);
        this.testfunction = this.testfunction.bind(this);
        this.testfunction();
    }
    testfunction()
    {
        const url='http://64.79.74.156:3001/servers/connect/'+this.state.ServerID
        fetch(url,{
            method:"GET"
        }).then(result => 
            this.setState({
                tree: result
              })
        //     {
        //     // this.state.tree.push(response.json());
        //     console.log(response.json());
        //     console.log( this.state.tree);
        //   }
          , error=> {
            console.log(error);
          })
        console.log(this.state.tree);
    }
    iconClassName({ type, items }) {
        if (type == 'Folder') {
            return 'k-icon k-i-folder';
        }
    };

    pageChange() {
        let path = `/neoreports`;
        this.props.history.push(path);
    }

    onItemClick = (event) => {
console.log("Item Clicked");
        // if (this.selectedItem) {
        //     this.selectedItem.selected = false;
        // }
        // // event.item.selected = true;
        // this.selectedItem = event.item;
        // this.forceUpdate();
        // this.state.selItem = this.selectedItem.text;
        // //  console.log( this.state.selItem)
        // this.filter()
    }

    filter() {
        if (this.state.selItem) {
            this.state.selItemArray = this.state.gridData.filter(t => t.ProductName === this.state.selItem);
            console.log('ghhgfhg');
            console.log(this.state.selItemArray);
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        // var allColumnsTwo = this.state.tree.length > 0 ? Object.keys(this.state.tree[0]) : []
        // var columnsToShowTwo = allColumnsTwo.map((item, i) => <Column field={item} key={i} />);
        //console.log(columnsToShowTwo)
        var datao = localStorage.getItem('name')

        console.log(datao)
        this.state.ser_name = datao;

        return (
            <div>

                <TopMenu />

                <div className="topmenu-body">
                    <Segment>
                        <h1>Choose your Report</h1>
                    </Segment>
                    <div class="ui breadcrumb">
                        <a class="section" href="/home">Home</a>
                        <div class="divider"> / </div>
                        <a class="active  section">{this.state.ser_name}</a>

                    </div>

                    <Segment>
                        {/* <TreeView
                            data={this.state.tree}
                            onItemClick={this.onItemClick}
                            itemRender={props =>
                                [<span className={this.iconClassName(props.item)} key='0'></span>, props.item.caption]
                            }
                        /> */}
                        {/* <TreeView
                            data={this.state.tree}
                            onExpandChange={this.onExpandChange}
                            onItemClick={this.onItemClick}
                            aria-multiselectable={true}

                        /> */}

                        <br />
                        <Grid
                            style={{ height: '200px' }}
                            data={this.state.selItemArray}
                        >
                            <Column field="ProductName" title="Report Name" width="200px" />
                            <Column field="path" title="Report Path" width="500px" />
                            <Column field="column" title="#Columns" width="100px" />

                        </Grid>
                        <br />
                        <br />
                        <br />
                        <br />
                        Select Target Type
                <DropDownList
                            data={this.Type}
                            textField="text"
                            dataItemKey="id"
                            value={this.state.value}
                            onChange={this.handleChange}
                        /><span className="space"></span>
                        <Button color="teal" type="button" onClick={this.pageChange} class="btn">convert</Button>

                    </Segment>

                </div>
            </div>
        )
    }



    onExpandChange = (event) => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();

    }
}
export default node