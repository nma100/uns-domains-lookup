import './LookupApp.css';

const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
const API_KEY = 'UD07rKAnLUu7S25dFgpytUGXmuEihNv7';

let showSpinner = isVisible => document.getElementById('spinner').style.opacity = isVisible ? 1 : 0; 

function renderResponse(data) {
  document.getElementById('response').innerHTML = data;
  document.getElementById('code-block').style.display = data ? 'block' : 'none';
} 

function processLookup(e) {
  e.preventDefault();

  let domain = document.getElementById('domain').value;
  if (!domain) return;

  let onLoad = function (e) {
    let response = JSON.parse(e.currentTarget.responseText)
    renderResponse(JSON.stringify(response, null, 2));
    showSpinner(false);
  };
  
  let onError = function (e) {
    console.error('API Error', e);
    showSpinner(false);
  };

  renderResponse('');
  showSpinner(true)

  let xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + domain);
  xhr.setRequestHeader("Authorization", "Bearer " + API_KEY);	
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('error', onError);
  xhr.send();
}

function LookupApp() {
  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <h1 className="page-title display-1 mb-3">Unstoppable Domain Lookup</h1>
        <h2 className="text-muted">Retrieve domain records and metadata</h2>
      </div>
      <form onSubmit={processLookup}>
        <div className="input-group mb-4">
          <input id="domain" type="text" className="form-control form-control-lg" placeholder="Enter a domain name (Ex : brad.crypto)" aria-label="Enter a domain name" aria-describedby="button-addon"autoComplete="off"/>
          <button className="btn btn-secondary btn-lg" type="submit" id="button-addon"><span className="fa fa-search fa"></span> Search</button>
        </div> 
      </form>
      <code id="code-block" style={{display: 'none'}}><pre id="response" className="shadow rounded-3 bg-white p-3"></pre></code>
      <div id="spinner" className="d-flex justify-content-center" style={{opacity: 0}}>
        <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>  
    </div>
  );
}

export default LookupApp;
