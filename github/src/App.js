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
      this.setState({
        user: result.data,
        followers: []
      });
      axios.get(result.data.followers_url)
      .then(followerresult => {
        console.log(followerresult); 

        followerresult.data.forEach (f => {
            axios.get(f.url).then(f => {
                var followers;
                if (this.state === null) {
                  followers = [];
                } else {
                  followers = this.state.followers;
                }
                this.setState({
                  ...this.state,
                  followers: [...followers, f.data]
                })
            })
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
          {this.state.followers.map (user=> (
            <p> {user.name}
                {user.location}
            </p>
          )) }

          <pre>{JSON.stringify(this.state, null, 4)}</pre>
        </>
      )
    }
       
  }
}
export default App;
