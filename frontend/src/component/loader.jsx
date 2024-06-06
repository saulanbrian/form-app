import './loader.css'

export default function Loader(){
  
  const style = {
    display:'flex',
    width:'100vw',
    height:'80vh',
    justifyContent:'center',
    alignItems:'center'
  }

  return <div style={style}>
  <svg viewBox="25 25 50 50" id='loader'>
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
  </div>

}