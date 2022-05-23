import React from 'react'; //import React library

const EXAMPLE_SENATORS = [
  { id: 'C000127',  name: 'Maria Cantwell', state: 'WA',  party: 'Democrat', phone: '202-224-3441', twitter: 'SenatorCantwell' },
  { id: 'M001111', name: 'Patty Murray', state: 'WA', party: 'Democrat', phone: '202-224-2621', twitter: 'PattyMurray' }
];

export function App(props) {
  return(
    <div className="container">
      <h1>
      US Senators (Oct 2020)
      </h1>
    <SenatorTable senators={props.senators}/>
    </div>
  )
}

export function SenatorTable(props) {
  let arr = ['Name', 'State', 'Phone', 'Twitter'];
  let row = props.senators.map(sen => <SenatorRow key={sen.id} senator={sen}/>)
  return(
    <table className="table table-bordered">
      <TableHeader columnNames={arr}/>
      <tbody>{row}</tbody>
      </table>
  );
}

export function TableHeader(props) {
    let columnItems = props.columnNames.map((columnName) => {
      return <th key={columnName}>{columnName}</th>;
    });
    return (
      <thead>
        <tr>
          {columnItems}
        </tr>
      </thead>
    )
}

export function SenatorRow(props) {
  let sen = props.senator;
  return (
    <tr>
      <td>{sen.name}</td>
      <td>{sen.party[0]} - {sen.state}</td>
      <td><a href={'tel:' + sen.phone}>{sen.phone}</a></td>
      <td><a href={'https://twitter.com/' + sen.twitter}>{'@' + sen.twitter}</a></td>
    </tr>
  )
}