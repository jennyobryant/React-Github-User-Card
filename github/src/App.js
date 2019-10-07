import React from 'react';
import axios from "axios"; 
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends React.Component{
  constructor(){
    super()
    this.state = null;
  }

  componentDidMount(){
    axios.get('https://api.github.com/users/jennyobryant')
    .then(result =>{
      axios.get(result.data.followers_url)
      .then(followerresult => {
        console.log(followerresult); 

        this.setState({
          user: result.data,
          followers: followerresult.data
        });
      })

      console.log(result); 

    })
    .catch(error => {

    })
  }
  render(){
    if (this.state === null){
        return <p>
          loading...
        </p>
    } else {
      return(
        <>
          <h2>{this.state.user.name}</h2>
          <pre>{JSON.stringify(this.state, null, 4)}</pre>
        </>
      )
    }
       
  }
}
export default App;
